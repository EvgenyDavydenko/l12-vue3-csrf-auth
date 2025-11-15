<script setup>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const login = async () => {
  await axios.get('http://localhost:8080/sanctum/csrf-cookie').then(response => {
  })

  await axios.post('http://localhost:8080/api/login', {
    email: 'admin@mail.com',
    password: 'password',
  })
}

const info = async () => {
  await axios.get('http://localhost:8080/api/user').then((res =>{
    console.log(res);
  }))
}

const logout = async () => {
  await axios.post('http://localhost:8080/api/logout').then((res =>{
    console.log(res);
  }))
}
</script>

<template>
  <button @click="login">logIn</button>
  <button @click="info">info</button>
  <button @click="logout">logOut</button>
</template>
