<template>
  <Wrapper class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Main Content -->
    <Card v-if="!isEditMode" class="w-full border col-span-6 min-h-screen">
      <div class="w-full">
        <WidgetsProfileBanner :data="user" />
      </div>

      <div class="w-full space-y-6 relative">
        <!-- Edit -->
        <Button v-if="sameUser" class="absolute -top-18 right-0" variant="ghost" @click.prevent="setIsEditMode(true)"><SquarePen /> Edit Profile </Button>

        <!-- Info -->
        <div class="w-full grid grid-cols-3 gap-4">
          <div class="w-full space-y-4 col-span-2">
            <!-- Name -->
            <div class="w-max relative">
              <h1 class="text-2xl font-semibold flex items-center gap-2">Jeet Ramoliya <CustomTierBadge tier="Legend" /></h1>
              <p class="text-sm text-muted-foreground">@{{ user.username }}</p>

              <div v-if="user.points >= 100000" class="absolute bottom-0 left-0 z-10 w-full pointer-events-none scale-200">
                <CustomLottiePlayer src="/animations/success.lottie" class="w-full" />
              </div>
            </div>

            <!-- Actions -->
            <div class="w-full space-y-4">
              <div class="flex items-center gap-2">
                <CustomGlassShine>
                  <Button variant="outline">
                    <CustomLottiePlayer src="/animations/coin.lottie" class="size-5 scale-[2.5]" />
                    {{ new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(user.points) }} Points
                  </Button>
                </CustomGlassShine>
                <CustomGlassShine>
                  <Button variant="outline">
                    <CustomLottiePlayer src="/animations/trophy.lottie" class="size-5 scale-[3]" />
                    521 Debates Won
                  </Button>
                </CustomGlassShine>
              </div>
              <div class="flex items-center flex-wrap gap-4">
                <Button variant="ghost" class="hover:text-primary p-0 h-auto hover:bg-transparent font-semibold"> 23,040 Followers </Button>
                <Button variant="ghost" class="hover:text-primary p-0 h-auto hover:bg-transparent font-semibold"> 1,234 Following </Button>
                <Button variant="ghost" class="hover:text-primary p-0 h-auto hover:bg-transparent font-semibold"> 1,234 Replies </Button>
              </div>
            </div>

            <Separator />

            <!-- Bio -->
            <div class="w-full">
              <p class="text-sm text-muted-foreground">
                {{ user.description ? user.description : "This user has not set a bio yet." }}
              </p>
            </div>
          </div>

          <Card class="w-full gap-3 col-span-1 items-center flex-col text-center relative overflow-hidden">
            <h4 class="text-xl font-semibold">Rank Overview</h4>
            <Separator />
            <img :src="`/rank/${getRank(user.rank).id}.svg`" alt="Rank Badge" class="w-2/3 drop-shadow-[0px_0px_5px] drop-shadow-amber-500" />
            <h6 class="text-base font-semibold text-amber-500">{{ getRank(user.rank).name }} (#1)</h6>

            <CustomLottiePlayer src="/animations/aura.lottie" class="w-full absolute bottom-24 left-0 scale-200" />
          </Card>
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

    <!-- Edit Mode -->
    <Card v-else class="w-full border col-span-6">
      <div class="w-full">
        <!-- Banner -->
        <div class="w-full h-80 border-2 border-accent rounded-lg overflow-hidden bg-muted relative hover:bg-muted-foreground/15 transition-all duration-300 ease group">
          <img
            v-if="bannerPreviewUrl || newData.bannerUrl"
            :src="bannerPreviewUrl || newData.bannerUrl"
            alt="Profile Banner"
            class="size-full pointer-events-none group-hover:opacity-75 transition-opacity duration-300 ease"
          />
          <div class="size-full grid place-items-center absolute top-0 z-[3] pointer-events-none mix-blend-difference">
            <Edit class="text-muted-foreground size-8" />
          </div>

          <Input type="file" placeholder="Enter Banner URL" class="absolute inset-0 z-[2] opacity-0 cursor-pointer" @change="(e) => handleFileChange(e, 'banner')" />
        </div>

        <!-- Profile -->
        <div class="size-32 rounded-full ml-4 -mt-16 overflow-hidden relative z-[2] group">
          <div class="size-full absolute top-0 z-[2] grid place-items-center group-hover:bg-muted-foreground/50 transition-all duration-300 ease">
            <Edit class="text-white size-6" />
          </div>
          <img :src="avatarPreviewUrl || newData.avatarUrl" alt="@user" class="size-full object-cover" />
          <Input type="file" placeholder="Enter Banner URL" class="absolute inset-0 z-[3] opacity-0 cursor-pointer" @change="(e) => handleFileChange(e, 'avatar')" />
        </div>
      </div>

      <!-- Info -->
      <form class="w-full grid grid-cols-2 gap-4" @submit.prevent="onSubmit">
        <div class="w-full space-y-2 relative">
          <Label for="username">Username :</Label>
          <Input id="username" v-model="newData.username" placeholder="Enter your name" class="w-full" />
          <CustomTierBadge tier="Legend" class="absolute bottom-4 right-3" />
        </div>
        <div class="w-full space-y-2">
          <Label for="name">Name :</Label>
          <Input id="name" v-model="newData.name" placeholder="Enter your name" class="w-full" />
        </div>
        <div class="w-full space-y-2 col-span-2">
          <Label for="bio">Bio :</Label>
          <Textarea id="bio" v-model="newData.description" placeholder="Enter your bio" class="w-full" />
        </div>
        <div class="w-full grid grid-cols-2 gap-4 col-span-2">
          <Button variant="outline" @click.prevent="setIsEditMode(false)"> Cancel </Button>
          <Button type="submit" :disabled="loading">
            {{ loading ? "Saving..." : "Save Changes" }}
          </Button>
        </div>
      </form>
    </Card>

    <!-- Right Panel -->
    <Card class="w-full sticky top-[89px] col-span-2 gap-2">
      <div
        v-for="i in 16"
        :key="i"
        class="w-full h-10 bg-muted rounded-lg animate-pulse"
        :style="{
          animationDelay: `${i * 100}ms`
        }"
      ></div>
    </Card>
  </Wrapper>
