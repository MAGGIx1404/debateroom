<template>
  <Wrapper class="w-full grid grid-cols-8 gap-5 items-start">
    <!-- Center Content -->
    <Card class="w-full border col-span-6">
      <h1 class="text-2xl font-medium">Create a New Debate</h1>
      <Separator />

      <form class="w-full space-y-6" @submit.prevent="onSubmit">
        <!-- Title -->
        <div class="w-full space-y-2">
          <Label for="name" :class="errors.name ? 'text-red-500' : ''"> Debate Title : {{ errors.name }}</Label>
          <Input id="name" v-model="name" name="name" type="text" placeholder="Enter debate title" v-bind="nameAttrs" />
        </div>

        <!-- Message -->
        <div class="w-full space-y-2">
          <Label for="description" :class="errors.description ? 'text-red-500' : ''"> Message : {{ errors.description }}</Label>
          <Textarea id="description" v-model="description" name="description" placeholder="Enter debate message" v-bind="descriptionAttrs" />
        </div>

        <!-- Tags -->
        <CustomTagInput v-model:tags="tags">
          <Label for="tags" :class="errors.tags ? 'text-red-500' : ''"> Tags : {{ errors.tags }}</Label>
        </CustomTagInput>

        <!-- Ai Personas / Roles -->
        <div class="w-full space-y-2">
          <Label for="aiPersonaType" :class="errors.aiPersonaType ? 'text-red-500' : ''"> AI Personas / Roles : {{ errors.aiPersonaType }}</Label>
          <Select id="aiPersonaType" v-model="aiPersonaType" v-bind="aiPersonaTypeAttrs">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a AI persona or role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem v-for="option in AI_PERSONA_TYPES" :key="option.value" :value="option.value">
                  {{ option.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- Type -->
        <div class="w-full space-y-2">
          <Label for="visibility" :class="errors.visibility ? 'text-red-500' : ''"> Debate Type : {{ errors.visibility }}</Label>
          <Select id="visibility" v-model="visibility" v-bind="visibilityAttrs">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a debate type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem v-for="option in VISIBILITY_OPTIONS" :key="option.value" :value="option.value"> {{ option.label }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="w-full grid grid-cols-2 gap-4">
          <Button class="w-full" variant="outline" as-child>
            <NuxtLink to="/"> Cancel </NuxtLink>
          </Button>
          <Button class="w-full" type="submit" :disabled="loading">
            {{ loading ? "Creating..." : "Create Debate" }}
          </Button>
        </div>
      </form>
    </Card>

    <!-- Right Panel -->
    <Card class="w-full border col-span-2 sticky top-[89px]">
      <h1 class="text-2xl font-medium flex items-center gap-2">Recent Activity</h1>
      <Separator />
    </Card>
  </Wrapper>
</template>

<script setup>
import { toast } from "vue-sonner";
import { AI_PERSONA_TYPES, VISIBILITY_OPTIONS } from "#imports";
import { useForm } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const loading = ref(false);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("Title is required"),
    description: yup.string().required("Message is required"),
    tags: yup.array().of(yup.string()).required("At least one tag is required"),
    aiPersonaType: yup.string().required("Role selection is required"),
    visibility: yup.string().required("Debate type is required")
  })
});

const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");
const [aiPersonaType, aiPersonaTypeAttrs] = defineField("aiPersonaType");
const [visibility, visibilityAttrs] = defineField("visibility");
const [tags] = defineField("tags");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  try {
    const res = await $fetch("/api/debates/create", {
      method: "POST",
      body: {
        name: values.name,
        description: values.description,
        tags: values.tags,
        aiPersonaType: values.aiPersonaType,
        visibility: values.visibility
      },
      headers: {
        "Content-Type": "application/json"
      }
    });

    toast.success("Debate created successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate
    loading.value = false;
    router.push(`/debates/${res.data.id}`);
  } catch (err) {
    toast.error(err?.data?.message || "Something went wrong");
    loading.value = false;
  }
});
</script>
