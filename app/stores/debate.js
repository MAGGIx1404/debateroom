import { defineStore } from "pinia";

export const useDebateStore = defineStore(
  "debate",
  {
    state: () => ({
      debates: [],
      page: 1,
      hasMore: true,
      loading: false
    }),
    actions: {
      async fetchDebates() {
        if (this.loading || !this.hasMore) return;
        this.loading = true;

        try {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a delay
          const response = await $fetch("/api/debates", {
            params: { page: this.page, limit: 10 }
          });

          if (response.success) {
            this.debates.push(...response.data);
            this.hasMore = response.hasMore;
            this.page += 1;
            this.loading = false;
          } else {
            console.error("Failed to fetch debates:", response);
          }
        } catch (error) {
          console.error("Error fetching debates:", error);
        }
      },
      clearDebates() {
        this.debates = [];
        this.page = 1;
        this.hasMore = true;
        this.loading = false;
      }
    },
    getters: {
      getDebates: (state) => state.debates,
      getDebateById: (state) => (id) => state.debates.find((debate) => debate.id === id)
    }
  },
  {
    persist: true
  }
);
