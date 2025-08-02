<template>
  <motion.div
    class="w-full pt-3 relative group px-6"
    :class="{ 'animate-pulse bg-accent': newMessage }"
    :initial="{ scale: 0.95, opacity: 0 }"
    :animate="{ scale: 1, opacity: 1 }"
    :exit="{ scale: 0.95, opacity: 0 }"
    :transition="{
      type: 'spring',
      damping: 20,
      stiffness: 300,
      delay: number * 0.025
    }"
    layout
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <motion.div
      class="w-full"
      :initial="{ scale: 1 }"
      :animate="{ scale: isHover ? 1.015 : 1 }"
      :exit="{ scale: 1 }"
      :transition="{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }"
    >
      <div class="w-full flex items-start justify-between gap-4">
        <div class="flex items-start gap-2">
          <Avatar>
            <AvatarImage :src="data.author.avatarUrl" alt="@unovue" />
            <AvatarFallback>
              {{ data.author.username.charAt(0).toUpperCase() }}
            </AvatarFallback>
          </Avatar>
          <p class="text-sm text-muted-foreground">@{{ data.author.username }}</p>
        </div>
        <p class="text-xs text-muted-foreground">
          {{ dayjs(data.createdAt).fromNow() }}
        </p>
      </div>
      <div class="w-[calc(100%-56px)] ml-auto -mt-6 pb-3 border-b">
        <p class="text-sm font-semibold group-hover:animate-pulse">
          {{ data.content }}
        </p>
      </div>
    </motion.div>

    <motion.div
      class="absolute -bottom-3 right-10 z-[3] bg-accent px-3 rounded-2xl flex items-center"
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{ opacity: isHover ? 1 : 0, scale: isHover ? 1 : 0.5 }"
      :exit="{ opacity: 0, scale: 0.5 }"
      :transition="{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }"
    >
      <motion.button
        v-for="(action, index) in actions"
        :key="action.id"
        class="grid place-items-center p-2 text-muted-foreground cursor-pointer"
        :while-hover="{
          scale: 1.2,
          transition: {
            type: 'spring',
            damping: 20,
            stiffness: 300
          }
        }"
        :initial="{ scale: 0.5, rotate: 30 }"
        :animate="{ scale: isHover ? 1 : 0.5, rotate: isHover ? 0 : 30 }"
        :exit="{ scale: 0.5, rotate: 30 }"
        :transition="{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          delay: (index + 1) * 0.1
        }"
        :aria-label="action.label"
      >
        <component :is="action.icon" class="size-4" />
      </motion.button>
    </motion.div>
  </motion.div>
</template>

<script setup>
import { motion } from "motion-v";
import { ThumbsUp, ThumbsDown, Crown } from "lucide-vue-next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const actions = [
  {
    id: "win",
    icon: Crown,
    label: "Win"
  },
  {
    id: "upvote",
    icon: ThumbsUp,
    label: "Upvote"
  },
  {
    id: "downvote",
    icon: ThumbsDown,
    label: "Downvote"
  }
];

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  newAnswer: {
    type: Boolean,
    default: false
  },
  number: {
    type: Number,
    default: 0
  }
});

const isHover = ref(false);
const newMessage = ref(props.newAnswer);

onMounted(() => {
  if (newMessage.value) {
    setTimeout(() => {
      newMessage.value = false;
    }, 4000);
  }
});
</script>
