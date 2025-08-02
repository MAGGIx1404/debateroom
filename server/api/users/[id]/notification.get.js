import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id;

  const notifications = await prisma.notification.findMany({
    where: {
      userId: userId,
      isRead: false
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  if (!notifications) {
    return {
      statusCode: 404,
      message: "Notification not found"
    };
  }

  return notifications;
});
