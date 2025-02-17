<template>
  <nav class="navbar">
    <router-link to="/" class="logo" style="color: white;">🎬 FilmCorner</router-link>

    <div class="nav-links">
      <router-link to="/movies">Filmat</router-link>

      <!-- ✅ Dropdown i kategorive -->
      <div class="dropdown">
        <button class="dropbtn">Kategoritë</button>
        <div class="dropdown-content">
          <router-link v-for="category in categories" :key="category.id"
            :to="{ path: '/movies', query: { category: category.id } }">
            {{ category.name }}
          </router-link>
        </div>
      </div>

      <!-- ✅ Kërkimi i filmave -->
      <input v-model="searchQuery" @keyup.enter="searchMovies" type="text" placeholder="Kërko filmat...">
      <button @click="searchMovies">🔍</button>

      <!-- 🚀 Opsionet për adminin shfaqen vetëm nëse user-i është admin -->
      <div v-if="user && user.role === 'admin'" class="admin-links">
        <router-link to="/admin">Dashboard</router-link>
        <router-link to="/admin/movies">Menaxho Filmat</router-link>
        <router-link to="/admin/categories">Menaxho Kategoritë</router-link>
      </div>

      <!-- ✅ Regjistrohu dhe Kyçu (vetëm për përdoruesit që s’janë kyçur) -->
      <div class="auth-links">
        <router-link v-if="!isLoggedIn" to="/register">Regjistrohu</router-link>
        
        <button v-if="isLoggedIn" @click="logout" class="logout-btn">Dil</button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      searchQuery: "",
      isLoggedIn: !!localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')) || null
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error("❌ Gabim gjatë marrjes së kategorive:", error);
      }
    },

    searchMovies() {
      if (this.searchQuery.trim() !== "") {
        console.log("🔍 Kërkimi për:", this.searchQuery);
        this.$router.push({ path: '/movies', query: { search: this.searchQuery } });
      }
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.user = null;
      this.$router.push('/login');
    }
  },
  mounted() {
    this.fetchCategories();
  },
  watch: {
    '$route'() {
      this.isLoggedIn = !!localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user')) || null;
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 10px 20px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links a, .auth-links a {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
}

.auth-links {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 15px;
}

.admin-links {
  display: flex;
  gap: 10px;
}

.dropdown {
  position: relative;
}

.dropbtn {
  background: none;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  display: block;
  padding: 10px;
  text-decoration: none;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

/* ✅ Stil për "Keni një llogari? Kyçu" */
.small-text {
  font-size: 14px;
  padding-left: 10px;
  opacity: 0.8;
}
.small-text:hover {
  opacity: 1;
}
</style>
