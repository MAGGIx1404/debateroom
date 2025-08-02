<template>
  <nav class="w-full sticky top-0 left-0 z-20 bg-card py-4 px-5 flex items-center justify-between">
    <NuxtLink to="/" class="text-xl font-semibold"> DEBATE ROOM </NuxtLink>

    <div class="flex items-centerer gap-3">
      <NuxtLink :to="`/profile/${user.id}`">
        <Avatar class="size-9">
          <AvatarImage :src="user.avatarUrl" alt="@user" />
          <AvatarFallback>
            {{ user.username.charAt(0).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
      </NuxtLink>
      <ThemeChanger />
    </div>

    <!-- border -->
    <div class="w-full absolute bottom-0 right-0 z-[1] pointer-events-none grid grid-cols-13">
      <div class="w-full col-span-2"></div>
      <div class="w-full h-[1px] col-span-11 bg-border"></div>
    </div>
  </nav>
</template>

<script setup>
const userStore = useUserStore();
const { getUser: user } = storeToRefs(userStore);
</script>
