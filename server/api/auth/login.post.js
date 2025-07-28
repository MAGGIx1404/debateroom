import prisma from "@@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Email and password are required" }));
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return sendError(event, createError({ statusCode: 404, statusMessage: "User not found" }));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Invalid credentials" }));
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      tier: user.tier
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Optionally set cookie
  setCookie(event, "token", token, {
    httpOnly: true,
    sameSite: true,
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  };
});
