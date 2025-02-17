import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import HomeView from '../views/HomeView.vue';
import MovieDetails from '../views/MovieDetails.vue';
import LogIn from '../views/LogIn.vue';
import RegisterUser from '../views/RegisterUser.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import ManageMovies from '../views/ManageMovies.vue';
import ManageCategories from '../views/ManageCategories.vue';
import MoviesView from '@/views/MoviesView.vue'; // ✅ Sigurohemi që ky import është i saktë

const routes = [
    { path: '/', component: LandingPage },
    { path: '/home', component: HomeView },
    { path: '/movies', component: MoviesView }, // ✅ Rregulluar rruga për shfaqjen e filmave
    { path: '/movies/:id', component: MovieDetails, props: true },
    { path: '/login', component: LogIn },
    { path: '/register', component: RegisterUser },
    { 
        path: '/admin', 
        component: AdminDashboard, 
        meta: { requiresAdmin: true } 
    },
    { 
        path: '/admin/movies', 
        component: ManageMovies, 
        meta: { requiresAdmin: true } 
    },
    { 
        path: '/admin/categories', 
        component: ManageCategories, 
        meta: { requiresAdmin: true } 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// ✅ Kontrolli i aksesit për ruterat e adminit
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (to.meta.requiresAdmin) {
        if (!user || user.role !== 'admin') {
            alert('Nuk keni akses në këtë faqe!');
            return next('/');
        }
    }

    next();
});

export default router;
