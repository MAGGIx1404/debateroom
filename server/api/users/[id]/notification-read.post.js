import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const userId = event.context.params.id;

  const updatedNotification = await prisma.notification.updateMany({
    where: {
      id: id,
      userId: userId,
      isRead: false
    },
    data: {
      isRead: true
    }
  });

  if (updatedNotification.count === 0) {
    throw createError({
      statusCode: 404,
      message: "Notification not found or already read"
    });
  }

  return {
    message: "Notification marked as read",
    notificationId: id
  };
});
