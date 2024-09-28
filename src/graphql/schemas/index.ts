import { mergeSchemas } from "graphql-yoga";
import { weatherSchema } from "./weatherSchema";

export const schema = mergeSchemas({
  schemas: [weatherSchema],
});
