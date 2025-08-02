import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "ID parameter is required"
    });
  }

  const debate = await prisma.debate.findUnique({
    where: { id },
    include: {
      creator: {
        select: { id: true, username: true }
      },
      winners: {
        select: { id: true, username: true }
      },
      replies: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          authorId: true,
          author: {
            select: { id: true, username: true, rank: true, avatarUrl: true }
          },
          upvotes: true,
          isAccepted: true
        }
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  if (!debate) throw createError({ statusCode: 404, statusMessage: "Debate not found" });

  return debate;
});
