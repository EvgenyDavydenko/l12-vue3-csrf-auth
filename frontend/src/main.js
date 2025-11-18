import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import useAuth from './composables/useAuth'

const { getUser } = useAuth()

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = 'http://localhost:8080'

await getUser()

const app = createApp(App)

app.use(router)

app.mount('#app')
