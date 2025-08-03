<template>
  <Navbar />

  <div class="w-full grid grid-cols-13">
    <Sidebar />

    <!-- Main Content -->
    <main class="col-span-11 min-h-screen p-5">
      <slot />
    </main>
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
  store.setUser(data.value.user);
}
</script>
