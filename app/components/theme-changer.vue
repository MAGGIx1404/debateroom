<template>
  <Button variant="outline" @click="toggleTheme">
    <Moon v-if="enabled" />
    <Sun v-else />
  </Button>
</template>

<script setup>
import { Sun, Moon } from "lucide-vue-next";

const { enabled, toggleTheme } = useTheme();
</script>
