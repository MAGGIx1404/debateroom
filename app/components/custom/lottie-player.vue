<template>
  <DotLottieVue :class="class" autoplay loop :src="src" />
</template>

<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

defineProps({
  src: {
    type: String,
    required: true
  },
  class: {
    type: String,
    default: ""
  }
});
</script>
