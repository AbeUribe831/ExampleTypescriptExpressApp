import { Schema } from "jsonschema";

export const postQuerySchema: Schema = {
  type: "object",
  properties: {
    search: {
      type: "string",
    },
    location: {
      type: "string",
    },
  },
  required: ["search"],
};
