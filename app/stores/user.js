import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    updatePoints(points) {
      if (this.user) {
        this.user.user.points += points;
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user.user
  }
});
