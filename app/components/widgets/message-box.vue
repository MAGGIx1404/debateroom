<template>
  <div class="w-full space-y-2">
    <div class="w-full flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Avatar>
          <AvatarImage :src="data.author.avatarUrl || '/avatars/3.png'" alt="@unovue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p class="text-sm font-semibold">{{ data.author.username }}</p>
      </div>
      <p class="text-sm">
        {{ dayjs(data.createdAt).fromNow() }}
      </p>
    </div>
    <Card class="w-[calc(100%-40px)] ml-auto" :class="{ 'animate-pulse bg-accent': newMessage }">
      <p class="text-base font-semibold">
        {{ data.content }}
      </p>

      <Separator v-if="!isCurrentUser" />

      <div v-if="!isCurrentUser" class="w-full flex items-center justify-between gap-4">
        <div class="w-full flex items-center gap-2">
          <Button variant="secondary"> <ThumbsUp /> Upvote </Button>
          <Button variant="secondary"> <ThumbsDown /> Downvote </Button>
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
  },
  newAnswer: {
    type: Boolean,
    default: false
  }
});

const store = useUserStore();
const newMessage = ref(props.newAnswer);

const isCurrentUser = computed(() => {
  return store.getUser.id === props.data.author.id;
});

onMounted(() => {
  if (newMessage.value) {
    setTimeout(() => {
      newMessage.value = false;
    }, 4000);
  }
});
</script>
