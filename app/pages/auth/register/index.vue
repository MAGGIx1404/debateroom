<template>
  <Card class="w-md">
    <div class="w-full space-y-2">
      <h1 class="text-2xl font-bold text-center">Register</h1>
      <p class="text-center text-muted-foreground">Create a new account to get started</p>
    </div>
    <form class="w-full space-y-6" @submit.prevent="onSubmit">
      <div class="w-full space-y-2">
        <Label for="username" :class="errors.username ? 'text-red-500' : ''">Username : {{ errors.username }}</Label>
        <Input id="username" v-model="username" type="text" placeholder="Enter your username" class="w-full" v-bind="usernameAttrs" />
      </div>
      <div class="w-full space-y-2">
        <Label for="email" :class="errors.email ? 'text-red-500' : ''">Email : {{ errors.email }}</Label>
        <Input id="email" v-model="email" type="email" placeholder="Enter your email" class="w-full" v-bind="emailAttrs" />
      </div>
      <div class="w-full space-y-2">
        <Label for="password" :class="errors.password ? 'text-red-500' : ''">Password : {{ errors.password }}</Label>
        <Input id="password" v-model="password" type="password" placeholder="Enter your password" class="w-full" v-bind="passwordAttrs" />
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
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";
import * as yup from "yup";

definePageMeta({
  layout: "auth"
});

const router = useRouter();

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })
});

const loading = ref(false);

const [username, usernameAttrs] = defineField("username");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  try {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        username: values.username,
        email: values.email,
        password: values.password
      }
    });

    toast.success("Registration successful! Please login to continue.");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    loading.value = false;
    router.push("/auth/login");
    return res;
  } catch (err) {
    toast.error(err?.data?.message || "Something went wrong");
    loading.value = false;
  }
});
</script>
