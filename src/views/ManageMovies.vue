<template>
  <div class="manage-movies">
    <h1>🎬 Menaxho Filmat</h1>

    <!-- ✅ Notifikimi i suksesit -->
    <transition name="fade">
      <div v-if="showSuccessMessage" class="success-popup">
        ✅ Filmi u shtua me sukses!
      </div>
    </transition>

    <!-- ✅ Tabela e filmave ekzistues -->
    <table class="movie-table">
      <thead>
        <tr>
          <th>Poster</th>
          <th>Titulli</th>
          <th>Regjisori</th>
          <th>Data e Publikimit</th>
          <th>Veprime</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>
            <img :src="'/images/default-poster.jpg'" alt="Poster" class="movie-poster">
          </td>
          <td>{{ movie.title }}</td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.release_date }}</td>
          <td>
            <button @click="editMovie(movie)" class="edit-btn">✏️ Edito</button>
            <button @click="confirmDeleteMovie(movie.id)" class="delete-btn">🗑️ Fshij</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ✅ Butoni për të hapur formën për shtim të filmit -->
    <button @click="toggleAddMovieForm" class="add-movie-btn">
      ➕ Shto Film
    </button>

    <!-- ✅ Forma e shtimit/editimit të filmit -->
    <transition name="slide">
      <div v-if="showAddMovieForm || isEditing" class="movie-form-container">
        <h2 class="form-title">
          {{ isEditing ? "✏️ Edito Filmin" : "📽️ Shto një film të ri" }}
        </h2>
        <form @submit.prevent="isEditing ? updateMovie() : addMovie()" class="movie-form">
          
          <div class="form-group">
            <label for="title">Titulli i Filmit</label>
            <input id="title" v-model="newMovie.title" placeholder="Shkruaj titullin..." required>
          </div>

          <div class="form-group">
            <label for="description">Përshkrimi</label>
            <textarea id="description" v-model="newMovie.description" placeholder="Shkruaj përshkrimin..." required></textarea>
          </div>

          <div class="form-group">
            <label for="director">Regjisori</label>
            <input id="director" v-model="newMovie.director" placeholder="Shkruaj emrin e regjisorit..." required>
          </div>

          <div class="form-group">
            <label for="release_date">Data e Publikimit</label>
            <input id="release_date" type="date" v-model="newMovie.release_date" required>
          </div>

          <!-- ✅ Zgjedhja e kategorive me CHECKBOX -->
          <div class="form-group">
            <label>Kategoritë</label>
            <div class="checkbox-group">
              <label v-for="category in categories" :key="category.id">
                <input 
                  type="checkbox" 
                  :value="category.id" 
                  v-model="newMovie.categories"
                />
                {{ category.name }}
              </label>
            </div>
          </div>

          <button type="submit" class="add-btn">
            {{ isEditing ? "💾 Ruaj Ndryshimet" : "🎬 Shto Filmin" }}
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      categories: [],
      showAddMovieForm: false,
      showSuccessMessage: false,
      isEditing: false,
      editingMovieId: null,
      newMovie: {
        title: "",
        description: "",
        release_date: "",
        director: "",
        categories: [] // ✅ Mbajmë ID-të e kategorive të zgjedhura
      }
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies');
        this.movies = response.data;
      } catch (error) {
        console.error("❌ Gabim gjatë marrjes së filmave:", error);
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
    async addMovie() {
      try {
        const movieData = {
          title: this.newMovie.title,
          description: this.newMovie.description,
          release_date: this.newMovie.release_date,
          director: this.newMovie.director,
          categories: [...this.newMovie.categories]
        };

        const response = await axios.post('http://127.0.0.1:8000/api/movies', movieData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 201) {
          this.fetchMovies();
          this.showSuccessPopup();
          this.resetForm();
        }
      } catch (error) {
        console.error("❌ Gabim gjatë shtimit të filmit:", error.response?.data || error);
      }
    },

    editMovie(movie) {
      this.isEditing = true;
      this.showAddMovieForm = true;
      this.editingMovieId = movie.id;
      this.newMovie = {
        title: movie.title,
        description: movie.description,
        release_date: movie.release_date,
        director: movie.director,
        categories: movie.categories.map(c => c.id)
      };
    },

    async updateMovie() {
      try {
        const movieData = {
          title: this.newMovie.title,
          description: this.newMovie.description,
          release_date: this.newMovie.release_date,
          director: this.newMovie.director,
          categories: [...this.newMovie.categories]
        };

        const response = await axios.put(`http://127.0.0.1:8000/api/movies/${this.editingMovieId}`, movieData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 200) {
          this.fetchMovies();
          this.showSuccessPopup();
          this.resetForm();
        }
      } catch (error) {
        console.error("❌ Gabim gjatë përditësimit të filmit:", error);
      }
    },

    // ✅ Konfirmimi dhe fshirja e filmit
    async confirmDeleteMovie(movieId) {
      if (confirm("A je i sigurt që dëshiron ta fshish këtë film?")) {
        await this.deleteMovie(movieId);
      }
    },

    async deleteMovie(movieId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/movies/${movieId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 200) {
          this.movies = this.movies.filter(movie => movie.id !== movieId);
          console.log("✅ Filmi u fshi me sukses:", response.data);
        }
      } catch (error) {
        console.error("❌ Gabim gjatë fshirjes së filmit:", error.response?.data || error);
      }
    },
    
    toggleAddMovieForm() {
      this.showAddMovieForm = !this.showAddMovieForm;
      this.isEditing = false;
      this.resetForm();
    },

    resetForm() {
      this.newMovie = {
        title: "",
        description: "",
        release_date: "",
        director: "",
        categories: []
      };
      this.isEditing = false;
      this.editingMovieId = null;
    },

    showSuccessPopup() {
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  },
  mounted() {
    this.fetchMovies();
    this.fetchCategories();
  }
};
</script>




<style scoped>
/* ✅ Animacion për suksesin e shtimit */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* ✅ Notifikimi i suksesit */
.success-popup {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  position: fixed;
  top: 20px;
  right: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* ✅ Stili për tabelën e filmave */
.movie-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.movie-table th, .movie-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}
.movie-poster {
  width: 50px;
  height: auto;
}

/* ✅ Butonat për veprimet */
.edit-btn, .delete-btn {
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  align-items: center;
  margin-left: 30px;
}
.edit-btn {
  background: #007bff;
  color: white;
  margin-right: 15px;
}
.delete-btn {
  background: #dc3545;
  color: white;
}
.edit-btn:hover {
  background: #0056b3;
}
.delete-btn:hover {
  background: #c82333;
}

/* ✅ Butoni "Shto Film" */
.add-movie-btn {
  display: block;
  margin: 20px auto;
  background: #28a745;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.add-movie-btn:hover {
  background: #218838;
}

/* ✅ Stili i formës */
.movie-form-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
}

/* ✅ Input-et */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  text-align: left;
}
.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}
.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
.form-group textarea {
  height: 80px;
}

/* ✅ Animacion për hapjen e formës */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
