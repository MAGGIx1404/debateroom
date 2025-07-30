<template>
  <Card class="w-full border col-span-2 sticky top-[109px]">
    <h1 class="text-2xl font-medium">{{ title }}</h1>
    <Separator />
    <div class="w-full flex flex-wrap gap-2">
      <Badge v-for="tag in tags" :key="tag" class="cursor-pointer" variant="secondary"> #{{ tag.tag.name }} </Badge>
    </div>
  </Card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Topics"
  },
  tags: {
    type: Array,
    default: () => []
  }
});
</script>
