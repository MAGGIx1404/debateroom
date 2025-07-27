import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token"); // or whatever cookie name you're using

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return {
      userId: decoded.id
    };
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
});
