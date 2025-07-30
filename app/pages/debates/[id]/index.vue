<template>
  <main v-if="debate" class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Left Panel -->
    <WidgetsTopicsBox title="Debate Topics" :tags="debate.tags" />

    <!-- Main Content -->
    <Card class="w-full border col-span-4">
      <!-- Header -->
      <div class="w-full space-y-4">
        <h1 class="text-2xl font-medium">{{ debate.name }}</h1>
        <p class="text-base">
          {{ debate.description || "No description available for this debate." }}
        </p>

        <div class="w-full">
          <div class="w-full flex items-center gap-2">
            <Badge class="text-sm" variant="outline"><MessageSquareMore /> {{ debate.replies.length }} Comments</Badge>
            <Badge class="text-sm" variant="outline"><Clock /> {{ dayjs(debate.createdAt).fromNow() }}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      <!-- Debate Panel -->
      <div class="w-full relative">
        <!-- Messages -->
        <div v-if="debate.replies.length > 0" class="w-full space-y-6">
          <WidgetsMessageBox v-for="reply in debate.replies" :key="reply.id" :data="reply" />
        </div>

        <ScreensEmpty v-else />

        <!-- Reply Box -->
        <CustomReplyInput />
      </div>
    </Card>

    <!-- Right Panel -->
    <Card class="w-full border col-span-2 sticky top-[109px]">
      <h1 class="text-2xl font-medium">Participates</h1>
      <Separator />
      <WidgetsUsersList />
    </Card>
  </main>

  <Screens404 v-else-if="error" :data="error" />
</template>

<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageSquareMore, Clock } from "lucide-vue-next";

dayjs.extend(relativeTime);

const route = useRoute();

const { data: debate, error } = await useFetch(`/api/debates/${route.params.id}`, {
  key: `debate-${route.params.id}`,
  server: true
});
</script>
