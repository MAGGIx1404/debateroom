<template>
  <Card class="w-full border col-span-2 sticky top-[109px]">
    <h1 class="text-2xl font-medium">{{ title }}</h1>
    <Separator />
    <div class="w-full flex flex-wrap gap-2">
      <Badge v-for="tag in tags" :key="tag" class="cursor-pointer" variant="secondary"> #{{ tag }} </Badge>
    </div>
  </Card>
</template>

<script setup>
import { faker } from "@faker-js/faker";

defineProps({
  title: {
    type: String,
    default: ""
  }
});

const generateTags = () => {
  const tags = [];
  for (let i = 0; i < 40; i++) {
    tags.push(faker.lorem.word());
  }
  return tags;
};

const tags = computed(() => {
  if (import.meta.server) {
    return [];
  }
  return generateTags();
});
</script>
