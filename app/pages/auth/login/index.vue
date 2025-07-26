<template>
  <Card class="w-md">
    <div class="w-full space-y-2">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <p class="text-center text-muted-foreground">Welcome back! Please login to your</p>
    </div>
    <form class="w-full space-y-6">
      <div class="w-full space-y-2">
        <Label for="email">Email :</Label>
        <Input id="email" type="email" placeholder="Enter your email" class="w-full" required />
      </div>
      <div class="w-full space-y-2">
        <Label for="password">Password :</Label>
        <Input id="password" type="password" placeholder="Enter your password" class="w-full" required />
      </div>
      <Button type="submit" class="w-full">Login</Button>
      <Separator />
      <div class="text-center">
        <p class="text-sm text-muted-foreground">Don't have an account ? <NuxtLink to="/auth/register" class="text-primary">Register</NuxtLink></p>
      </div>
    </form>
  </Card>
</template>

<script setup>
definePageMeta({
  layout: "auth"
});
</script>
