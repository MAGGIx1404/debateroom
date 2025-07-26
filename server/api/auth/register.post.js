import bcrypt from "bcrypt";
import prisma from "@@/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw createError({ statusCode: 400, message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashed
    }
  });

  return { message: "User registered", user: { id: user.id, username: user.username } };
});
