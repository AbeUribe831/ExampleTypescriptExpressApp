import { Schema } from "jsonschema";

export const postBodySchema: Schema = {
  type: "object",
  properties: {
    redis_comment: {
      type: "string",
    },
    id: {
      type: "number",
    },
  },
  required: ["redis_comment"],
};
