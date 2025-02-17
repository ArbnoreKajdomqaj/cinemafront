<template>
    <div class="auth-container">
      <h2>Kyçu</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Kyçu</button>
      </form>
      <p>Nuk keni një llogari? <router-link to="/register">Regjistrohu</router-link></p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
        async login() {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: this.email,
      password: this.password
    });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // ✅ Ruaj të dhënat e përdoruesit
    this.$router.push('/'); // ✅ Ktheje përdoruesin në faqen kryesore
  } catch (error) {
    console.error('Gabim gjatë kyçjes:', error);
    alert('Gabim gjatë kyçjes! Kontrolloni kredencialet.');
  }
}

    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    width: 300px;
    margin: 50px auto;
    text-align: center;
  }
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .error {
    color: red;
  }
  </style>
  