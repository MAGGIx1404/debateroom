<template>
  <div class="w-full grid grid-cols-8 gap-8 items-start">
    <!-- Left Panel -->
    <WidgetsTopicsBox title="Hot Topics" />

    <!-- Center Content -->
    <Card class="w-full border col-span-4">
      <h1 class="text-2xl font-medium">Create a New Debate</h1>
      <Separator />

      <form class="w-full space-y-6">
        <!-- Title -->
        <div class="w-full space-y-2">
          <Label for="title"> Debate Title :</Label>
          <Input id="title" name="title" type="text" placeholder="Enter debate title" />
        </div>

        <!-- Message -->
        <div class="w-full space-y-2">
          <Label for="message"> Message :</Label>
          <Textarea id="message" name="message" placeholder="Enter debate message" />
        </div>

        <!-- Tags -->
        <CustomTagInput v-model:tags="_tags" />

        <!-- Ai Personas / Roles -->
        <div class="w-full space-y-2">
          <Label for="roles"> AI Personas / Roles :</Label>
          <Select id="roles">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a AI persona or role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="Debater">Professor AI: Formal, academic arguments</SelectItem>
                <SelectItem value="Debater">Street Debater AI: Aggressive, punchy responses</SelectItem>
                <SelectItem value="Debater">Neutral Analyst AI: Balanced logic-based analysis</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- Type -->
        <div class="w-full space-y-2">
          <Label for="type"> Debate Type :</Label>
          <Select id="type">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a debate type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Anonymous">Anonymous</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-center space-x-2">
          <Switch id="ai" />
          <Label for="ai"> Only AI Generated Responses </Label>
        </div>
        <div class="w-full grid grid-cols-2 gap-4">
          <Button class="w-full" variant="outline"> Cancel </Button>
          <Button class="w-full"> Create Debate </Button>
        </div>
      </form>
    </Card>

    <!-- Right Panel -->
    <Card class="w-full border col-span-2 sticky top-[109px]">
      <h1 class="text-2xl font-medium flex items-center gap-2">Recent Activity</h1>
      <Separator />
    </Card>
  </div>
</template>

<script setup>
const _tags = ref([]);
</script>
