<script setup>
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { MessageSquareMore } from "lucide-vue-next";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    message: yup.string().required("Message is required")
  })
});

const route = useRoute();
const id = route.params.id;

const loading = ref(false);
const isMessageSended = ref(false);

const [message, messageAttrs] = defineField("message");

const users = ["jeet", "alex", "debatebot", "sara"];

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  isMessageSended.value = false;

  try {
    const res = await $fetch("/api/replies/create", {
      method: "POST",
      body: {
        debateId: id,
        content: values.message
      },
      headers: {
        "Content-Type": "application/json"
      }
    });

    toast.success("Reply sent successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate
    isMessageSended.value = true;
    message.value = "";
    loading.value = false;
  } catch (error) {
    toast.error(error?.data?.message || "Something went wrong");
    loading.value = false;
    isMessageSended.value = false;
  }
});

function appendMention(username) {
  message.value += ` @${username}`;
}

function handleInput(event) {
  message.value = event.target.value;
  isMessageSended.value = false;
}
</script>

<template>
  <form class="w-full sticky bottom-0 right-0 z-10 bg-card flex flex-col items-end gap-1 py-6" @submit.prevent="onSubmit">
    <div class="w-full flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="/avatars/2.png" alt="@unovue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p class="text-sm font-semibold">John Doe</p>
      </div>
    </div>

    <div class="w-full space-y-3 pl-10">
      <Textarea
        v-model="message"
        :placeholder="errors.message && !isMessageSended ? errors.message : 'Type your reply here...'"
        rows="4"
        v-bind="messageAttrs"
        :class="errors.message && !isMessageSended ? 'border-red-500 text-red-500 placeholder:text-red-500 focus-visible:ring-red-500 focus-visible:border-red-500' : ''"
        @input="handleInput"
      />

      <div class="grid grid-cols-2 gap-3">
        <Select @update:model-value="appendMention">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Mention a user..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="user in users" :key="user" :value="user"> @{{ user }} </SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit">
          <MessageSquareMore class="w-4 h-4" />
          {{ loading ? "Sending..." : "Reply" }}
        </Button>
      </div>
    </div>
  </form>
</template>
