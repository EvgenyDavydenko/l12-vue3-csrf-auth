<script setup>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = 'http://localhost:8080'

const login = () => {
  axios.get('/sanctum/csrf-cookie')
    .then(() => {
      return axios.post('/api/login', {
        email: 'admin@mail.com',
        password: 'password',
      });
    })
    .then(response => {
      console.log('Login successful', response);
    })
    .catch(error => {
      console.error('Login error:', error.response?.data?.message);
    });
}

const info = () => {
  axios.get('/api/user')
    .then(response => {
      console.log('User info:', response);
    })
    .catch(error => {
      console.error('Info error:', error);
    });
}

const logout = () => {
  axios.post('/api/logout')
    .then(response => {
      console.log('Logout successful', response);
    })
    .catch(error => {
      console.error('Logout error:', error);
    });
}
</script>

<template>
  <button @click="login">logIn</button>
  <button @click="info">Info</button>
  <button @click="logout">logOut</button>
</template>
