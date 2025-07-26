<template>
  <main class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Left Panel -->
    <WidgetsTopicsBox title="Debate Topics" />

    <!-- Main Content -->
    <Card class="w-full border col-span-4 min-h-screen">
      <!-- Header -->
      <div class="w-full space-y-4">
        <h1 class="text-2xl font-medium">Is animals are better than humans? and which animal are will be the best pet?</h1>

        <div class="w-full">
          <div class="w-full flex items-center gap-2">
            <Badge class="text-sm" variant="outline"><MessageSquareMore /> 32 Comments</Badge>
            <Badge class="text-sm" variant="outline"><Clock /> 1 min ago</Badge>
          </div>
        </div>
      </div>

      <Separator />

      <!-- Debate Panel -->
      <div class="w-full space-y-6 relative">
        <WidgetsMessageBox v-for="i in 15" :key="i" />

        <!-- Reply Box -->
        <CustomReplyInput />
      </div>
    </Card>

    <!-- Right Panel -->
    <Card class="w-full border col-span-2 sticky top-[109px]">
      <h1 class="text-2xl font-medium">Participates</h1>
      <Separator />
      <WidgetsUsersList />
    </Card>
  </main>
</template>

<script setup>
import { MessageSquareMore, Clock } from "lucide-vue-next";
</script>
