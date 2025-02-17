<template>
    <div class="admin-dashboard">
      <h1>📊 Statistikat e Adminit</h1>
  
      <div class="stats-grid">
        <div class="stat-card">
          <h2>{{ totalMovies }}</h2>
          <p>Filma total</p>
        </div>
        <div class="stat-card">
          <h2>{{ totalRatings }}</h2>
          <p>Vlerësime total</p>
        </div>
        <div class="stat-card">
          <h2>{{ totalUsers }}</h2>
          <p>Përdorues normalë</p>
        </div>
        <div class="stat-card">
          <h2>{{ highestRatedMovie.title || 'N/A' }}</h2>
          <p>Filmi më i vlerësuar</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        totalMovies: 0,
        totalRatings: 0,
        totalUsers: 0, // ✅ Numri i përdoruesve
        highestRatedMovie: {}
      };
    },
    methods: {
      async fetchStats() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/admin/stats', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
  
          this.totalMovies = response.data.total_movies;
          this.totalRatings = response.data.total_ratings;
          this.totalUsers = response.data.total_users; // ✅ Ruajmë numrin e përdoruesve
          this.highestRatedMovie = response.data.highest_rated_movie || {};
        } catch (error) {
          console.error("Gabim gjatë marrjes së statistikave:", error);
        }
      }
    },
    mounted() {
      this.fetchStats();
    }
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
  }
  
  .stats-grid {
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }
  
  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  