<template>
  <main class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Left Panel -->
    <WidgetsTopicsBox title="Explore Topics" />

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
      <div v-if="data.length" class="w-full flex flex-col gap-4">
        <WidgetsDebateCard v-for="i in data" :key="i" :data="i" />
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
import { faker } from "@faker-js/faker";
import { Plus } from "lucide-vue-next";

const generateData = () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  tags: faker.helpers.uniqueArray(faker.lorem.word, 4),
  commentsCount: faker.string.numeric(2),
  lastUpdated: faker.date.recent().toLocaleString(),
  status: faker.helpers.arrayElement(["Discussing", "Completed", "Abandoned", "Unanswered"])
});

const data = computed(() => {
  const debates = [];
  if (import.meta.server) {
    return debates;
  }
  for (let i = 0; i < 20; i++) {
    debates.push(generateData());
  }
  return debates;
});
</script>
