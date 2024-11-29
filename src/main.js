import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importando o Vue Router

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


const app = createApp(App);

app.use(router); // Registrando o Vue Router
app.mount('#app');

