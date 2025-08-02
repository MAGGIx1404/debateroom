### Point distribution system for DebateRoom AI:
- ✅ Creating a debate: +50 points
- 🗨️ Adding a reply: +5 points
- 🏅 Accepting a reply as winner: +250 points
- 🏆 Winning a debate: +1000 points
- 🗣️ Joining a debate: +25 points


### Rank matrix:
| Rank          | Points Required |
| Novice       | 0               |
| Apprentice   | 1000            |
| Challenger   | 2500            |
| Thinker      | 5000            |
| Strategist   | 10000           |
| Debater      | 20000           |
| Mastermind   | 40000           |
| Elite        | 80000           |
| Legend       | 160000          |



## Ranking algorithm

1. Calculate total points based on user actions, like creating debates, adding replies, and winning debates.
2. Compare the total points with the rank matrix to determine the user's current rank.
3. Update the user's rank if their total points exceed the threshold for a higher rank.
4. Add a record in the notification table to inform the user of their new rank. After read, just mark it as read.
5. Ensure that the rank is updated in real-time as the user engages with the platform.
