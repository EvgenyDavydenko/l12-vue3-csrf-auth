<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const posts = ref([])
const pagination = ref({})

const fetchPosts = async (url = '/api/posts') => {
  try {
    const response = await axios.get(url)
    posts.value = response.data.posts.data
    pagination.value = {
      next_page_url: response.data.posts.next_page_url,
      prev_page_url: response.data.posts.prev_page_url,
      last_page: response.data.posts.last_page,
      current_page: response.data.posts.current_page
    }
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error)
  }
}
onMounted(() => {
  fetchPosts()
})
</script>
<template>
  <div class="simple-blog">
    <h1 class="blog-main-title">Мой Блог</h1>
    <div class="posts-grid">
      <article 
        v-for="post in posts" 
        :key="post.id"
        class="post-card"
      >
        <RouterLink 
          :to="`/posts/${post.slug}`"
          class="post-title-link"
        >
          <h2 class="post-title">{{ post.title }}</h2>
        </RouterLink>
        <p class="post-preview">{{ post.preview }}</p>
      </article>
    </div>

    <!-- Пагинация -->
    <div class="pagination" v-if="pagination.last_page > 1">
      <button 
        class="pagination-btn pagination-prev"
        @click="fetchPosts(pagination.prev_page_url)"
        :disabled="pagination.prev_page_url == null"
      >
        ← Назад
      </button>
      
      <span class="pagination-info">
        Страница {{ pagination.current_page }} из {{ pagination.last_page }}
      </span>
      
      <button 
        class="pagination-btn pagination-next"
        @click="fetchPosts(pagination.next_page_url)"
        :disabled="pagination.next_page_url == null"
      >
        Вперед →
      </button>
    </div>
  </div>
</template>

<style scoped>
.simple-blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.blog-main-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 300;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
}

.post-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  transition: box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.post-title-link {
  text-decoration: none;
  color: inherit;
}

.post-title-link:hover .post-title {
  color: #007bff; /* или любой другой цвет по вашему выбору */
  text-decoration: underline;
}
.post-title {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
}

.post-preview {
  color: #5a6c7d;
  line-height: 1.5;
  margin: 0;
  font-size: 1rem;
  flex-grow: 1;
}
/* Стили пагинации */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid #e1e5e9;
  background: white;
  color: #2c3e50;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #5a6c7d;
  font-size: 0.95rem;
  font-weight: 500;
}

</style>