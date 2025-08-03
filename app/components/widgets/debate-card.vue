<template>
  <NuxtLink :to="`/debates/${data.id}`" class="w-full border p-6 shadow rounded-xl bg-card flex flex-col gap-3 relative overflow-hidden">
    <h1 class="text-xl w-[90%]">{{ data.name }}</h1>
    <p class="text-sm w-[97.5%]">
      {{ data.description }}
    </p>
    <div class="w-full flex items-center justify-start flex-wrap gap-2">
      <Badge v-for="tag in data.tags" :key="tag" variant="secondary" class="text-xs"> #{{ tag.tag.name }} </Badge>
    </div>

    <Separator class="my-2 mt-auto" />

    <div class="w-full flex items-center justify-between">
      <div class="w-full flex items-center gap-4">
        <p class="text-xs flex items-center gap-1 text-muted-foreground"><MessageSquareMore class="size-4" /> {{ data.replyCount }} Comments</p>
        <p class="text-xs flex items-center gap-1 text-muted-foreground"><Clock class="size-4" /> {{ dayjs(data.updatedAt).fromNow() }}</p>
        <p class="text-xs flex items-center gap-1 text-muted-foreground">
          Created by
          <NuxtLink to="/" class="underline text-foreground">@{{ data.creator.username }}</NuxtLink>
        </p>
      </div>

      <div class="flex items-center -space-x-2 hover:space-x-1">
        <Avatar v-for="i in 4" :key="i" class="size-8 border border-accent-foreground">
          <AvatarImage :src="`/avatars/${i}.png`" alt="@user" />
          <AvatarFallback>
            {{ data.creator.username.charAt(0).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
        <div class="size-8 grid place-items-center text-center bg-accent z-[5] rounded-full">
          <p class="text-xs">+3</p>
        </div>
      </div>
    </div>

    <!-- Taglines -->
    <CustomGlassShine
      v-if="data.creator.id === store.getUser.id"
      class="absolute top-0 right-0 z-10 px-20 py-1 rotate-45 translate-x-16 translate-y-8 bg-red-600 bg-gradient-to-r from-purple-700 to-purple-500 text-primary-foreground shadow-[0px_0px_10px_0px] shadow-purple-400"
    >
      <p class="text-base">Winner</p>
    </CustomGlassShine>
  </NuxtLink>
</template>

<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageSquareMore, Clock } from "lucide-vue-next";

dayjs.extend(relativeTime);

const store = useUserStore();

defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>
