import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const Body = z.object({
  location: z.string().trim().min(1).max(120),
  question: z.string().trim().min(3).max(600),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function geocode(name: string) {
  const r = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`,
  );
  if (!r.ok) return null;
  const d = await r.json();
  return d.results?.[0] ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Please enter a location and a question." }, 400);
    const { location, question } = parsed.data;

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) return json({ error: "AI is not configured." }, 500);

    // Try full name, then first part (e.g. "Carcar City, Cebu" -> "Carcar")
    let place = await geocode(location);
    if (!place) place = await geocode(location.split(",")[0].replace(/city/i, "").trim());

    let weatherText = "Live weather data unavailable for this location.";
    if (place) {
      const w = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max` +
          `&timezone=auto&forecast_days=3`,
      );
      if (w.ok) {
        weatherText = `Location resolved: ${place.name}, ${place.admin1 ?? ""}, ${place.country ?? ""}.\nData: ${JSON.stringify(await w.json())}`;
      }
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions:
          "You are technoWEATHER Advisor for St. Catherine's College (Carcar City, Cebu, Philippines). Help students and school staff understand weather conditions and stay safe. Use the provided live Open-Meteo data (WMO weather codes) when available. Reply in concise Markdown with sections: **Current Conditions**, **What This Means**, **Precautions** (bulleted, practical for school life/commute), and a one-line **Bottom Line**. Never invent official PAGASA warnings; advise checking PAGASA for official advisories when risk is high.",
        input: `Location: ${location}\nQuestion: ${question}\n\n${weatherText}`,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("gateway", res.status, t);
      const msg = res.status === 429 ? "Too many requests, please try again shortly."
        : res.status === 402 ? "AI credits are used up for now."
        : "The advisor is unavailable right now.";
      return json({ error: msg }, res.status);
    }

    // Convert SSE to plain text stream
    const reader = res.body!.getReader();
    const dec = new TextDecoder();
    const enc = new TextEncoder();
    const stream = new ReadableStream({
      async start(ctrl) {
        let buf = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const p = line.slice(5).trim();
            if (!p || p === "[DONE]") continue;
            try {
              const ev = JSON.parse(p);
              if (ev.type === "response.output_text.delta" && ev.delta) ctrl.enqueue(enc.encode(ev.delta));
            } catch { /* ignore */ }
          }
        }
        ctrl.close();
      },
    });
    return new Response(stream, { headers: { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" } });
  } catch (e) {
    console.error(e);
    return json({ error: "Something went wrong." }, 500);
  }
});
