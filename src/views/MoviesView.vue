<template>
    <div class="movies-page">
      <h1>🎬 Filmat</h1>
  
      <!-- ✅ Kontrollo nëse kemi kërkim ose filtrime aktive -->
      <div v-if="$route.query.search || $route.query.category" class="filter-info">
        <p v-if="$route.query.search">🔍 Kërkimi për: <strong>{{ $route.query.search }}</strong></p>
        <p v-if="$route.query.category">🎭 Kategoria: <strong>{{ getCategoryName($route.query.category) }}</strong></p>
        <button @click="clearFilter">❌ Hiq filtrin</button>
      </div>
  
      <!-- ✅ Tabela e filmave -->
      <div v-if="movies.length > 0" class="movies-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <router-link :to="'/movies/' + movie.id">
            <img v-if="movie.poster_path" :src="getPosterUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster" />
            <img v-else src="/default-poster.jpg" alt="No Poster" class="movie-poster" />
          </router-link>
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.description }}</p>
        </div>
      </div>
  
      <p v-else class="no-movies">⛔ Nuk u gjetën filma.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        movies: [],
        categories: []
      };
    },
    watch: {
      '$route.query': {
        immediate: true,
        handler() {
          this.fetchMovies();
        }
      }
    },
    methods: {
      async fetchMovies() {
        try {
          let url = 'http://127.0.0.1:8000/api/movies';
  
          if (this.$route.query.search) {
            url += `?search=${this.$route.query.search}`;
          } else if (this.$route.query.category) {
            url += `?category=${this.$route.query.category}`;
          }
  
          console.log("📌 URL e kërkesës për filma:", url);
          const response = await axios.get(url);
          this.movies = response.data;
        } catch (error) {
          console.error('❌ Gabim gjatë marrjes së filmave:', error);
        }
      },
  
      async fetchCategories() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/categories');
          this.categories = response.data;
        } catch (error) {
          console.error("❌ Gabim gjatë marrjes së kategorive:", error);
        }
      },
  
      getPosterUrl(posterPath) {
        if (!posterPath.startsWith("http")) {
          return `http://127.0.0.1:8000/storage/${posterPath}`;
        }
        return posterPath;
      },
  
      getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.id == categoryId);
        return category ? category.name : "E panjohur";
      },
  
      clearFilter() {
        this.$router.push({ path: '/movies' });
      }
    },
    mounted() {
      this.fetchMovies();
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .movies-page {
    text-align: center;
    padding: 20px;
  }
  
  /* ✅ Stili për filtrat aktivë */
  .filter-info {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .filter-info p {
    margin: 0;
  }
  
  .filter-info button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }
  
  /* ✅ Stili për gridin e filmave */
  .movies-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .movie-card {
    border: 1px solid #ddd;
    padding: 15px;
    width: 220px;
    text-align: center;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }
  
  .movie-card a {
    text-decoration: none;
    color: inherit;
  }
  
  .movie-poster {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    border-radius: 5px;
    transition: transform 0.2s;
  }
  
  .movie-poster:hover {
    transform: scale(1.05);
  }
  
  .no-movies {
    font-size: 18px;
    color: #888;
    margin-top: 20px;
  }
  </style>
  