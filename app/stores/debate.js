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
      async loadMore() {
        if (this.loading || !this.hasMore) return;

        this.loading = true;
        try {
          const { data } = await useFetch("/api/debates", {
            query: { page: this.page, limit: 10 },
            key: `debates-page-${this.page}`,
            method: "GET"
          });

          if (data.value && data.value.length > 0) {
            this.debates.push(...data.value);
            this.page++;
          } else {
            this.hasMore = false;
          }
        } catch (e) {
          console.error("Failed to load debates", e);
        } finally {
          this.loading = false;
        }
      }
    },
    getters: {
      getDebates: (state) => state.debates,
      getPage: (state) => state.page,
      hasMoreDebates: (state) => state.hasMore,
      isLoading: (state) => state.loading
    }
  },
  {
    persist: true
  }
);
