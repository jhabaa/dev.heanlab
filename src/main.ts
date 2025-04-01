import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueSplide from '@splidejs/vue-splide';
import { useProjectsStore } from './stores/useProjects'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueSplide);

app.mount('#app')

const projectsStore = useProjectsStore()
