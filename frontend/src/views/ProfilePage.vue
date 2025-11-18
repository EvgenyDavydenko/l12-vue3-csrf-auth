<script setup>
import useAuth from '../composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div>
    <h2>Профиль пользователя</h2>

    <div v-if="!user">Загрузка...</div>

    <div v-else>
      <p><b>Имя:</b> {{ user.name }}</p>
      <p><b>Email:</b> {{ user.email }}</p>
    </div>
  </div>
</template>