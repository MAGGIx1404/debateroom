import prisma from "~~/lib/prisma";

export const awardPoints = async (userId, points) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: points }
    }
  });
};
