<template>
  <div class="w-full">
    <!-- Banner -->
    <div class="w-full h-80 border-2 border-accent rounded-lg overflow-hidden bg-muted">
      <img v-if="data.bannerUrl" :src="data.bannerUrl" alt="Profile Banner" class="size-full" />
      <div v-else class="size-full grid place-items-center">
        <Image class="text-muted-foreground size-8" />
      </div>
    </div>

    <!-- Profile -->
    <Avatar class="size-32 ml-4 -mt-16">
      <AvatarImage :src="data.avatarUrl" alt="@user" />
      <AvatarFallback>
        {{ data.username.charAt(0).toUpperCase() }}
      </AvatarFallback>
    </Avatar>
  </div>
</template>

<script setup>
import { Image } from "lucide-vue-next";

defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>
