<template>
  <div class="w-full space-y-2">
    <div v-for="user in users" :key="user.name" class="w-full flex items-center justify-between gap-4 not-last:border-b not-last:pb-2">
      <div class="flex gap-2">
        <Avatar>
          <AvatarImage :src="user.image" alt="@unovue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="flex items-center gap-1">
          <h3 class="text-base font-medium">{{ user.name }}</h3>
          <CustomTierBadge :tier="user.tier" />
        </div>
      </div>

      <Button as-child variant="ghost">
        <NuxtLink :to="`/profile/${user.username}`"> View Profile </NuxtLink>
      </Button>
    </div>
  </div>
</template>

<script setup>
const users = [
  {
    name: "Jeet Ramoliya",
    username: "Maggix1404",
    image: "https://avatars.githubusercontent.com/u/74851359?v=4",
    tier: "Legend"
  },
  {
    name: "John Doe",
    username: "john_doe",
    image: "https://avatars.githubusercontent.com/u/23456789?v=4",
    tier: "Novice"
  },
  {
    name: "Jane Smith",
    username: "jane_smith",
    image: "https://avatars.githubusercontent.com/u/34567890?v=4",
    tier: "Mastermind"
  },
  {
    name: "Alice Johnson",
    username: "alice_johnson",
    image: "https://avatars.githubusercontent.com/u/45678901?v=4",
    tier: "Novice"
  },
  {
    name: "Bob Brown",
    username: "bob_brown",
    image: "https://avatars.githubusercontent.com/u/56789012?v=4",
    tier: "Novice"
  }
];
</script>
