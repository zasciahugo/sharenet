import { createRouter, createWebHistory } from 'vue-router';
import SpotPrices from '../components/SpotPrices.vue';
import ContactUs from '../components/ContactUs.vue';
import Workshops from '../components/Workshops.vue';

const routes = [
  { path: '/', component: SpotPrices },
  { path: '/contact-us', component: ContactUs },
  { path: '/workshops', component: Workshops },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;