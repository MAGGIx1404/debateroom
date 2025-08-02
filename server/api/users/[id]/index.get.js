import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  // Fetch user data from the database
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return user;
});
