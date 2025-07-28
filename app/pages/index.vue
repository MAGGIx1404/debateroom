<template>
  <main class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Left Panel -->
    <Card class="w-full border col-span-2 sticky top-[109px]">
      <h1 class="text-2xl font-medium">Categories</h1>
      <Separator />

      <p class="text-sm">{{ store.getUser }}'s Categories</p>
    </Card>

    <!-- Main Content -->
    <Card class="w-full border col-span-4 min-h-screen">
      <!-- Header -->
      <div class="w-full flex items-center justify-between">
        <h1 class="text-2xl font-medium">Latest Discussions</h1>

        <div class="flex items-center gap-2">
          <Select>
            <SelectTrigger class="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sorts</SelectLabel>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
                <SelectItem value="my-topics">My Topics</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button as-child>
            <NuxtLink to="/debates/new">
              <Plus />
              New Debate
            </NuxtLink>
          </Button>
        </div>
      </div>

      <Separator />

      <!-- Debates -->
      <div class="w-full space-y-6">
        <p v-if="debatesStore.getDebates" class="text-sm">
          {{ debatesStore.getDebates }}
        </p>
        <!-- <WidgetsDebateCard v-for="debate in data" :key="debate.id" :data="debate" /> -->
      </div>
    </Card>

    <!-- Right Panel -->
    <Card class="w-full border col-span-2 sticky top-[109px]">
      <h1 class="text-2xl font-medium">Leaderboard</h1>
      <Separator />
    </Card>
  </main>
</template>

<script setup>
import { onMounted } from "#imports";
import { Plus } from "lucide-vue-next";

const store = useUserStore();
const debatesStore = useDebateStore();

onMounted(async () => {
  await debatesStore.loadMore();
});

function handleScroll() {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
  if (bottom) debatesStore.loadMore();
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
