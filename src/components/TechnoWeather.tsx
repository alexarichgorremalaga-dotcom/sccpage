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
  MapPin,
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
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

const CARCAR_CITY = { latitude: 10.1056, longitude: 123.642 };

const PHILIPPINE_CITIES = [
  { name: "Laoag", region: "Ilocos Norte", latitude: 18.1978, longitude: 120.5957, x: 167, y: 105 },
  { name: "Baguio", region: "Cordillera", latitude: 16.4023, longitude: 120.596, x: 168, y: 173 },
  { name: "Manila", region: "Metro Manila", latitude: 14.5995, longitude: 120.9842, x: 182, y: 241 },
  { name: "Legazpi", region: "Bicol", latitude: 13.1391, longitude: 123.7438, x: 283, y: 296 },
  { name: "Puerto Princesa", region: "Palawan", latitude: 9.7392, longitude: 118.7353, x: 100, y: 423 },
  { name: "Cebu City", region: "Central Visayas", latitude: 10.3157, longitude: 123.8854, x: 288, y: 402 },
  { name: "Tacloban", region: "Eastern Visayas", latitude: 11.2543, longitude: 125.003, x: 329, y: 367 },
  { name: "Zamboanga", region: "Zamboanga Peninsula", latitude: 6.9214, longitude: 122.079, x: 222, y: 530 },
  { name: "Davao City", region: "Davao Region", latitude: 7.1907, longitude: 125.4553, x: 351, y: 523 },
];

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

const fetchWeather = async (
  location: { latitude: number; longitude: number },
  includeDaily = false,
): Promise<WeatherData> => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation" +
    (includeDaily
      ? "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=4"
      : "") +
    "&timezone=Asia%2FManila";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Unable to load weather data");
  return res.json();
};

const fetchWeatherDesk = async () => {
  const [carcar, ...cityConditions] = await Promise.all([
    fetchWeather(CARCAR_CITY, true),
    ...PHILIPPINE_CITIES.map((city) => fetchWeather(city)),
  ]);
  return {
    carcar,
    cities: PHILIPPINE_CITIES.map((city, index) => ({
      ...city,
      weather: cityConditions[index],
    })),
  };
};

