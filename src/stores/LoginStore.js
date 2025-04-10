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
          console.log(matchUser);
          await axios.put(`${BASEURI}/${matchUser.id}`, {
            ...matchUser,
            login: true,
          });

          console.log('로그인 성공');
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

  const logoutData = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        const userList = response.data;
        const matchUser = userList.find((user) => user.login === true);
        if (matchUser) {
          state.email = matchUser.email;
          state.name = matchUser.name;
          state.birth = matchUser.birth;
          state.gender = matchUser.gender;
          state.budget = matchUser.budget;
          state.login = true;
          console.log(matchUser);
          await axios.put(`${BASEURI}/${matchUser.id}`, {
            ...matchUser,
            login: false,
          });

          console.log('로그아웃 성공');
          return true;
        }
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (e) {
      console.log('데이터 조회 에러 발생');
    }
  };

  const settingBudget = async (newbudget) => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        const userList = response.data;
        const matchUser = userList.find((user) => user.login === true);
        if (matchUser) {
          state.email = matchUser.email;
          state.name = matchUser.name;
          state.birth = matchUser.birth;
          state.gender = matchUser.gender;
          state.budget = matchUser.budget;
          state.login = true;
          console.log(matchUser);
          await axios.put(`${BASEURI}/${matchUser.id}`, {
            ...matchUser,
            budget: newbudget,
          });
          console.log('예산 업데이트 성공');
          return true;
        }
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (e) {
      console.log('데이터 조회 에러 발생');
    }
  };

  const settingUser = async (
    password,
    newpassword,
    year,
    month,
    day,
    gender
  ) => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200 || response.status === 201) {
        const userList = response.data;
        const matchUser = userList.find(
          (user) => user.email === state.email && user.password === password
        );
        console.log('check + ', matchUser);

        if (!matchUser) {
          console.log('현재 비밀번호가 다릅니다.');
          return false;
        }
        const updatedUser = {
          email: matchUser.email,
          name: matchUser.name,
          budget: matchUser.budget,
          password: newpassword || matchUser.password,
          birth: `${year}-${month}-${day}` || matchUser.birth,
          gender: gender || matchUser.gender,
          login: true,
        };
        await axios.put(`${BASEURI}/${matchUser.id}`, updatedUser);
        state.year = updatedUser.year;
        state.month = updatedUser.month;
        state.day = updatedUser.day;
        state.gender = updatedUser.gender;
        state.birth = updatedUser.birth;
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

  const checkId = async (id) => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        const userList = response.data;
        const matchUser = userList.find((user) => user.email === id);
        console.log(matchUser);
        if (matchUser) {
          console.log('이미 존재하는 아이디입니다.');
          return false;
        } else {
          console.log('가입 가능한 아이디입니다.');
          return true;
        }
      } else {
        console.log('데이터 조회 실패');
      }
    } catch (e) {
      console.log('데이터 조회 에러 발생');
    }
  };

  const createData = async (
    { email, password, birth, name, gender, budget, login },
    successCallback
  ) => {
    try {
      const payload = { email, password, birth, name, gender, budget, login };
      console.log(payload);
      const response = await axios.post(BASEURI, payload);
      if (response.status === 200 || response.status === 201) {
        successCallback();
      } else {
        alert('회원가입 실패!');
      }
    } catch (e) {
      console.log(e);
      alert('에러 발생: ', e);
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
    checkId,
    createData,
    logoutData,
    settingBudget,
    myEmail,
    myName,
    myBirth,
    myGender,
  };
});
