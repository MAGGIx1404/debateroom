<template>
  <main class="w-full h-screen flex items-center justify-center relative">
    <slot />
  </main>
</template>

<script setup>
const { data } = await useFetch("/api/auth/me", {
  headers: {
    "content-type": "application/json"
  },
  method: "GET",
  server: true
});

if (data.value) {
  if (data.value.statusCode === 401 || data.value.statusCode === 404) {
    console.log("Unauthorized or Not Found");
  } else {
    navigateTo("/");
  }
}
</script>
