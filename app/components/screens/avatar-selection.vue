<template>
  <div class="w-full h-screen fixed top-0 left-0 z-10 grid place-items-center bg-background/50 backface-hidden">
    <Card class="w-xl">
      <div class="w-full space-y-2">
        <h4 class="text-xl font-semibold">Select an Avatar</h4>
        <p class="text-sm">Choose an avatar to represent you in the application. You can change it later in your profile settings.</p>
      </div>
      <Separator />
      <form class="space-y-4" @submit.prevent="uploadAvatar">
        <div class="w-full p-4 relative border-dashed border text-center flex flex-col items-center justify-center gap-4">
          <!-- preview -->

          <div class="size-20 p-3 bg-accent grid place-items-center relative">
            <Upload class="size-6" />
            <div v-if="previewUrl" class="absolute inset-0 z-[3] overflow-hidden bg-card grid place-items-center">
              <img :src="previewUrl" alt="Avatar Preview" class="object-cover size-full" />
            </div>
          </div>

          <div class="space-y-1">
            <h5 class="text-sm font-semibold">Click to upload an avatar</h5>
            <p class="text-xs text-gray-400">Supported formats: PNG, JPG, JPEG. Max size: 2MB.</p>
          </div>

          <Input ref="fileInput" type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer z-10" @change="handleFileChange" />
        </div>
        <Button type="submit" class="w-full" :disabled="loading">
          {{ loading ? "Uploading..." : "Upload Avatar" }}
        </Button>
      </form>
    </Card>
  </div>
</template>

<script setup>
import { Upload } from "lucide-vue-next";
import { toast } from "vue-sonner";

const fileInput = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);
const loading = ref(false);

const store = useUserStore();

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function uploadAvatar() {
  if (!selectedFile.value) {
    toast.error("Please select an avatar file to upload.");
    return;
  }

  loading.value = true;
  const formData = new FormData();
  formData.append("avatar", selectedFile.value);

  try {
    const res = await $fetch(`/api/users/${store.user.user.id}/avatar`, {
      method: "POST",
      body: formData
    });

    if (res.success) {
      toast.success("Avatar uploaded successfully!");
      store.getUser.avatarUrl = res.avatarUrl;
      loading.value = false;
      previewUrl.value = null; // Clear preview after upload
      fileInput.value.value = ""; // Reset file input
    }
  } catch (error) {
    console.error("Error uploading avatar:", error);
    toast.error("Failed to upload avatar. Please try again.");
    loading.value = false;
  }
}
</script>
