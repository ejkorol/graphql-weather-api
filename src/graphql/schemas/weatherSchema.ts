import { handleError } from "@/utils/errorHandler";
import SchemaBuilder from "@pothos/core";
import openMeteoApi from "@/lib/openMeteoApi";
import { Weather, DailyWeather } from "@/types";

const builder = new SchemaBuilder<{}>({});

const weatherRef = builder.objectRef<Weather>("Weather");
const dailyWeatherRef = builder.objectRef<DailyWeather>("Daily");

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
