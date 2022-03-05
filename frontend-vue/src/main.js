import dotenv from 'dotenv';
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

dotenv.config();

createApp(App).use(store).mount('#app');
