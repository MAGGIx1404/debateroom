<template>
  <Wrapper v-if="debate" class="w-full grid grid-cols-8 gap-5 items-start">
    <!-- Main Content -->
    <Card class="w-full border col-span-6 px-0">
      <!-- Header -->
      <div class="w-full space-y-6 pb-4 border-b px-6">
        <div class="w-full space-y-1">
          <h1 class="text-2xl font-medium">{{ debate.name }}</h1>
          <p class="text-base">
            {{ debate.description || "No description available for this debate." }}
          </p>
        </div>

        <div class="w-full flex items-center gap-2 flex-wrap">
          <Badge v-for="tag in debate.tags" :key="tag"> #{{ tag.tag.name }} </Badge>
        </div>

        <div class="w-full flex items-center gap-4 justify-between">
          <p class="text-sm flex items-center gap-1">
            Created by <NuxtLink to="/" class="flex items-center gap-2 text-sm font-medium underline"> @{{ debate.creator.username }} </NuxtLink>
          </p>

          <div class="flex items-center gap-4 text-muted-foreground">
            <p class="text-xs flex items-center gap-1"><MessageSquareMore class="size-4" /> {{ debate.replies.length + (store.getReplies ? store.getReplies.length : 0) }} Comments</p>
            <p class="text-xs flex items-center gap-1"><Clock class="size-4" /> {{ dayjs(debate.createdAt).fromNow() }}</p>
          </div>
        </div>
      </div>

      <!-- Debate Panel -->
      <div class="w-full relative">
        <!-- Messages -->

        <div v-if="store.getReplies.length || debate.replies.length" class="w-full space-y-3">
          <AnimatePresence>
            <WidgetsMessageBox v-for="(reply, index) in debate.replies" :key="reply.id" :data="reply" :number="index" />
          </AnimatePresence>

          <!-- Live Messages -->
          <div v-if="store.getReplies" class="space-y-6 w-full">
            <AnimatePresence>
              <WidgetsMessageBox v-for="reply in store.getReplies" :key="reply.id" :data="reply" new-answer />
            </AnimatePresence>
          </div>
        </div>

        <ScreensEmpty v-else>
          <h4 class="text-xl">There are no replies yet. Be the first to start the discussion!</h4>
          <Separator />
        </ScreensEmpty>
      </div>

      <!-- Reply Box -->
      <CustomReplyInput :socket-event="sendMessage" />
    </Card>

    <!-- Right Panel -->
    <Card class="w-full border col-span-2 sticky top-[89px]">
      <h1 class="text-2xl font-medium">Participates</h1>
      <Separator />
      <WidgetsUsersList :data="participates" />
    </Card>
  </Wrapper>

  <Screens404 v-else-if="error" :data="error" />
</template>

<script setup>
import { AnimatePresence } from "motion-v";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageSquareMore, Clock } from "lucide-vue-next";
import { useRepliesStore } from "#imports";

dayjs.extend(relativeTime);

const route = useRoute();
const id = route.params.id;

const { data: debate, error } = await useFetch(`/api/debates/${route.params.id}`, {
  key: `debate-${id}`,
  server: true
});

const { sendMessage } = useSocket();
const store = useRepliesStore();
const userStore = useUserStore();

const participates = computed(() => {
  const uniqueMap = new Map();

  debate.value.replies.forEach((reply) => {
    if (reply.author?.id) {
      uniqueMap.set(reply.author.id, reply.author);
    }
  });

  return Array.from(uniqueMap.values());
});

onMounted(() => {
  sendMessage(
    JSON.stringify({
      type: "join",
      debateId: route.params.id
    })
  );

  const unlockAudio = () => {
    const audio = new Audio("/sounds/notification.mp3");
    audio.muted = true;
    audio.play().catch(() => {});
    document.removeEventListener("click", unlockAudio);
  };

  document.addEventListener("click", unlockAudio, { once: true });
});

onUnmounted(() => {
  store.clearAll();
});

const onNewReply = (reply) => {
  // on new reply, scroll to bottom of the page
  const container = document.querySelector(".w-full.relative");
  if (container) {
    setTimeout(() => {
      window.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }, 500);
  }

  if (reply[0].author.id === userStore.getUser.id) return;

  const sound = new Audio("/sounds/notification.mp3");
  sound.play();
};

watch(store.getReplies, (newReply) => {
  onNewReply(newReply);
});
</script>
