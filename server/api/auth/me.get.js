import { userTransformer } from "~~/server/utils/transformers";

export default defineEventHandler(async (event) => {
  return {
    user: userTransformer(event.context.user)
  };
});
