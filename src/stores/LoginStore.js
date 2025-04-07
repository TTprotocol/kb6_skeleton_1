import { defineStore } from "pinia";
import axios from "axios";

export const loginStore = defineStore("login", {
	state: () => ({
		currentUser: null,
		userInfo: [],
	}),

	actions: {
		async login(email, password) {
			try {
				const res = await axios.get("/api/users", {
					params: { email, password },
				});

				if (res.data.length > 0) {
					const user = res.data[0];

					await axios.patch(`/api/users/${user.id}`, { login: true });

					this.currentUser = { ...user, login: true };
				}
			} catch (e) {
				console.error("로그인 오류:", err.message);
				return null;
			}
		},
	},
	async getUserData() {
		try {
			const res = await axios.get("/api/users");

			this.userInfo = res.data.map((user) => ({
				email: user.email,
				name: user.name,
				budget: user.budget,
			}));
		} catch (e) {
			console.error("사용자 정보 조회 실패:", err.message);
		}
	},
});
