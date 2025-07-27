export default defineNuxtRouteMiddleware(async (to) => {
  const publicPages = ["/auth/login", "/auth/register"]; // pages that should NOT require auth
  if (publicPages.includes(to.path)) return;

  if (import.meta.server) {
    try {
      await $fetch("/api/auth/me", {
        headers: useRequestHeaders(["cookie"])
      });

      // Optional: store user in pinia
      // const userStore = useUserStore()
      // userStore.setUser(user)

      return;
    } catch (e) {
      return navigateTo("/auth/login");
    }
  }
});
