<script setup>
import { MessageSquareMore } from "lucide-vue-next";

const input = ref("");
const users = ["jeet", "alex", "debatebot", "sara"];

function appendMention(username) {
  input.value += ` @${username}`;
}

function handleInput(event) {
  input.value = event.target.value;
}
</script>

<template>
  <div class="w-full sticky bottom-0 right-0 z-10 bg-card flex flex-col items-end gap-3 py-6 pl-10">
    <Textarea v-model="input" placeholder="Type your reply..." :value="input" rows="4" @input="handleInput" />
    <div class="flex items-center gap-3">
      <Select @update:model-value="appendMention">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Mention a user..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="user in users" :key="user" :value="user"> @{{ user }} </SelectItem>
        </SelectContent>
      </Select>

      <Button>
        <MessageSquareMore class="w-4 h-4" />
        Reply
      </Button>
    </div>
  </div>
</template>
