<!-- src/pages/Home.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import post_form from '@/components/forms/postForm.vue'

interface TimeStampedModel {
  created_at: string
  updated_at: string
}

interface User {
  id: number | string
  name: string
}

interface Post {
  id: number | string
  publisher: string | User
  description: string
  text: string
  received_date: string
  time_stamp: string | TimeStampedModel
}


const posts = ref<Post[]>([])
const error = ref<string | null>(null)

async function fetchResources(): Promise<void> {
  try {
    const response = await fetch('http://localhost:8000/api/post/')
    if (!response.ok) throw new Error('Network response was not ok')
    const data: Post[] = await response.json()
    posts.value = data
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
  }
}



onMounted(() => {
  fetchResources()
})
</script>

<template>
  <div>
    <h1>Blog Page</h1>
    <a href="http://localhost:8000/api/post/"> this is the link to post </a>
    <post_form/>
    <ul>
      <li v-for="post in posts" :key="post.id"> 
        {{ typeof post.publisher === 'string' ? post.publisher : post.publisher.name }} 
        <br/>
        <strong>Text:</strong> {{ post.text }}
        <br/>
        <strong>Published:</strong> {{ post.received_date }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BlogPage',
  data() {
    return {
      posts: [
        {
          id: 1,
          publisher: { id: 101, name: 'Alice Johnson' },
          description: 'A sample post',
          text: 'This is the content of the first post.',
          received_date: '2025-07-19',
          time_stamp: {
            created_at: '2025-07-18T12:00:00Z',
            updated_at: '2025-07-19T08:30:00Z'
          }
        },
        {
          id: 2,
          publisher: 'Guest Author',
          description: 'Another sample post',
          text: 'Second post from an anonymous guest.',
          received_date: '2025-07-20',
          time_stamp: '2025-07-20T10:00:00Z'
        }
      ] as Post[]
    }
  },
  computed: {
    sortedPosts(): Post[] {
      return [...this.posts].sort(
        (a, b) => new Date(b.received_date).getTime() - new Date(a.received_date).getTime()
      )
    }
  }
})
</script>

<style src="@/components/Blog.css"></style>
