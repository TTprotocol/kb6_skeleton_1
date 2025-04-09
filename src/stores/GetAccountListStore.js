import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import axios from "axios";

export const getAccountListStore = defineStore("list", () => {
	const BASEURI = "/api/periodicData";
	const CATEGORYURI = "/api/categories";
	const state = reactive({
		allList: [],
		pageList: [],
		pageCount: [],
		categoryList: {},
		userEmail: "user1@example.com",
		currentPage: 1,
	});
	const listState = reactive({});

	const fetchAllList = async () => {
		try {
			const response = await axios.get(BASEURI);
			if (response.status === 200) {
				state.allList = response.data.sort((a, b) =>
					a.date > b.date ? -1 : 1
				);
				let temp = [];
				let count = Math.floor(response.data.length / 10);
				for (let i = 0; i < count; i++) {
					temp[i] = i;
				}
				state.pageCount = temp;

				await fetchCategory();
			} else {
				console.log("데이터 조회 실패");
			}
		} catch (e) {
			console.log("데이터 조회 에러 발생");
		}
	};

	const fetchCategory = async () => {
		try {
			const response = await axios.get(CATEGORYURI);
			if (response.status === 200) {
				state.categoryList = response.data;
			} else {
				console.log("카테고리 데이터 조회 실패");
			}
		} catch (e) {
			console.log("카테고리 데이터 조회 에러 발생");
		}
	};

	const fetchPageList = async (page = 1) => {
		try {
			const response = await axios.get(BASEURI, {
				params: {
					user: state.userEmail,
					_page: state.currentPage,
					_limit: 10,
				},
			});

			if (response.status === 200) {
				state.pageList = response.data.sort((a, b) =>
					a.date > b.date ? -1 : 1
				);
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

	const createData = async (
		{ amount, type, category, description, memo, user, date },
		successCallback
	) => {
		try {
			const payload = {
				amount,
				type,
				category,
				description,
				memo,
				user,
				date,
			};
			const response = await axios.post(BASEURI, payload);

			if (response.status === 201) {
				await fetchAllList();
				successCallback();
			} else {
				alert("추가 실패!");
			}
		} catch (e) {
			alert("에러 발생 : ", e);
		}
	};

	const updateData = async (
		{ amount, type, category, description, memo, user, date, id },
		successCallback
	) => {
		try {
			const payload = {
				id,
				amount,
				type,
				category,
				description,
				memo,
				user,
				date,
			};
			const response = await axios.put(BASEURI + `/${id}`, payload);

			if (response.status === 200) {
				let index = state.allList.findIndex((item) => item.id === id);
				state.allList[index] = payload;
				successCallback();
			} else {
				alert("수정 실패!");
			}
		} catch (e) {
			alert("에러 발생 : ", e);
		}
	};

	const deleteData = async (id) => {
		try {
			const response = await axios.delete(BASEURI + `/${id}`);

			if (response.status === 200) {
				let index = state.allList.findIndex((item) => item.id === id);
				state.allList.splice(index, 1);
			} else {
				alert("삭제 실패!");
			}
		} catch (e) {
			alert("에러 발생 : ", e);
		}
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
	const pageCount = computed(() => state.pageCount);
	const categoryList = computed(() => state.categoryList);
	const userEmail = computed(() => state.userEmail);
	const currentPage = computed(() => state.currentPage);

	return {
		allList,
		pageList,
		pageCount,
		categoryList,
		userEmail,
		currentPage,
		fetchAllList,
		fetchCategory,
		fetchPageList,
		setUser,
		createData,
		updateData,
		deleteData,
		nextPage,
		prevPage,
	};
});
