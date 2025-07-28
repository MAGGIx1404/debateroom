<template>
  <Navbar />
  <div class="w-full px-20 py-10">
    <slot />
  </div>
</template>

<script setup>
const store = useUserStore();

const { data } = await useFetch("/api/auth/me", {
  headers: {
    "content-type": "application/json"
  },
  method: "GET",
  server: true
});

if (data.value) {
  if (data.value.statusCode === 401 || data.value.statusCode === 404) {
    navigateTo("/auth/login");
  } else {
    store.setUser(data.value.user);
  }
}
</script>
