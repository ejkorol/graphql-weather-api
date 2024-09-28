import { mergeSchemas } from "graphql-yoga";
import { weatherSchema } from "./weatherSchema";
import { locationSchema } from "./locationSchema";

export const schema = mergeSchemas({
  schemas: [weatherSchema, locationSchema],
});
