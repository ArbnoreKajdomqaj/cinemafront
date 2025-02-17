<template>
  <div class="landing-page">
    
    <!-- ✅ Shiriti me mesazhin e mirëseardhjes -->
    <div class="welcome-banner">
      <h2>🎬 Filmat më të fundit i gjeni tek <span class="highlight">FilmCorner</span>!</h2>
    </div>

    <h1>Filmat më të fundit</h1>

    <div v-if="movies.length > 0" class="movies-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <router-link :to="'/movies/' + movie.id">
          <img 
            v-if="movie.poster_path" 
            :src="getPosterUrl(movie.poster_path)" 
            alt="Movie Poster" 
            class="movie-poster" 
          />
          <img v-else src="/default-poster.jpg" alt="No Poster" class="movie-poster" />
        </router-link>
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
      </div>
    </div>

    <p v-else>Loading movies...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: []
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies');
        console.log("Filmat nga backend:", response.data);

        this.movies = response.data.map(movie => ({
          ...movie,
          poster_path: movie.poster_path ? movie.poster_path : '/default-poster.jpg'
        }));

      } catch (error) {
        console.error('Gabim gjatë marrjes së filmave:', error);
      }
    },
    getPosterUrl(posterPath) {
      if (!posterPath.startsWith("http")) {
        return `http://127.0.0.1:8000/storage/${posterPath}`;
      }
      return posterPath;
    }
  },
  mounted() {
    this.fetchMovies();
  }
};
</script>

<style scoped>
.landing-page {
  text-align: center;
  padding: 20px;
}

/* ✅ Shiriti i mirëseardhjes */
.welcome-banner {
  background: #444;
  color: white;
  padding: 15px;
  font-size: 20px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

.highlight {
  color: #FFD700; /* Ngjyrë ari për të theksuar "FilmCorner" */
}

.movies-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-card {
  border: 1px solid #ddd;
  padding: 15px;
  width: 200px;
  text-align: center;
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
  transition: transform 0.2s;
}

.movie-poster:hover {
  transform: scale(1.05);
}
</style>
