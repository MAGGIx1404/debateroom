<template>
  <main class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Left Panel -->
    <WidgetsTopicsBox title="User's Topics" />

    <!-- Main Content -->
    <Card class="w-full border col-span-4 min-h-screen">
      <!-- Header -->
      <div class="w-full">
        <WidgetsProfileBanner />
      </div>

      <!-- Info -->
      <div class="w-full space-y-6">
        <!-- Name -->
        <div class="w-max relative">
          <h1 class="text-2xl font-semibold flex items-center gap-2">Jeet Ramoliya <CustomTierBadge tier="Legend" /></h1>
          <p class="text-sm">@Maggix1404</p>
          <div class="absolute bottom-0 left-0 z-10 w-full pointer-events-none scale-200">
            <CustomLottiePlayer src="/animations/success.lottie" class="w-full" />
          </div>
        </div>

        <!-- Actions -->
        <div class="w-full flex items-center flex-wrap gap-2">
          <CustomGlassShine>
            <Button variant="gradient">
              <CustomLottiePlayer src="/animations/coin.lottie" class="size-5 scale-[2.5]" />
              32,030 Points
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
            Jeet Ramoliya is a passionate debater and tech enthusiast. He loves engaging in discussions about technology, philosophy, and the future of AI. When not debating, he enjoys coding and
            contributing to open-source projects. and the future of AI. When not debating, he enjoys coding and contributing to open-source projects.
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
    <Card class="w-full border col-span-2 sticky top-[109px]">
      <h1 class="text-2xl font-medium">Leaderboard</h1>
      <Separator />
    </Card>
  </main>
</template>

<script setup></script>
