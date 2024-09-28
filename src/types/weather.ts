interface CurrentUnits {
  time: string;
  interval: string;
  precipitation_probability: string;
  wind_gusts_10m: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  weather_code: string;
}

interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
  sunrise: string;
  sunset: string;
}

interface Current {
  time: string;
  interval: number;
  precipitation_probability: number;
  wind_gusts_10m: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
}

interface DailyWeather {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
}

interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily: DailyWeather;
  daily_units: DailyUnits;
  current: Current;
  current_units: CurrentUnits;
}

export { DailyWeather, Weather, CurrentUnits, DailyUnits, Current };