</template>

<script setup>
import { toast } from "vue-sonner";
import { SquarePen, Edit } from "lucide-vue-next";
import { getRank, storeToRefs } from "#imports";

definePageMeta({
  layout: "profile"
});

const { id } = useRoute().params;

const userStore = useUserStore();
const { getUser: currentUser } = storeToRefs(userStore);

const { data: user, refresh } = await useFetch(`/api/users/${id}`, {
  method: "GET",
  headers: {
    "content-type": "application/json"
  }
});

const sameUser = computed(() => {
  return currentUser.value.id === id;
});

// Edit Mode
const loading = ref(false);

const newData = ref({
  username: user.value.username,
  name: user.value.name,
  description: user.value.description,
  avatarUrl: user.value.avatarUrl,
  bannerUrl: user.value.bannerUrl
});

const isEditMode = ref(false);
const setIsEditMode = (value) => {
  if (!sameUser.value) return;
  isEditMode.value = value;
  window.scrollTo(0, 0);
};

const avatarPreviewUrl = ref(null);
const bannerPreviewUrl = ref(null);
const selectedAvatarFile = ref(null);
const selectedBannerFile = ref(null);

const handleFileChange = (event, type) => {
  const file = event.target.files[0];
  if (file) {
    if (type === "avatar") {
      selectedAvatarFile.value = file;
      newData.value.avatarUrl = URL.createObjectURL(file);
      avatarPreviewUrl.value = newData.value.avatarUrl;
    } else if (type === "banner") {
      selectedBannerFile.value = file;
      newData.value.bannerUrl = URL.createObjectURL(file);
      bannerPreviewUrl.value = newData.value.bannerUrl;
    }
  }
};

const onSubmit = async () => {
  if (!sameUser.value) return;
  loading.value = true;
  const payload = {
    username: newData.value.username,
    name: newData.value.name,
    description: newData.value.description,
    avatarUrl: newData.value.avatarUrl,
    bannerUrl: newData.value.bannerUrl
  };

  if (
    payload.username === user.value.username &&
    payload.name === user.value.name &&
    payload.description === user.value.description &&
    payload.avatarUrl === user.value.avatarUrl &&
    payload.bannerUrl === user.value.bannerUrl
  ) {
    setIsEditMode(false);
    return;
  }

  if (!payload.username || !payload.name || !payload.description) {
    toast.error("Please fill all the fields.");
    return;
  }

  const formData = new FormData();
  if (payload.avatarUrl && payload.avatarUrl !== user.value.avatarUrl) {
    formData.append("avatar", selectedAvatarFile.value);
  }

  if (payload.bannerUrl && payload.bannerUrl !== user.value.bannerUrl) {
    formData.append("banner", selectedBannerFile.value);
  }
  formData.append("username", payload.username);
  formData.append("name", payload.name);
  formData.append("description", payload.description);

  try {
    const res = await $fetch(`/api/users/${id}/update`, {
      method: "PUT",
      body: formData
    });

    if (res.success) {
      toast.success("Profile updated successfully!");
      userStore.setUser(res.user);
      refresh();
      setIsEditMode(false);
    } else {
      toast.error("Failed to update profile. Please try again.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>
