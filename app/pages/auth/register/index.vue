<template>
  <Card class="w-md">
    <div class="w-full space-y-2">
      <h1 class="text-2xl font-bold text-center">Register</h1>
      <p class="text-center text-muted-foreground">Create a new account to get started</p>
    </div>
    <form class="w-full space-y-6" @submit.prevent="onSubmit">
      <div class="w-full space-y-2">
        <Label for="username">Username : {{ errors.username }}</Label>
        <Input id="username" v-model="form.username" type="text" placeholder="Enter your username" class="w-full" required :error="errors.username" @input="errors.username = ''" />
      </div>
      <div class="w-full space-y-2">
        <Label for="email">Email : {{ errors.email }}</Label>
        <Input id="email" v-model="form.email" type="email" placeholder="Enter your email" class="w-full" required :error="errors.email" @input="errors.email = ''" />
      </div>
      <div class="w-full space-y-2">
        <Label for="password">Password : {{ errors.password }}</Label>
        <Input id="password" v-model="form.password" type="password" placeholder="Enter your password" class="w-full" required :error="errors.password" @input="errors.password = ''" />
      </div>
      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? "Registering..." : "Register" }}
      </Button>
      <Separator />
      <div class="text-center">
        <p class="text-sm text-muted-foreground">Already have an account? <NuxtLink to="/auth/login" class="text-primary">Login</NuxtLink></p>
      </div>
    </form>
  </Card>
</template>

<script setup>
import { z } from "zod";

definePageMeta({
  layout: "auth"
});

const form = ref({
  username: "",
  email: "",
  password: ""
});

const router = useRouter();

const loading = ref(false);
const errors = ref({});
const serverError = ref("");

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const onSubmit = async () => {
  loading.value = true;
  errors.value = {};
  serverError.value = "";

  const result = schema.safeParse(form.value);

  if (!result.success) {
    result.error.errors.forEach((e) => {
      if (e.path.length) {
        errors.value[e.path[0]] = e.message;
      }
    });
    loading.value = false;
    return;
  }

  try {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: form.value
    });

    // Success — redirect
    router.push("/auth/login");
  } catch (err) {
    // Show error
    serverError.value = err?.data?.message || "Something went wrong";
  }

  loading.value = false;
};
</script>
