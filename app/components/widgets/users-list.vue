<template>
  <div v-if="data.length" class="w-full space-y-2">
    <div v-for="user in data" :key="user.id" class="w-full flex items-center justify-between gap-4 not-last:border-b not-last:pb-2">
      <div class="flex gap-2">
        <Avatar>
          <AvatarImage :src="user.avatarUrl || `/avatars/1.png`" alt="@unovue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="flex items-center gap-1">
          <h3 class="text-base font-medium">{{ user.username }}</h3>
          <CustomTierBadge :tier="user.rank" />
        </div>
      </div>

      <Button as-child variant="ghost">
        <NuxtLink :to="`/profile/${user.username}`"> View Profile </NuxtLink>
      </Button>
    </div>
  </div>
  <ScreensEmpty v-else>
    <p class="text-sm">No users found in this debate. It seems like no one has participated yet.</p>
  </ScreensEmpty>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => []
  }
});
</script>
