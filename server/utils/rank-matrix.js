import prisma from "~~/lib/prisma";

const ranks = [
  { name: "NOVICE", points: 0 },
  { name: "Apprentice", points: 100 },
  { name: "Challenger", points: 2500 },
  { name: "Thinker", points: 5000 },
  { name: "Strategist", points: 10000 },
  { name: "Debater", points: 20000 },
  { name: "Mastermind", points: 40000 },
  { name: "Elite", points: 80000 },
  { name: "Legend", points: 160000 }
];

const rankMatrix = (points) => {
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (points >= ranks[i].points) {
      return ranks[i].name.toUpperCase();
    }
  }
};

export const manageRank = async (userId, earned_points) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { points: true, rank: true }
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "User not found."
    });
  }

  const oldPoints = user.points;
  const newPoints = oldPoints + earned_points;

  await awardPoints(userId, earned_points);

  const newRank = rankMatrix(newPoints);

  if (newRank !== user.rank) {
    await prisma.user.update({
      where: { id: userId },
      data: { rank: newRank }
    });
    await prisma.notification.create({
      data: {
        userId,
        content: `Congratulations! You've been promoted to ${newRank} rank.`,
        rawData: { oldRank: user.rank, newRank, oldPoints, newPoints }
      }
    });
  }
};
