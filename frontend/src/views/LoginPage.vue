<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

const router = useRouter()
const { login, errorMessage, isLoading, validationErrors } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const ok = await login(email.value, password.value)

  if (ok) {
    router.push('/profile')
  }
}
</script>

<template>
  <div>
    <h2>Вход в систему</h2>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <form @submit.prevent="handleLogin">
      <div>
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          :disabled="isLoading"
          :class="{ 'error-border': validationErrors?.email }"
        >
        <div v-if="validationErrors?.email" class="field-error">
          {{ validationErrors.email[0] }}
        </div>
      </div>
      
      <br>
      
      <div>
        <input 
          v-model="password" 
          type="password" 
          placeholder="Пароль" 
          :disabled="isLoading"
          :class="{ 'error-border': validationErrors?.password }"
        >
        <div v-if="validationErrors?.password" class="field-error">
          {{ validationErrors.password[0] }}
        </div>
      </div>
      
      <br>
      
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Загрузка...' : 'Войти' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #ffe6e6;
  border: 1px solid red;
  border-radius: 4px;
}

.field-error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.error-border {
  border-color: red;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input.error-border {
  border-color: red;
}
</style>