import { defineStore } from "pinia";

export const useRepliesStore = defineStore(
  "replies",
  {
    state: () => ({
      replies: [],
      lastReply: null
    }),
    actions: {
      addReplies(replies) {
        this.replies.push(...replies);
        if (replies.length > 0) {
          this.lastReply = replies[replies.length - 1];
        }
      },
      addReply(reply) {
        this.replies.push(reply);
        this.lastReply = reply;
      },
      clearReplies() {
        this.replies = [];
        this.lastReply = null;
      }
    },
    getters: {
      getReplies: (state) => state.replies,
      getLastReply: (state) => state.lastReply
    }
  },
  {
    persist: true
  }
);
