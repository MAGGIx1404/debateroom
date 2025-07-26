<template>
  <NuxtLink to="/debates/jidjasd" class="w-full border p-6 shadow flex flex-col gap-3">
    <h1 class="text-xl">{{ data.title }}</h1>
    <p class="text-sm">
      {{ data.description }}
    </p>
    <div class="w-full flex items-center justify-start flex-wrap gap-2">
      <Badge v-for="tag in data.tags" :key="tag" variant="secondary" class="text-xs"> #{{ tag }} </Badge>
    </div>

    <Separator class="my-2 mt-auto" />

    <div class="w-full flex items-center justify-between">
      <div class="w-full flex items-center gap-2">
        <Badge class="text-sm" variant="outline"><MessageSquareMore /> {{ data.commentsCount }} Comments</Badge>
        <Badge class="text-sm" variant="outline"><Clock /> {{ dayjs(data.lastUpdated).fromNow() }}</Badge>
      </div>
      <Badge
        class="text-sm"
        :class="{
          'bg-green-100 text-green-800': data.status === 'Discussing',
          'bg-blue-100 text-blue-800': data.status === 'Completed',
          'bg-yellow-100 text-yellow-800': data.status === 'Abandoned',
          'bg-gray-100 text-gray-800': data.status === 'Unanswered'
        }"
      >
        {{ data.status }}
      </Badge>
    </div>
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
