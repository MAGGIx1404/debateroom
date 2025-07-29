<template>
  <div class="w-full h-[calc(100vh-160px)] flex flex-col gap-8 items-center justify-center text-center">
    <div class="w-5xl -mb-20">
      <CustomLottiePlayer src="/animations/404.lottie" />
    </div>

    <div class="space-y-1">
      <h1 class="text-xl">
        {{ error.includes("404") ? "Sorry, the page you are looking for does not exist." : data }}
      </h1>
      <p class="text-sm text-gray-500">
        {{ error.includes("404") ? "Please check the URL or return to the homepage." : "An unexpected error occurred." }}
      </p>
    </div>
    <Button as-child>
      <NuxtLink to="/"> Return to Home </NuxtLink>
    </Button>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const error = String(props.data);
</script>
