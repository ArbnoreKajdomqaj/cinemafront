<template>
    <div class="movie-details">
      <div class="movie-container">
        <img :src="getPosterUrl(movie.poster)" alt="Movie Poster" class="movie-poster" />
  
        <div class="movie-info">
          <h1>{{ movie.title }}</h1>
          <p class="description">{{ movie.description }}</p>
          <p><strong>Regjisori:</strong> {{ movie.director }}</p>
          <p><strong>Data e publikimit:</strong> {{ movie.release_date }}</p>
  
          <p>
            <strong>Kategoritë:</strong>
            <span v-for="category in movie.categories" :key="category.id" class="category-tag">
              {{ category.name }}
            </span>
          </p>
  
          <!-- ⭐ Rating System -->
          <div class="rating">
            <p><strong>Vlerësimi mesatar:</strong> {{ averageRating }} ⭐</p>
            <p><strong>Vlerëso filmin:</strong></p>
            <div class="stars">
              <span 
                v-for="star in 5" 
                :key="star" 
                @click="rateMovie(star)"
                :class="{ 'star-selected': star <= userRating }"
                class="star"
              >★</span>
            </div>
          </div>
  
          <button @click="watchMovie" class="watch-btn">▶️ Shiko Filmin</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        movie: {},
        userRating: 0,
        averageRating: 0,
        userRole: null, // ✅ Ruajmë rolin e përdoruesit
      };
    },
    methods: {
      async fetchMovieDetails() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/movies/${this.$route.params.id}`);
          this.movie = response.data;
          this.getAverageRating();
        } catch (error) {
          console.error("Gabim gjatë marrjes së detajeve të filmit:", error);
        }
      },
      async getAverageRating() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/movies/${this.$route.params.id}/average-rating`);
          this.averageRating = response.data.average_rating;
        } catch (error) {
          console.error("Gabim gjatë marrjes së vlerësimit:", error);
        }
      },
      async rateMovie(star) {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user")); // ✅ Marrim të dhënat e user-it
  
        if (!token) {
          alert("Duhet të kyçeni për të vlerësuar një film!");
          this.$router.push("/login");
          return;
        }
  
        if (user.role === "admin") {
          alert("Adminët nuk mund të vlerësojnë filmat!");
          return;
        }
  
        try {
          await axios.post('http://127.0.0.1:8000/api/rate-movie', { 
            movie_id: this.movie.id, 
            rating: star 
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          this.userRating = star;
          alert(`Vlerësuat filmin me ${star} yje!`);
          this.getAverageRating();
        } catch (error) {
          console.error("Gabim gjatë vlerësimit të filmit:", error);
        }
      },
      getPosterUrl(posterPath) {
        return posterPath ? `http://127.0.0.1:8000/storage/${posterPath}` : "/default-poster.jpg";
      },
      watchMovie() {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Duhet të kyçeni për të parë filmin!");
          this.$router.push("/login");
        } else {
          alert("Shikimi i filmit nuk është aktiv për momentin!");
        }
      },
      checkUserRole() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          this.userRole = user.role;
        }
      }
    },
    mounted() {
      this.fetchMovieDetails();
      this.checkUserRole();
    }
  };
  </script>
  
  
  <style scoped>
  .movie-details {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .movie-container {
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }
  
  .movie-poster {
    width: 280px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .movie-info {
    flex: 1;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .description {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
  }
  
  .category-tag {
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 14px;
  }
  
  .rating {
    margin-top: 20px;
  }
  
  .stars {
    display: flex;
    gap: 5px;
    margin-top: 5px;
  }
  
  .star {
    font-size: 28px;
    color: #ddd;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .star-selected {
    color: gold;
  }
  
  .watch-btn {
    display: block;
    background-color: #e50914;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 15px;
    font-weight: bold;
    transition: background 0.3s;
  }
  
  .watch-btn:hover {
    background-color: #b2070f;
  }
  </style>
  