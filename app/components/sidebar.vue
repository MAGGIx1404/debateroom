<template>
  <div class="w-full col-span-2 h-[calc(100vh-72px)] sticky top-[68px] p-4 bg-card border-r">
    <div class="w-full space-y-2 pb-2 border-b">
      <p class="text-sm font-semibold">General</p>
      <div class="w-full space-y-1">
        <Button v-for="link in links" :key="link.name" as-child class="justify-start w-full" variant="ghost" :class="route.path === link.to ? 'bg-accent text-accent-foreground' : ''">
          <NuxtLink :to="link.to">
            {{ link.name }}
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

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
    to: "/#leaderboard"
  },
  {
    name: "My Debates",
    to: "/#debates"
  },
  {
    name: "History",
    to: "/#history"
  }
];
</script>
