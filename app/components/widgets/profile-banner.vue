<template>
  <div class="w-full">
    <!-- Banner -->
    <div class="w-full h-80 border-2 border-accent-foreground">
      <NuxtImg src="/images/3.jpg" alt="Profile Banner" class="size-full" />
    </div>

    <!-- Profile -->
    <Avatar class="size-32 ml-4 -mt-16 border-2 border-accent-foreground">
      <AvatarImage src="/avatars/1.png" alt="@user" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</template>
