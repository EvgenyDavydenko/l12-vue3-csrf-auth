<script setup>
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<template>
  <nav class="nav">
    <div class="left">
      <router-link to="/profile">Профиль</router-link>
      <router-link to="/login">Вход</router-link>
    </div>

    <div class="right">
      <span v-if="user">Добро пожаловать, {{ user.name }}</span>
      <button v-if="user" @click="handleLogout">Выйти</button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
}
nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
}
.left {
  display: flex;
  gap: 1rem;
}
.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
button {
  padding: 0.4rem 0.8rem;
}
</style>