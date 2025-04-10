import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import axios from "axios";

export const getAccountListStore = defineStore("list", () => {
	const BASEURI = "/api/periodicData";
	const CATEGORYURI = "/api/categories";
	const state = reactive({
		allList: [],
		allPageList: [],
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

	// 페이지 리스트 조회
	const fetchPageList = async ({
		page = 1,
		type = "지출",
		key = "date",
		order = "desc",
	} = {}) => {
		console.log(page, type, key, order);
		const nowType = type === "전체" ? 0 : type === "지출" ? -1 : 1;
		try {
			await fetchAllList();
			const startIndex = (page - 1) * 10;
			const endIndex = startIndex + 10;
			const list = [...state.allList]
				.filter((item) => item.user === state.userEmail)
				.filter((item) => {
					if (nowType === 0) {
						return true;
					} else if (nowType === 1) {
						return item.type === 1;
					} else {
						return item.type === -1;
					}
				})
				.sort((a, b) => {
					const valA = a[key];
					const valB = b[key];

					if (typeof valA === "number" && typeof valB === "number") {
						return order === "asc" ? valA - valB : valB - valA;
					} else {
						return order === "asc"
							? String(valA).localeCompare(String(valB))
							: String(valB).localeCompare(String(valA));
					}
				});
			console.log("list : ", list);
			state.allPageList = list;
			state.pageList = list.slice(startIndex, endIndex);
		} catch (e) {
			console.log("페이지 조회 에러 : ", e);
		}
	};

	const setUser = (email) => {
		state.userEmail = email;
	};

	const createData = async (
		{ amount, type, category, description, memo, date },
		successCallback
	) => {
		try {
			const payload = {
				amount,
				type,
				category,
				description,
				memo,
				user: state.userEmail,
				date,
			};
			console.log("payload : ", payload);
			const response = await axios.post(BASEURI, payload);

			if (response.status === 201) {
				await fetchAllList();
				await fetchPageList();
				successCallback();
			} else {
				alert("추가 실패!");
			}
		} catch (e) {
			alert("에러 발생 : ", e);
		}
	};

	const updateData = async (
		{ amount, type, category, description, memo, date, id },
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
				user: state.userEmail,
				date,
			};
			const response = await axios.put(BASEURI + `/${id}`, payload);

			if (response.status === 200) {
				let index = state.allList.findIndex((item) => item.id === id);
				state.allList[index] = payload;
				await fetchPageList();
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
				let allListIndex = state.allList.findIndex((item) => item.id === id);
				state.allList.splice(allListIndex, 1);
				let pageListIndex = state.pageList.findIndex((item) => item.id === id);
				state.pageList.splice(pageListIndex, 1);
				// await fetchPageList();
			} else {
				alert("삭제 실패!");
			}
		} catch (e) {
			alert("에러 발생 : ", e);
		}
	};

	const nextPage = async (type) => {
		if ((state.currentPage + 1) * 10 < state.allPageList.length) {
			state.currentPage += 1;
			await fetchPageList({ page: state.currentPage, type });
		} else {
			return state.pageList;
		}
	};

	const prevPage = async (type) => {
		if (state.currentPage > 1) {
			state.currentPage -= 1;
			await fetchPageList({ page: state.currentPage, type });
		} else {
			return state.pageList;
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
