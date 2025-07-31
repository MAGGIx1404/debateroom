<template>
  <NuxtLink :to="`/debates/${data.id}`" class="w-full border p-6 shadow flex flex-col gap-3 relative overflow-hidden">
    <h1 class="text-xl w-[90%]">{{ data.name }}</h1>
    <p class="text-sm w-[97.5%]">
      {{ data.description }}
    </p>
    <div class="w-full flex items-center justify-start flex-wrap gap-2">
      <Badge v-for="tag in data.tags" :key="tag" variant="secondary" class="text-xs"> #{{ tag.tag.name }} </Badge>
    </div>

    <Separator class="my-2 mt-auto" />

    <div class="w-full flex items-center justify-between">
      <div class="w-full flex items-center gap-2">
        <Badge class="text-sm" variant="outline"><MessageSquareMore /> {{ data.replyCount }} Comments</Badge>
        <Badge class="text-sm" variant="outline"><Clock /> {{ dayjs(data.updatedAt).fromNow() }}</Badge>
      </div>

      <div class="flex items-center -space-x-2 hover:space-x-1">
        <Avatar v-for="i in 4" :key="i" class="size-8 border border-accent-foreground" :class="`z-[${i}]`">
          <AvatarImage :src="`/avatars/${i}.png`" alt="@user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="size-8 grid place-items-center text-center bg-accent z-[5]">
          <p class="text-xs">+3</p>
        </div>
      </div>
    </div>

    <!-- Taglines -->
    <!-- <CustomGlassShine
      class="absolute top-0 right-0 z-10 px-20 py-1 rotate-45 translate-x-16 translate-y-8 bg-red-600 bg-gradient-to-r from-yellow-600 to-yellow-500 text-primary-foreground shadow-[0px_0px_10px_0px] shadow-yellow-400"
    >
      <p class="text-base">Winner</p>
    </CustomGlassShine> -->
  </NuxtLink>
</template>

<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageSquareMore, Clock } from "lucide-vue-next";

dayjs.extend(relativeTime);

defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>
