import { useState } from "react";
import { Sparkles, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SUGGESTIONS = [
  "Is it safe to commute to school this afternoon?",
  "Can we hold PE classes outdoors today?",
  "What should I bring for the weather this week?",
  "Is there a risk of heavy rain or flooding?",
];

const renderMd = (t: string) =>
  t.split("\n").map((line, i) => {
    const html = line
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    if (/^#+\s/.test(line)) return <p key={i} className="font-heading font-bold text-foreground mt-3" dangerouslySetInnerHTML={{ __html: html.replace(/^#+\s/, "") }} />;
    if (/^\s*[-*]\s/.test(line)) return <li key={i} className="ml-5 list-disc" dangerouslySetInnerHTML={{ __html: html.replace(/^\s*[-*]\s/, "") }} />;
    if (!line.trim()) return <div key={i} className="h-2" />;
    return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
  });

const WeatherAdvisor = () => {
  const [location, setLocation] = useState("Carcar City, Cebu");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async (q = question) => {
    if (!location.trim() || q.trim().length < 3) {
      setError("Please enter a location and a question.");
      return;
    }
    setQuestion(q);
    setLoading(true); setError(""); setAnswer("");
    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/weather-advisor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ location, question: q }),
        },
      );
      if (!res.ok || !res.body) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "The advisor is unavailable right now.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += dec.decode(value, { stream: true });
        setAnswer(text);
      }
      if (!text) throw new Error("No answer was returned. Please try again.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-card rounded-lg shadow-lg border border-border p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-gold" />
        <h3 className="font-heading text-2xl font-bold text-foreground">Ask the technoWEATHER Advisor</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        For students and staff — ask about weather conditions and get safety tips.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); ask(); }} className="space-y-4">
        <div className="relative">
          <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={location} onChange={(e) => setLocation(e.target.value)} maxLength={120} placeholder="Location (e.g. Carcar City, Cebu)" className="pl-9" aria-label="Location" />
        </div>
        <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={600} rows={3} placeholder="Your weather question…" aria-label="Question" />
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" disabled={loading} onClick={() => ask(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-gold/50 text-foreground hover:bg-gold/10 transition-colors disabled:opacity-50">
              {s}
            </button>
          ))}
        </div>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking…</> : "Ask Advisor"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      {answer && (
        <div className="mt-6 p-5 rounded-md bg-secondary/50 border-l-4 border-gold text-sm text-foreground/90 space-y-1">
          {renderMd(answer)}
        </div>
      )}
    </div>
  );
};

export default WeatherAdvisor;
