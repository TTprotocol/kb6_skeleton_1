import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import MainPage from '@/pages/MainPage.vue';
import AccountList from '@/pages/AccountList.vue';
import AddList from '@/pages/AddList.vue';
import SignupPage from '@/pages/SignupPage.vue';
import Setting from '@/pages/SettingPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountList,
    },
    {
      path: '/account/:id',
      name: 'account/id',
      component: AddList,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
  ],
});

export default router;
