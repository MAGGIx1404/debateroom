import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const body = await readBody(event);

  const { debateId, content } = body;

  if (!debateId || !content) {
    throw createError({
      statusCode: 400,
      message: "Debate ID and content are required."
    });
  }

  const reply = await prisma.reply.create({
    data: {
      content,
      debateId,
      authorId: user.id
    }
  });

  return reply;
});
