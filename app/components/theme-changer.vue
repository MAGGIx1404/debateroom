<template>
  <Button variant="outline" class="rounded-full size-9" @click="toggleTheme">
    <Moon v-if="enabled" />
    <Sun v-else />
  </Button>
</template>

<script setup>
import { Sun, Moon } from "lucide-vue-next";

const { enabled, toggleTheme } = useTheme();
</script>