const formatDay = (iso: string, idx: number) => {
  if (idx === 0) return "Today";
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const TechnoWeather = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["techno-weather-philippines"],
    queryFn: fetchWeatherDesk,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });

  const current = data?.carcar.current;
  const CurrentIcon = current ? describe(current.weather_code).Icon : Sun;

  return (
    <section className="py-16 md:py-24 bg-secondary/40" id="techno-weather">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            techno<span className="text-gold">WEATHER</span> Updates
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Current weather conditions across selected Philippine locations, with a local forecast for Carcar City, Cebu.
          </p>
        </div>

        {isLoading && (
          <div className="max-w-6xl mx-auto bg-card rounded-lg border border-border p-10 text-center text-muted-foreground">
            Loading weather updates…
          </div>
        )}

        {isError && (
          <div className="max-w-6xl mx-auto bg-card rounded-lg border border-border p-10 text-center text-muted-foreground">
            Weather updates are unavailable right now. Please check back later.
          </div>
        )}

        {data && current && data.carcar.daily && (
          <>
            <div className="max-w-6xl mx-auto mb-12">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Philippine conditions
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    Monitor conditions across the Philippines
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">Model-based current conditions</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
                <div className="flex flex-col items-center">
                  <svg
                    viewBox="0 0 420 620"
                    className="h-[26rem] w-auto max-w-full md:h-[34rem]"
                    role="img"
                    aria-label="Map of the Philippines with numbered weather locations from north to south"
                  >
                    <g className="fill-secondary stroke-border" strokeWidth="2" strokeLinejoin="round">
                      <path d="M187 62 207 72 222 90 230 111 225 131 237 150 228 169 231 184 217 201 215 218 198 232 193 251 180 241 174 222 160 209 151 190 142 176 150 159 145 143 155 128 150 115 165 96 174 78Z" />
                      <path d="m141 251 17 5 6 14-7 20-14 12-13-7-2-16Z" />
                      <path d="m130 302 11 4 3 17-9 10-10-9Z" />
                      <path d="m133 343 12 8-5 16-11 2-5-13Z" />
                      <path d="m123 371 9 4-3 12-8-3Z" />
                      <path d="m119 396 8 3-4 13-8-4Z" />
                      <path d="m112 421 7 3-3 15-8-5Z" />
                      <path d="m102 448 8 3-3 17-8-4Z" />
                      <path d="m91 477 8 2-5 14-7-4Z" />
                      <path d="m80 505 8 2-6 14-7-3Z" />
                      <path d="m234 344 20-5 13 9-3 17-16 9-15-7-6-12Z" />
                      <path d="m267 356 8-5 6 20-4 28-6 23-6-8 4-25-5-16Z" />
                      <path d="m291 356 12-6 17 8 4 18-13 11-17-7-5-12Z" />
                      <path d="m321 372 12-5 11 9-4 18-13 7-8-12Z" />
                      <path d="m289 449 20-13 27 2 22 14 16 23-8 22-20 12-8 20-18 19-24-4-15-18-20-9-8-20 10-20-1-15Z" />
                      <path d="m185 528 18-3 12 8-8 12-16 1-9-8Z" />
                      <path d="m200 67 5-4 4 6-5 5Z" />
                      <path d="m209 58 4-4 4 5-4 4Z" />
                    </g>
                    {data.cities.map((city, index) => (
                      <g key={city.name} transform={`translate(${city.x} ${city.y})`}>
                        <circle r="13" className="fill-primary stroke-background" strokeWidth="3" />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-primary-foreground"
                          fontSize="11"
                          fontWeight="700"
                        >
                          {index + 1}
                        </text>
                        <title>{`${city.name}: ${Math.round(city.weather.current.temperature_2m)}°C, ${describe(city.weather.current.weather_code).label}`}</title>
                      </g>
                    ))}
                  </svg>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Numbered markers match the city list</span>
                  </div>
                </div>

                <div className="divide-y divide-border border-y border-border">
                  {data.cities.map((city, index) => {
                    const conditions = city.weather.current;
                    const { label, Icon } = describe(conditions.weather_code);
                    return (
                      <article
                        key={city.name}
                        className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3 py-3.5"
                      >
                        <span className="row-span-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="truncate font-semibold text-foreground">{city.name}</h4>
                          <p className="truncate text-xs text-muted-foreground">{city.region} · {label}</p>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <Icon className="hidden h-5 w-5 text-gold sm:block" aria-hidden="true" />
                          <span className="font-heading text-xl font-bold text-foreground">
                            {Math.round(conditions.temperature_2m)}°
                          </span>
                        </div>
                        <div className="col-start-2 col-span-2 mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>Feels {Math.round(conditions.apparent_temperature)}°C</span>
                          <span>Rain {conditions.precipitation} mm</span>
                          <span>Wind {Math.round(conditions.wind_speed_10m)} km/h</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto mb-10 border-t border-border pt-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Carcar City, Cebu
                  </p>
                  <h3 className="font-heading text-2xl font-bold text-foreground">Local 4-day forecast</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CurrentIcon className="h-5 w-5 text-gold" aria-hidden="true" />{describe(current.weather_code).label}</span>
                  <span className="font-heading text-2xl font-bold text-foreground">{Math.round(current.temperature_2m)}°C</span>
                </div>
              </div>
              <div className="grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {data.carcar.daily.time.map((iso, index) => {
                  const { label, Icon } = describe(data.carcar.daily?.weather_code[index] ?? 3);
                  return (
                    <div key={iso} className="flex items-center gap-3 py-4 sm:px-4 first:sm:pl-0 last:sm:pr-0">
                      <Icon className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground">{formatDay(iso, index)}</p>
                        <p className="truncate text-xs text-muted-foreground">{label} · {data.carcar.daily?.precipitation_probability_max[index]}% rain</p>
                      </div>
                      <p className="whitespace-nowrap text-sm font-semibold text-foreground">
                        {Math.round(data.carcar.daily?.temperature_2m_min[index] ?? 0)}° / {Math.round(data.carcar.daily?.temperature_2m_max[index] ?? 0)}°
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Conditions and forecasts are model-based weather information, not official PAGASA bulletins or warnings. The nationwide overview covers selected locations; it does not replace local emergency advisories.
              </p>
            </div>
          </>
        )}

        <WeatherAdvisor />
      </div>
    </section>
  );
};

export default TechnoWeather;
