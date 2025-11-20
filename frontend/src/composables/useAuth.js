import { ref } from 'vue'
import axios from 'axios'

const user = ref(null)
const errorMessage = ref('')
const isLoading = ref(false)
const validationErrors = ref({})

export default function useAuth() {

  const getUser = async () => {
    try {
      const response = await axios.get('/api/user')
      user.value = response.data
      errorMessage.value = ''
    } catch (e) {
      user.value = null
      errorMessage.value = 'Не удалось получить данные пользователя'
    }
  }

  const login = async (email, password) => {
    isLoading.value = true
    errorMessage.value = ''
    validationErrors.value = {}

    try {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/login', { email, password })
      await getUser()
      return true
    } catch (e) {
      // Универсальная обработка ошибок
      if (e.response?.status === 422) {
        // Ошибки валидации
        validationErrors.value = e.response.data.errors || {}
        errorMessage.value = 'Пожалуйста, исправьте ошибки в форме'
      } else {
        // Сетевая ошибка или другие проблемы
        errorMessage.value = e.message || 'Ошибка входа'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/logout')
      user.value = null
      errorMessage.value = ''
      validationErrors.value = {}
    } catch (e) {
      errorMessage.value = 'Ошибка выхода'
    }
  }

  return {
    user,
    errorMessage,
    validationErrors,
    isLoading,
    login,
    logout,
    getUser
  }
}