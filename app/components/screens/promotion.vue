<template>
  <div class="w-full h-screen fixed overflow-hidden top-0 left-0 z-50 grid place-items-center bg-background/50 backface-hidden backdrop-blur-sm">
    <Card class="w-xl gap-4">
      <h1 class="text-2xl font-semibold text-center">Promotion !!!</h1>
      <Separator />

      <div class="w-full flex justify-around my-4 items-center relative">
        <div class="w-40 grid place-items-center relative scale-75 opacity-50">
          <img :src="getRank(data.rawData.oldRank).id" alt="New Rank" class="w-full" />
          <h4 class="text-xl mt-4">{{ data.rawData.oldRank }}</h4>
        </div>

        <MoveRight class="scale-[3] text-primary" />

        <div class="w-40 grid place-items-center relative">
          <img :src="getRank(data.rawData.newRank).id" alt="New Rank" class="w-full" />
          <CustomLottiePlayer src="/animations/success.lottie" class="w-full absolute scale-[4]" />
          <h4 class="text-xl mt-4">{{ data.rawData.newRank }}</h4>
        </div>
      </div>

      <div class="w-full text-center space-y-6">
        <p class="text-sm">
          Congratulations! You have been promoted to a new rank. Your hard work and dedication have paid off, and you are now recognized for your achievements. Keep up the great work and continue to
          strive for excellence!
        </p>
        <CustomGlassShine>
          <Button variant="gradient" class="w-full text-base h-auto" :disabled="loading" @click.prevent="action(data.id)">
            {{ loading ? "Loading..." : "Awesome!" }}
          </Button>
        </CustomGlassShine>
      </div>
    </Card>

    <CustomLottiePlayer src="/animations/confetti.lottie" class="w-full absolute z-10 pointer-events-none" />
  </div>
</template>

<script setup>
import { MoveRight } from "lucide-vue-next";
import { getRank } from "#imports";

defineProps({
  data: {
    type: Object,
    required: true
  },
  action: {
    type: Function,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>
