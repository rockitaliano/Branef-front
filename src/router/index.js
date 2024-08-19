import { createRouter, createWebHistory } from 'vue-router';
import ClienteList from '@/components/ClienteList.vue';
import ClienteForm from '@/components/ClienteForm.vue';


const routes = [
  { path: '/', component: ClienteList },
  { path: '/Customer/novo', component: ClienteForm },
  { path: '/Customer/:id', component: ClienteForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
