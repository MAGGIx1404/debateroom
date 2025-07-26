<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const props = defineProps({
  tier: {
    type: String,
    required: true
  }
});

const tierData = {
  novice: {
    name: "Novice",
    emoji: "/animations/fire.lottie"
  },
  challenger: {
    name: "Challenger",
    emoji: "/animations/fire.lottie"
  },
  elite: {
    name: "Elite",
    emoji: "/animations/fire.lottie"
  },
  mastermind: {
    name: "Mastermind",
    emoji: "/animations/thunder.lottie"
  },
  legend: {
    name: "Legend",
    emoji: "/animations/diamond.lottie"
  }
};

const badge = tierData[props.tier?.toLowerCase()] || tierData.novice;
</script>

<template>
  <DotLottieVue class="size-5" autoplay loop :src="badge.emoji" :class="badge.name === 'Mastermind' ? 'scale-200' : ''" />
</template>
