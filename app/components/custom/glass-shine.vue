<template>
  <div :class="class">
    <slot />

    <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
      <div class="shine h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  class: {
    type: String,
    default: "relative"
  }
});
</script>

<style scoped>
.shine {
  animation: shine 1.5s linear infinite;
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>
