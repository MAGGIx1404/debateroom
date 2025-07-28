<template>
  <Card class="w-md">
    <div class="w-full space-y-2">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <p class="text-center text-muted-foreground">Welcome back! Please login to your</p>
    </div>
    <form class="w-full space-y-6" @submit.prevent="onSubmit">
      <div class="w-full space-y-2">
        <Label for="email" :class="errors.email ? 'text-red-500' : ''">Email : {{ errors.email }}</Label>
        <Input id="email" v-model="email" type="email" placeholder="Enter your email" class="w-full" v-bind="emailAttrs" />
      </div>
      <div class="w-full space-y-2">
        <Label for="password" :class="errors.password ? 'text-red-500' : ''">Password : {{ errors.password }}</Label>
        <Input id="password" v-model="password" type="password" placeholder="Enter your password" class="w-full" v-bind="passwordAttrs" />
      </div>
      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </Button>
      <Separator />
      <div class="text-center">
        <p class="text-sm text-muted-foreground">Don't have an account ? <NuxtLink to="/auth/register" class="text-primary">Register</NuxtLink></p>
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
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })
});

const loading = ref(false);

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  try {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: values.email,
        password: values.password
      }
    });

    toast.success("Login successful! Redirecting...");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate
    loading.value = false;
    router.push("/");
    return res;
  } catch (err) {
    toast.error(err?.data?.message || "Something went wrong");
    loading.value = false;
  }
});
</script>
