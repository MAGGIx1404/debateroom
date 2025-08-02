<template>
  <main>
    <ScreensPromotion v-if="notifications[0]" :data="notifications[0]" :action="completeNotification" :loading="loading" />
    <slot />
  </main>
</template>

<script setup>
const store = useUserStore();

const loading = ref(false);
const notifications = ref([]);

onMounted(async () => {
  const res = await $fetch(`/api/users/${store.getUser.id}/notification`, {
    headers: {
      "content-type": "application/json"
    },
    method: "GET"
  });

  if (res.statusCode === 404) {
    notifications.value = [];
  } else {
    notifications.value = res;
  }
});

async function completeNotification(id) {
  loading.value = true;
  const res = await $fetch(`/api/users/${store.getUser.id}/notification-read`, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: { id }
  });

  if (res.statusCode === 404) {
    console.log(res.message);
    loading.value = false;
    notifications.value = [];
    return;
  }

  notifications.value = [];
  loading.value = false;
}
</script>
