<template>
  <Wrapper class="w-full grid grid-cols-8 gap-5">
    <Card class="w-full col-span-6">
      <!-- Header -->
      <div class="w-full flex items-center justify-between">
        <h1 class="text-2xl font-medium">Latest Discussions</h1>

        <div class="flex items-center gap-2">
          <Select>
            <SelectTrigger class="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sorts</SelectLabel>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
                <SelectItem value="my-topics">My Topics</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button as-child>
            <NuxtLink to="/debates/new">
              <Plus />
              New Debate
            </NuxtLink>
          </Button>
        </div>
      </div>

      <Separator />

      <!-- Debates -->
      <div class="w-full space-y-6 min-h-screen">
        <!-- Initial Skeletons -->
        <div v-if="debatesStore.getDebates.length === 0" class="w-full space-y-6">
          <SkeletonsDebateCard v-for="i in 5" :key="i" :index="i" />
        </div>
        <!-- Main Content -->
        <WidgetsDebateCard v-for="debate in debatesStore.getDebates" :key="debate.id" :data="debate" />

        <!-- On scroll Sekeletons -->
        <div v-if="debatesStore.loading && debatesStore.getDebates.length > 0" class="w-full space-y-6">
          <SkeletonsDebateCard v-for="i in 3" :key="i" :index="i" />
        </div>
      </div>
    </Card>

    <!-- Leaderboard -->
    <Card class="w-full col-span-2 h-[calc(100vh-109px)] sticky top-[89px] rounded-lg">
      <h1 class="text-2xl font-medium">Leaderboard</h1>
      <Separator />

      <div class="w-full space-y-2">
        <Avatar>
          <AvatarImage :src="userStore.getUser.avatarUrl" alt="@user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p class="text-base">
          id : {{ userStore.getUser.id }}<br />
          Username : {{ userStore.getUser.username }}<br />
          Email : {{ userStore.getUser.email }}<br />
          Points : {{ userStore.getUser.points }}<br />
          Rank : {{ userStore.getUser.rank }}
        </p>
      </div>
    </Card>
  </Wrapper>
</template>

<script setup>
import { Plus } from "lucide-vue-next";

const debatesStore = useDebateStore();
const userStore = useUserStore();

function handleScroll() {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
  if (bottom) {
    debatesStore.fetchDebates();
  }
}

onMounted(async () => {
  await debatesStore.fetchDebates();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  debatesStore.clearDebates();
  window.removeEventListener("scroll", handleScroll);
});
</script>
