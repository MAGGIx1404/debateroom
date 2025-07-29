import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "10");
  const offset = (page - 1) * limit;

  const [debates, total] = await Promise.all([
    prisma.debate.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        creator: {
          select: { id: true, username: true }
        },
        replies: {
          select: { id: true }
        },
        winners: {
          select: { id: true, username: true }
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
    }),
    prisma.debate.count()
  ]);

  const data = debates.map((debate) => ({
    ...debate,
    replyCount: debate.replies.length,
    replies: undefined
  }));

  return {
    success: true,
    data,
    total,
    page,
    pageCount: Math.ceil(total / limit),
    hasMore: total > offset + limit
  };
});
