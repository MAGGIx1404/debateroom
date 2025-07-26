<template>
  <div class="w-full space-y-6">
    <Card class="flex-row items-center justify-between gap-4">
      <h1 class="text-2xl font-medium">Explore Debates</h1>
      <div class="flex items-center gap-2">
        <Input placeholder="Search debates..." class="w-64" />
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
    </Card>

    <div class="w-full grid grid-cols-3 gap-6">
      <WidgetsDebateCard v-for="i in data" :key="i" :data="i" />
    </div>
  </div>
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
  for (let i = 0; i < 30; i++) {
    debates.push(generateData());
  }
  return debates;
});
</script>
