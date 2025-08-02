const ranks = [
  { name: "NOVICE", id: 1 },
  { name: "Apprentice", id: 2 },
  { name: "Challenger", id: 3 },
  { name: "Thinker", id: 4 },
  { name: "Strategist", id: 5 },
  { name: "Debater", id: 6 },
  { name: "Mastermind", id: 7 },
  { name: "Elite", id: 8 },
  { name: "Legend", id: 9 }
];

export function getRank(rank) {
  const rankData = ranks.find((r) => r.name.toUpperCase() === rank);
  return rankData ? rankData : { name: "Unknown", id: 1 };
}
