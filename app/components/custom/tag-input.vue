<template>
  <div class="w-full space-y-2">
    <slot />
    <Input id="tags" v-model="input" name="tags" placeholder="Add a tags" @keydown.enter.prevent="addTag" @keydown.backspace="removeLastTag" />

    <TransitionGroup class="w-full flex flex-wrap gap-2 items-center" name="list" tag="div">
      <Badge v-for="(tag, index) in tags" :key="index" variant="secondary" class="text-sm">
        {{ tag }}
        <div class="size-auto flex items-center justify-center" @click="removeTag(index)">
          <X class="size-3" />
        </div>
      </Badge>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { X } from "lucide-vue-next";

const tags = ref([]);
const input = ref("");

const emit = defineEmits(["update:tags"]);

function addTag() {
  const newTag = input.value.trim();
  if (newTag && !tags.value.includes(newTag)) {
    tags.value.push(newTag);
    emit("update:tags", tags.value);
  }
  input.value = "";
}

function removeLastTag() {
  if (input.value === "") {
    tags.value.pop();
    emit("update:tags", tags.value);
  }
}

function removeTag(index) {
  tags.value.splice(index, 1);
  emit("update:tags", tags.value);
}
</script>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.85);
}

.list-leave-active {
  position: absolute;
  opacity: 0;
}
</style>
