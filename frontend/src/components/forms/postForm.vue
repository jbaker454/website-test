<!-- src/components/postForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Description:</label>
      <input v-model="form.description" type="text" />
      <p v-if="errors.description">{{ errors.description }}</p>
    </div>
    <div>
      <label>Text:</label>
      <input v-model="form.text" type="text" />
      <p v-if="errors.text">{{ errors.text }}</p>
    </div>
    <div>
      <label>User UUID:</label>
      <input v-model="form.publisher" type="text" />
      <p v-if="errors.publisher">{{ errors.publisher }}</p>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { postFormSchema, PostFormData } from "@/schemas/postFormScema";
import { z } from "zod";

const form = reactive<PostFormData>({
  description: "",
  text: "",
  publisher: "",
});

const errors = ref<Partial<Record<keyof PostFormData, string>>>({});

function handleSubmit() {
  const result = postFormSchema.safeParse(form);

  if (!result.success) {
    // Map Zod errors to a plain object
    errors.value = result.error.flatten().fieldErrors as any;
    return;
  }

  errors.value = {};

  submitPost(result.data);
  console.log("Form submitted:", result.data);
}

async function submitPost(data: PostFormData) {
  const res = await fetch("http://localhost:8000/api/post/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit post");
}

</script>