<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const post = ref(null)
const route = useRoute()

const fetchPost = async () => {
  try {
    const response = await axios.get(`/api/posts/${route.params.slug}`)
    post.value = response.data.post
  } catch (error) {
    console.error('Ошибка при загрузке поста:', error)
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<template>
  <div class="post-detail" v-if="post">
    <article class="post-full">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-meta">
        Опубликовано: {{ new Date(post.created_at).toLocaleDateString() }}
      </div>
      <div class="post-content">
        {{ post.body }}
      </div>
    </article>
  </div>
  <div v-else class="loading">
    Загрузка...
  </div>
</template>

<style scoped>
.post-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-link-hint {
  opacity: 0;
  transition: opacity 0.2s ease;
  text-decoration: none;
  font-size: 0.9em;
}

.post-card:hover .post-link-hint {
  opacity: 1;
}
</style>