import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const loginStore = defineStore('login', () => {
  const BASEURI = '/api/users';
  const CATEGORYURI = '/api/categories';
  const state = reactive({
    email: '',
    name: '',
    birth: '',
    gender: '',
    budget: 0,
    login: false,
  });

  const getData = async ({ id, password }) => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        const userList = response.data;
        const matchUser = userList.find(
          (user) => user.email === id && user.password === password
        );
        if (matchUser) {
          state.email = matchUser.email;
          state.name = matchUser.name;
          state.birth = matchUser.birth;
          state.gender = matchUser.gender;
          state.budget = matchUser.budget;
          state.login = true;
          console.log('로그인 성공');
          matchUser.login = true;
          return true;
        } else {
          state.login = false;
          console.log('아이디 또는 비밀번호가 일치하지 않습니다.');
          return false;
        }
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (e) {
      console.log('데이터 조회 에러 발생');
    }
  };

  const settingUser = async (password, newpassword, birth, gender) => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        const userList = response.data;
        const matchUser = userList.find(
          (user) => user.email === state.email && user.password === password
        );
        if (!matchUser) {
          console.log('현재 비밀번호가 다릅니다.');
          return false;
        }
        const updatedUser = {
          password: newpassword || matchUser.password,
          birth: birth || matchUser.birth,
          gender: gender || matchUser.birth,
        };
        await axios.put(`${BASEURI}/${matchUser.id}`, updatedUser);
        state.birth = updatedUser.birth;
        state.gender = updatedUser.gender;
        if (newpassword) console.log('비밀번호 변경 완료');
        console.log('유저 정보 업데이트 완료');
        return true;
      }
    } catch (e) {
      console.log('데이터 조회 오류 발생');
      return false;
    }
  };

  const getMine = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        const userList = response.data;
        const matchUser = userList.find((user) => user.login === true);
        console.log(matchUser);
        if (matchUser) {
          console.log('사용자 찾기 성공');
          state.email = matchUser.email;
          state.name = matchUser.name;
          state.birth = matchUser.birth;
          state.gender = matchUser.gender;
          state.budget = matchUser.budget;
          return true;
        } else {
          console.log('사용자를 찾을 수 없습니다.');
          return false;
        }
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (e) {
      console.log('데이터 조회 에러 발생');
    }
  };
  const myEmail = computed(() => state.email);
  const myName = computed(() => state.name);
  const myBirth = computed(() => state.birth);
  const myGender = computed(() => state.gender);
  //   const userEmail = computed(() => state.userEmail);
  //   const currentPage = computed(() => state.currentPage);

  return {
    getData,
    settingUser,
    getMine,
    myEmail,
    myName,
    myBirth,
    myGender,
  };
});

