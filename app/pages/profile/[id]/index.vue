<template>
  <Wrapper class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Main Content -->
    <Card class="w-full border col-span-6 min-h-screen">
      <!-- Header -->
      <div class="w-full">
        <WidgetsProfileBanner :data="user" />
      </div>

      <!-- Info -->
      <div class="w-full space-y-6 relative">
        <!-- Edit -->
        <Button v-if="sameUser" class="absolute -top-18 right-0" variant="ghost"><SquarePen /> Edit Profile </Button>

        <!-- Name -->
        <div class="w-max relative">
          <h1 class="text-2xl font-semibold flex items-center gap-2">Jeet Ramoliya <CustomTierBadge tier="Legend" /></h1>
          <p class="text-sm">@{{ user.username }}</p>

          <div v-if="user.points >= 100000" class="absolute bottom-0 left-0 z-10 w-full pointer-events-none scale-200">
            <CustomLottiePlayer src="/animations/success.lottie" class="w-full" />
          </div>
        </div>

        <!-- Actions -->
        <div class="w-full flex items-center flex-wrap gap-2">
          <CustomGlassShine>
            <Button variant="gradient">
              <CustomLottiePlayer src="/animations/coin.lottie" class="size-5 scale-[2.5]" />
              {{ new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(user.points) }} Points
            </Button>
          </CustomGlassShine>
          <CustomGlassShine>
            <Button variant="gradient">
              <CustomLottiePlayer src="/animations/trophy.lottie" class="size-5 scale-[3]" />
              521 Debates Won
            </Button>
          </CustomGlassShine>
          <Button variant="outline"> 23,040 Followers </Button>
          <Button variant="outline"> 1,234 Following </Button>
          <Button variant="outline"> 1,234 Replies </Button>
        </div>

        <!-- Bio -->
        <div class="w-full">
          <p class="text-base">
            {{ user.description ? user.description : "This user has not set a bio yet." }}
          </p>
        </div>

        <Separator />

        <!-- Tabs -->
        <Tabs default-value="debate" class="w-full space-y-4">
          <TabsList class="grid grid-cols-5 w-full">
            <TabsTrigger value="debate">My Debates</TabsTrigger>
            <TabsTrigger value="won">Debates Won</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
          </TabsList>
          <TabsContent value="debate" class="space-y-4">
            <div class="w-full h-40 grid place-items-center">
              <p class="text-base">This feature is coming soon! Stay tuned for updates.</p>
            </div>
          </TabsContent>
          <TabsContent value="won" class="space-y-4">
            <div class="w-full h-40 grid place-items-center">
              <p class="text-base">This feature is coming soon! Stay tuned for updates.</p>
            </div>
          </TabsContent>
          <TabsContent value="followers">
            <div class="w-full h-40 grid place-items-center">
              <p class="text-base">This feature is coming soon! Stay tuned for updates.</p>
            </div>
          </TabsContent>
          <TabsContent value="following">
            <div class="w-full h-40 grid place-items-center">
              <p class="text-base">This feature is coming soon! Stay tuned for updates.</p>
            </div>
          </TabsContent>
          <TabsContent value="replies">
            <div class="w-full h-40 grid place-items-center">
              <p class="text-base">This feature is coming soon! Stay tuned for updates.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>

    <!-- Right Panel -->
    <div class="w-full sticky top-[89px] col-span-2">
      <Card class="w-full gap-3 items-center flex-col text-center relative overflow-hidden">
        <h1 class="text-2xl font-semibold">
          {{ sameUser ? "Your Rank" : `${user.username}'s Rank` }}
        </h1>
        <Separator />
        <img :src="`/rank/${getRank(user.rank).id}.svg`" alt="Rank Badge" class="w-2/3 drop-shadow-[0px_0px_5px] drop-shadow-amber-500" />
        <h2 class="text-lg font-semibold text-amber-500">{{ getRank(user.rank).name }} (#1)</h2>

        <CustomLottiePlayer src="/animations/aura.lottie" class="w-full absolute bottom-24 left-0 scale-200" />
      </Card>
    </div>
  </Wrapper>
</template>

<script setup>
import { SquarePen } from "lucide-vue-next";
import { getRank, storeToRefs } from "#imports";

definePageMeta({
  layout: "profile"
});

const userStore = useUserStore();
const { getUser: currentUser } = storeToRefs(userStore);

const { id } = useRoute().params;

const { data: user } = await useFetch(`/api/users/${id}`, {
  method: "GET",
  headers: {
    "content-type": "application/json"
  }
});

const sameUser = computed(() => {
  return currentUser.value.id === id;
});
</script>
