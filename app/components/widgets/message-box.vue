<template>
  <div class="w-full space-y-2">
    <div class="w-full flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="/avatars/2.png" alt="@unovue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p class="text-sm font-semibold">{{ data.author.username }}</p>
      </div>
      <p class="text-sm">
        {{ dayjs(data.createdAt).fromNow() }}
      </p>
    </div>
    <Card class="w-[calc(100%-40px)] ml-auto">
      <p class="text-base">
        {{ data.content }}
      </p>

      <Separator v-if="!isCurrentUser" />

      <div v-if="!isCurrentUser" class="w-full flex items-center justify-between gap-4">
        <div class="w-full flex items-center gap-2">
          <Button variant="outline"> <ThumbsUp /> Upvote </Button>
          <Button variant="outline"> <ThumbsDown /> Downvote </Button>
        </div>

        <Button variant="secondary"> <Crown /> Adopt this answer </Button>
      </div>
    </Card>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ThumbsUp, ThumbsDown, Crown } from "lucide-vue-next";

dayjs.extend(relativeTime);

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const store = useUserStore();

const isCurrentUser = computed(() => {
  return store.getUser.user.id === props.data.author.id;
});
</script>
