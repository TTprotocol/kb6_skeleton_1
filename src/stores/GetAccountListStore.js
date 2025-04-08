import { defineStore } from "pinia";
import axios from "axios";

export const getAccountListStore = defineStore("list", {
	state: () => ({
		dataList: [],
		totalCount: 0,
		currentPage: 1,
		pageSize: 10,
		userEmail: "",
	}),

	actions: {
		async fetchData(page = 1) {
			try {
				const { pageSize, userEmail } = this;
				const res = await axios.get(`/api/periodicData`, {
					params: {
						user: userEmail,
						_page: page,
						_limit: pageSize,
					},
				});
				this.dataList = res.data;
				this.totalCount = parseInt(res.headers["x-total-count"], 10);
				this.currentPage = page;
			} catch (e) {
				console.error("데이터 가져오기 실패:", err);
			}
		},
		getData() {
			return this.dataList;
		},
		setUser(email) {
			this.userEmail = email;
		},
		async nextPage() {
			if (this.currentPage * this.pageSize < this.totalCount) {
				await this.fetchPeriodicData(this.currentPage + 1);
			}
		},
		async prevPage() {
			if (this.currentPage > 1) {
				await this.fetchPeriodicData(this.currentPage - 1);
			}
		},
	},
});
