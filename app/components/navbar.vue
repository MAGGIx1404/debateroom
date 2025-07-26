<template>
  <nav class="w-full sticky top-0 left-0 z-10 bg-background border-b py-4 px-20 flex items-center justify-between">
    <NuxtLink to="/" class="text-xl font-semibold"> DEBATE ROOM </NuxtLink>

    <div class="flex items-centerer gap-2">
      <Button v-for="link in links" :key="link.name" variant="outline" as-child>
        <NuxtLink :to="link.to">
          {{ link.name }}
        </NuxtLink>
      </Button>
      <ThemeChanger />
    </div>
  </nav>
</template>

<script setup>
const links = [
  {
    name: "Home",
    to: "/"
  },
  {
    name: "Explore",
    to: "/explore"
  },
  {
    name: "Leaderboard",
    to: "/"
  },
  {
    name: "My Debates",
    to: "/"
  },
  {
    name: "Profile",
    to: "/"
  }
];
</script>
