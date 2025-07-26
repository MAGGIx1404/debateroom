export default defineNuxtRouteMiddleware(async (to) => {
  const publicPages = ["/auth/login", "/auth/register"]; // pages that should NOT require auth
  if (publicPages.includes(to.path)) return;

  const { data } = await useFetch("/api/auth/me");

  if (!data.value?.userId) {
    return navigateTo("/login");
  }
});
