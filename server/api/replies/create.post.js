import prisma from "~~/lib/prisma";
import { manageRank } from "~~/server/utils/rank-matrix";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const body = await readBody(event);

  const { debateId, content } = body;
  let earnedPoints = 0;

  if (!debateId || !content) {
    throw createError({
      statusCode: 400,
      message: "Debate ID and content are required."
    });
  }

  const existingReply = await prisma.reply.findFirst({
    where: {
      debateId,
      authorId: user.id
    }
  });

  if (existingReply) {
    // - 🗨️ Adding a reply: +5 points
    await manageRank(user.id, 5);
    earnedPoints = 5;
  } else {
    // check if the user is author of the debate
    const debate = await prisma.debate.findUnique({
      where: { id: debateId },
      select: { creatorId: true }
    });

    if (debate && debate.creatorId !== user.id) {
      // Only award points if the user is not the author of the debate
      // - 🗣️ Joining a debate: +25 points
      await manageRank(user.id, 25);
      earnedPoints = 25;
    } else {
      // - 🗨️ Adding a reply: +5 points
      await manageRank(user.id, 5);
      earnedPoints = 5;
    }
  }

  const reply = await prisma.reply.create({
    data: {
      content,
      debateId,
      authorId: user.id
    }
  });

  return {
    status: "success",
    data: reply,
    earnedPoints: earnedPoints
  };
});
