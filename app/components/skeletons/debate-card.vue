<template>
  <div
    class="w-full border p-6 shadow flex flex-col gap-3 animate-pulse"
    :style="{
      animationDelay: `${index * 250}ms`
    }"
  >
    <h1 class="text-xl bg-current opacity-25">Loading...</h1>
    <p class="text-sm bg-current opacity-25">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae corrupti deleniti enim vel placeat quod suscipit sint soluta tempore sed. Amet corporis expedita ullam, dolore provident iure
      quasi distinctio suscipit.
    </p>
    <div class="w-full flex items-center justify-start flex-wrap gap-2 opacity-25">
      <Badge variant="secondary" class="text-xs bg-current"> #Loading </Badge>
      <Badge variant="secondary" class="text-xs bg-current"> #Loading </Badge>
      <Badge variant="secondary" class="text-xs bg-current"> #Loading </Badge>
    </div>
    <Separator class="my-2 mt-auto" />
    <div class="w-full flex items-center justify-between opacity-25">
      <div class="w-full flex items-center gap-2">
        <Badge class="text-sm bg-current" variant="outline"><MessageSquareMore /> Loading Comments</Badge>
        <Badge class="text-sm bg-current" variant="outline"><Clock /> Loading Time</Badge>
      </div>
      <Badge class="text-sm bg-current">Loading Status</Badge>
    </div>
  </div>
</template>

<script setup>
import { MessageSquareMore, Clock } from "lucide-vue-next";

defineProps({
  index: {
    type: Number,
    default: 0
  }
});
</script>
