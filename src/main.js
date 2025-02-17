import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // ✅ Sigurohu që router është importuar vetëm një herë

const app = createApp(App);
app.use(router); // ✅ Përdorim Vue Router
app.mount('#app');
