import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import AccountList from "@/pages/AccountList.vue";
import AddList from "@/pages/AddList.vue";

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
			component: AddList,
		},
	],
});

export default router;
