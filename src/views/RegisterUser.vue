<template>
    <div class="auth-container">
      <h2>Regjistrohu</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Emri" required>
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <input v-model="password_confirmation" type="password" placeholder="Konfirmo Password" required>
        <button type="submit">Regjistrohu</button>
      </form>
      <p>Keni një llogari? <router-link to="/login">Kyçu</router-link></p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errorMessage: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          });
  
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
  
          this.$router.push('/');
        } catch (error) {
          this.errorMessage = "Gabim gjatë regjistrimit.";
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
  