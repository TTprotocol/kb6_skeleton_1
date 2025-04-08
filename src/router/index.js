import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import AccountList from "@/pages/AccountList.vue";
import AddEditItem from "@/pages/AddEditItem.vue";
import SignupPage from '@/pages/SignupPage.vue';
import Setting from '@/pages/SettingPage.vue';
import LoginId from '@/pages/LoginId.vue';


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "login",
			component: LoginPage,
		},
		{
			path: "/main",
			name: "main",
			component: MainPage,
		},
		{
			path: "/account",
			name: "account",
			component: AccountList,
		},
		{
			path: "/account/:id",
			name: "account/id",
			component: AddEditItem,
		},
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
    {
      path: '/loginid',
      name: 'loginid',
      component: LoginId,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
	],
});

export default router;
