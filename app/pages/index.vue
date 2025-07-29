<template>
  <main class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Left Panel -->
    <Card class="w-full border col-span-2 sticky top-[109px]">
      <h1 class="text-2xl font-medium">Categories</h1>
      <Separator />

      <p class="text-sm">{{ store.getUser }}'s Categories</p>

      <h1 class="text-xl">No. of debates: {{ debatesStore.getDebates.length }}</h1>
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
        <!-- Initial Skeletons -->
        <div v-if="debatesStore.loading && debatesStore.getDebates.length === 0" class="w-full space-y-6">
          <SkeletonsDebateCard v-for="i in 5" :key="i" :index="i" />
        </div>

        <!-- Main Content -->
        <WidgetsDebateCard v-for="debate in debatesStore.getDebates" :key="debate.id" :data="debate" />

        <!-- On scroll Sekeletons -->
        <div v-if="debatesStore.loading && debatesStore.getDebates.length > 0" class="w-full space-y-6">
          <SkeletonsDebateCard v-for="i in 3" :key="i" :index="i" />
        </div>
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
import { Plus } from "lucide-vue-next";

const store = useUserStore();
const debatesStore = useDebateStore();

onMounted(async () => {
  await debatesStore.fetchDebates();
});

function handleScroll() {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
  if (bottom) {
    debatesStore.fetchDebates();
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
