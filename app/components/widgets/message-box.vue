<template>
  <div class="w-full space-y-2">
    <div class="w-full flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="/avatars/2.png" alt="@unovue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p class="text-sm font-semibold">John Doe</p>
      </div>
      <p class="text-sm">1 min ago.</p>
    </div>
    <Card class="w-[calc(100%-40px)] ml-auto">
      <p class="text-base">
        Yes, animals can be better than humans in many ways. They often exhibit loyalty, unconditional love, and a simpler way of living that can be quite admirable. For example, dogs are known for
        their loyalty and companionship, while cats can be independent yet affectionate. As for the best pet, it really depends on personal preference. Some might argue that dogs are the best pets due
        to their loyalty and trainability, while others might prefer cats for their independence and low maintenance. Ultimately, the best pet is one that fits well with your lifestyle and
        personality.
      </p>
      <Separator />
      <div class="w-full flex items-center justify-between gap-4">
        <div class="w-full flex items-center gap-2">
          <Button variant="outline"> <ThumbsUp /> Upvote </Button>
          <Button variant="outline"> <ThumbsDown /> Downvote </Button>
        </div>

        <Button variant="secondary"> <Crown /> Adopt this answer </Button>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ThumbsUp, ThumbsDown, Crown } from "lucide-vue-next";
</script>
