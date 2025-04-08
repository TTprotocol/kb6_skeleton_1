import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import axios from "axios";

export const getAccountListStore = defineStore("list", () => {
	const BASEURI = "/api/periodicData";
	const state = reactive({
		allList: [],
		pageList: [],
		userEmail: "user1@example.com",
		currentPage: 1,
	});

	const fetchAllList = async () => {
		try {
			const response = await axios.get(BASEURI);
			if (response.status === 200) {
				state.allList = response.data;
			} else {
				console.log("데이터 조회 실패");
			}
		} catch (e) {
			console.log("데이터 조회 에러 발생");
		}
	};

	const fetchPageList = async (page = 1) => {
		try {
			const response = await axios.get(BASEURI, {
				params: {
					user: state.userEmail,
					_page: currentPage,
					_limit: 10,
				},
			});

			if (response.status === 200) {
				state.pageList = response.data;
			} else {
				console.log("페이지 조회 실패");
			}
		} catch (e) {
			console.log("페이지 조회 에러 : ", e);
		}
	};

	const setUser = (email) => {
		state.userEmail = email;
	};

	const nextPage = async () => {
		if (state.currentPage * 10 < state.allList.length) {
			state.currentPage += 1;
			await fetchPageList(state.currentPage + 1);
		}
	};

	const prevPage = async () => {
		if (state.currentPage > 1) {
			state.currentPage -= 1;
			await fetchPageList(state.currentPage - 1);
		}
	};

	const allList = computed(() => state.allList);
	const pageList = computed(() => state.pageList);
	const userEmail = computed(() => state.userEmail);
	const currentPage = computed(() => state.currentPage);

	return {
		allList,
		pageList,
		userEmail,
		currentPage,
		fetchAllList,
		fetchPageList,
		setUser,
		nextPage,
		prevPage,
	};
});
