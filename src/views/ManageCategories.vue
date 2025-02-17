<template>
    <div class="manage-categories">
      <h1>📂 Menaxho Kategoritë</h1>
  
      <button @click="showAddCategoryModal = true" class="add-btn">➕ Shto Kategori</button>
  
      <!-- Modal për shtimin e kategorive -->
      <div v-if="showAddCategoryModal" class="modal">
        <div class="modal-content">
          <h2>Shto Kategori të Re</h2>
          <input v-model="newCategory.name" placeholder="Emri i kategorisë">
          <div class="modal-actions">
            <button @click="addCategory" class="save-btn">💾 Ruaj</button>
            <button @click="showAddCategoryModal = false" class="cancel-btn">❌ Mbyll</button>
          </div>
        </div>
      </div>
  
      <!-- Lista e kategorive -->
      <ul class="category-list">
        <li v-for="category in categories" :key="category.id" class="category-item">
          <span>{{ category.name }}</span>
          <div>
            <button @click="editCategory(category)" class="edit-btn">✏️ Edito</button>
            <button @click="deleteCategory(category.id)" class="delete-btn">🗑️ Fshi</button>
          </div>
        </li>
      </ul>
  
      <!-- Modal për editimin e kategorisë -->
      <div v-if="showEditCategoryModal" class="modal">
        <div class="modal-content">
          <h2>Redakto Kategorinë</h2>
          <input v-model="selectedCategory.name" placeholder="Ndrysho emrin">
          <div class="modal-actions">
            <button @click="updateCategory" class="save-btn">💾 Ruaj</button>
            <button @click="showEditCategoryModal = false" class="cancel-btn">❌ Mbyll</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categories: [],
        newCategory: { name: "" },
        selectedCategory: { id: null, name: "" },
        showAddCategoryModal: false,
        showEditCategoryModal: false
      };
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/categories');
          this.categories = response.data;
        } catch (error) {
          console.error("Gabim gjatë marrjes së kategorive:", error);
        }
      },
      async addCategory() {
        if (!this.newCategory.name.trim()) return;
        try {
          await axios.post('http://127.0.0.1:8000/api/categories', this.newCategory, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          this.fetchCategories();
          this.newCategory.name = "";
          this.showAddCategoryModal = false;
        } catch (error) {
          console.error("Gabim gjatë shtimit të kategorisë:", error);
        }
      },
      editCategory(category) {
        this.selectedCategory = { ...category };
        this.showEditCategoryModal = true;
      },
      async updateCategory() {
        if (!this.selectedCategory.name.trim()) return;
        try {
          await axios.put(`http://127.0.0.1:8000/api/categories/${this.selectedCategory.id}`, this.selectedCategory, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          this.fetchCategories();
          this.showEditCategoryModal = false;
        } catch (error) {
          console.error("Gabim gjatë përditësimit të kategorisë:", error);
        }
      },
      async deleteCategory(categoryId) {
        if (!confirm("A je i sigurt që dëshiron ta fshish këtë kategori?")) return;
        try {
          await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          this.fetchCategories();
        } catch (error) {
          console.error("Gabim gjatë fshirjes së kategorisë:", error);
        }
      }
    },
    mounted() {
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .manage-categories {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    text-align: center;
  }
  
  .add-btn {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .category-list {
    list-style: none;
    padding: 0;
  }
  
  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f4f4f4;
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
  }
  
  .edit-btn {
    background-color: #ffc107;
    color: black;
    padding: 5px;
    margin-right: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .delete-btn {
    background-color: red;
    color: white;
    padding: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  .modal-actions {
    margin-top: 10px;
  }
  
  .save-btn {
    background-color: #28a745;
    color: white;
    padding: 8px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .cancel-btn {
    background-color: gray;
    color: white;
    padding: 8px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  