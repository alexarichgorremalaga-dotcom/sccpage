import { useQuery } from "@tanstack/react-query";
import WeatherAdvisor from "./WeatherAdvisor";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Cloudy,
  Droplets,
  Sun,
  Wind,
} from "lucide-react";

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

const CARCAR_CITY = { latitude: 10.1056, longitude: 123.642 };

const weatherCodeMap: Record<
  number,
  { label: string; Icon: typeof Sun; day: boolean }
> = {
  0: { label: "Clear Sky", Icon: Sun, day: true },
  1: { label: "Mainly Clear", Icon: Sun, day: true },
  2: { label: "Partly Cloudy", Icon: Cloudy, day: true },
  3: { label: "Overcast", Icon: Cloudy, day: false },
  45: { label: "Fog", Icon: CloudFog, day: false },
  48: { label: "Rime Fog", Icon: CloudFog, day: false },
  51: { label: "Light Drizzle", Icon: CloudDrizzle, day: false },
  53: { label: "Drizzle", Icon: CloudDrizzle, day: false },
  55: { label: "Heavy Drizzle", Icon: CloudDrizzle, day: false },
  61: { label: "Light Rain", Icon: CloudRain, day: false },
  63: { label: "Rain", Icon: CloudRain, day: false },
  65: { label: "Heavy Rain", Icon: CloudRain, day: false },
  71: { label: "Light Snow", Icon: CloudSnow, day: false },
  73: { label: "Snow", Icon: CloudSnow, day: false },
  75: { label: "Heavy Snow", Icon: CloudSnow, day: false },
  80: { label: "Light Showers", Icon: CloudRain, day: false },
  81: { label: "Showers", Icon: CloudRain, day: false },
  82: { label: "Heavy Showers", Icon: CloudRain, day: false },
  95: { label: "Thunderstorm", Icon: CloudLightning, day: false },
  96: { label: "Thunderstorm w/ Hail", Icon: CloudLightning, day: false },
  99: { label: "Severe Thunderstorm", Icon: CloudLightning, day: false },
};

const describe = (code: number) =>
  weatherCodeMap[code] ?? { label: "Uncertain", Icon: Cloudy, day: false };

const fetchWeather = async (): Promise<WeatherData> => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${CARCAR_CITY.latitude}` +
    `&longitude=${CARCAR_CITY.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=Asia%2FManila&forecast_days=4`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Unable to load weather data");
  return res.json();
};

const formatDay = (iso: string, idx: number) => {
  if (idx === 0) return "Today";
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const TechnoWeather = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["techno-weather-carcar"],
    queryFn: fetchWeather,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });

  const current = data?.current;
  const CurrentIcon = current ? describe(current.weather_code).Icon : Sun;

  return (
    <section className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            techno<span className="text-gold">WEATHER</span> Updates
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live weather updates for Carcar City, Cebu — powered by our
            Catherinean tech community.
          </p>
        </div>

        {isLoading && (
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg border border-border p-10 text-center text-muted-foreground">
            Loading weather updates…
          </div>
        )}

        {isError && (
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg border border-border p-10 text-center text-muted-foreground">
            Weather updates are unavailable right now. Please check back later.
          </div>
        )}

        {data && current && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-6">
            {/* Current Conditions */}
            <div className="md:col-span-2 bg-primary text-primary-foreground rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-2">
                Current Conditions
              </p>
              <CurrentIcon
                className="w-16 h-16 text-gold mb-3"
                strokeWidth={1.5}
              />
              <p className="font-heading text-5xl font-bold mb-1">
                {Math.round(current.temperature_2m)}&deg;C
              </p>
              <p className="text-primary-foreground/80 text-sm mb-6">
                {describe(current.weather_code).label}
              </p>
              <div className="grid grid-cols-2 gap-4 w-full text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Droplets className="w-4 h-4 text-gold" />
                  <span>{current.relative_humidity_2m}% Humidity</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Wind className="w-4 h-4 text-gold" />
                  <span>{Math.round(current.wind_speed_10m)} km/h</span>
                </div>
              </div>
            </div>

            {/* Forecast */}
            <div className="md:col-span-3 bg-card rounded-lg shadow-lg border border-border p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                4-Day Forecast
              </p>
              <div className="divide-y divide-border">
                {data.daily.time.map((iso, idx) => {
                  const { label, Icon } = describe(data.daily.weather_code[idx]);
                  return (
                    <div
                      key={iso}
                      className="flex items-center gap-4 py-3 first:pt-0"
                    >
                      <span className="font-heading font-bold text-foreground w-16">
                        {formatDay(iso, idx)}
                      </span>
                      <Icon
                        className="w-6 h-6 text-gold shrink-0"
                        strokeWidth={1.75}
                      />
                      <span className="text-sm text-muted-foreground hidden sm:block flex-1 truncate">
                        {label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {data.daily.precipitation_probability_max[idx]}% rain
                      </span>
                      <span className="ml-auto font-semibold text-foreground text-sm">
                        {Math.round(data.daily.temperature_2m_min[idx])}
                        &deg; / {Math.round(data.daily.temperature_2m_max[idx])}
                        &deg;
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <WeatherAdvisor />
      </div>
    </section>
  );
};

export default TechnoWeather;
