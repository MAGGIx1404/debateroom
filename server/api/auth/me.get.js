import jwt from "jsonwebtoken";
import prisma from "@@/lib/prisma";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");

  if (!token) {
    return {
      statusCode: 401,
      statusMessage: "Unauthorized"
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // @ts-ignore
    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        rank: true
      }
    });

    if (!user) {
      return {
        statusCode: 404,
        statusMessage: "User not found"
      };
    }

    return { user };
  } catch (err) {
    console.log("Error verifying token:", err);
    return {
      statusCode: 401,
      statusMessage: "Invalid token"
    };
  }
});
