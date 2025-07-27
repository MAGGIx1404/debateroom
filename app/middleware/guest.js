export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    try {
      const user = await $fetch("/api/auth/me", {
        headers: useRequestHeaders(["cookie"])
      });

      if (user) {
        return navigateTo("/");
      }
    } catch {
      return;
    }
  }

  return;
});
