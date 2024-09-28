import { handleError } from "@/utils/errorHandler";
import SchemaBuilder from "@pothos/core";
import openMeteoApi from "@/lib/openMeteoApi";
import {
  Weather,
  DailyWeather,
  CurrentUnits,
  Current,
  DailyUnits,
} from "@/types";

const builder = new SchemaBuilder<{}>({});

const weatherRef = builder.objectRef<Weather>("Weather");
const currentUnitRef = builder.objectRef<CurrentUnits>("CurrentUnits");
const dailyWeatherRef = builder.objectRef<DailyWeather>("Daily");
const currentRef = builder.objectRef<Current>("Current");
const dailyUnitsRef = builder.objectRef<DailyUnits>("DailyUnits");

dailyUnitsRef.implement({
  description: "The units for the daily weather.",
  fields: (t) => ({
    time: t.exposeString("time"),
    temperature_2m_max: t.exposeString("temperature_2m_max"),
    temperature_2m_min: t.exposeString("temperature_2m_min"),
    weather_code: t.exposeString("weather_code"),
    sunrise: t.exposeString("sunrise"),
    sunset: t.exposeString("sunset"),
  }),
});

currentRef.implement({
  description: "The current weather conditions.",
  fields: (t) => ({
    time: t.exposeString("time"),
    interval: t.exposeInt("interval"),
    precipitation_probability: t.exposeFloat("precipitation_probability"),
    wind_gusts_10m: t.exposeFloat("temperature_2m"),
    temperature_2m: t.exposeFloat("temperature_2m"),
    relative_humidity_2m: t.exposeFloat("relative_humidity_2m"),
    weather_code: t.exposeInt("weather_code"),
  }),
});

currentUnitRef.implement({
  description: "The units for the current weather.",
  fields: (t) => ({
    time: t.exposeString("time"),
    interval: t.exposeString("interval"),
    precipitation_probability: t.exposeString("precipitation_probability"),
    wind_gusts_10m: t.exposeString("wind_gusts_10m"),
    temperature_2m: t.exposeString("temperature_2m"),
    relative_humidity_2m: t.exposeString("relative_humidity_2m"),
    weather_code: t.exposeString("weather_code"),
  }),
});

weatherRef.implement({
  description: "The weather for a given locations longitude and latitude",
  fields: (t) => ({
    latitude: t.exposeFloat("latitude"),
    longitude: t.exposeFloat("longitude"),
    generationTime: t.exposeFloat("generationtime_ms"),
    utcOffset: t.exposeInt("utc_offset_seconds"),
    timezone: t.exposeString("timezone"),
    timezoneAbbr: t.exposeString("timezone_abbreviation"),
    elevation: t.exposeInt("elevation"),
    daily: t.field({
      type: dailyWeatherRef,
      resolve: (parent) => parent.daily,
    }),
    dailyUnits: t.field({
      type: dailyUnitsRef,
      resolve: (parent) => parent.daily_units,
    }),
    current: t.field({
      type: currentRef,
      resolve: (parent) => parent.current,
    }),
    currentUnits: t.field({
      type: currentUnitRef,
      resolve: (parent) => parent.current_units,
    }),
  }),
});

dailyWeatherRef.implement({
  description: "The daily weather for a locations given longitude and latitude",
  fields: (t) => ({
    temperatureMin: t.exposeFloatList("temperature_2m_min"),
    temperatureMax: t.exposeFloatList("temperature_2m_max"),
    weatherCode: t.exposeIntList("weather_code"),
    sunrise: t.exposeStringList("sunrise"),
    sunset: t.exposeStringList("sunset"),
  }),
});

builder.queryType({
  fields: (t) => ({
    weather: t.field({
      type: weatherRef,
      args: {
        latitude: t.arg.float({ required: true }),
        longitude: t.arg.float({ required: true }),
      },
      resolve: async (_parent, { latitude, longitude }) => {
        try {
          const weather = await openMeteoApi.fetchFromApi(latitude, longitude);
          return {
            ...weather,
          };
        } catch (e) {
          throw handleError(e, "Failed to fetch weather data");
        }
      },
    }),
  }),
});

export const weatherSchema = builder.toSchema();
