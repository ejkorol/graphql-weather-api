import { handleError } from "@/utils/errorHandler";
import SchemaBuilder from "@pothos/core";
import locationApi from "@/lib/locationApi";
import { Country, City } from "@/types";

const builder = new SchemaBuilder<{}>({});

const countryRef = builder.objectRef<Country>("Country");
const cityRef = builder.objectRef<City>("City");

countryRef.implement({
  description: "A country with it's name and coordinates",
  fields: (t) => ({
    latitude: t.exposeFloat("latitude"),
    longitude: t.exposeFloat("longitude"),
    name: t.exposeString("name"),
    isoCode: t.exposeString("isoCode"),
    flag: t.exposeString("flag"),
  }),
});

cityRef.implement({
  description: "A city with it's name and coordinates",
  fields: (t) => ({
    latitude: t.exposeFloat("latitude"),
    longitude: t.exposeFloat("longitude"),
    name: t.exposeString("name"),
  }),
});

builder.queryType({
  fields: (t) => ({
    countries: t.field({
      type: [countryRef],
      resolve: async (_parent) => {
        try {
          const countries = await locationApi.getCountries();
          return countries;
        } catch (e) {
          throw handleError(e, "Failed to fetch countries");
        }
      },
    }),
    cities: t.field({
      type: [cityRef],
      args: {
        isoCode: t.arg.string({ required: true }),
      },
      resolve: async (_parent, { isoCode }) => {
        try {
          const cities = await locationApi.getCities(isoCode);
          return cities;
        } catch (e) {
          throw handleError(e, "Failed to fetch cities");
        }
      },
    }),
  }),
});

export const locationSchema = builder.toSchema();
