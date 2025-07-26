import { verifyJwt } from "@@/server/utils/verifyJwt";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  return { userId: payload.userId };
});
