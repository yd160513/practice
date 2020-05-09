import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/login'

const user = {

  state: {
    user: '',
    token: '',
    roles: []
  },

  mutations: {

    SET_TOKEN: (state, token) => {

      state.token = token;

    }

  },

  actions: {

    // 登录
    LoginByUsername({ commit }, userInfo) {
      
      const username = userInfo.name.trim();

      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data;
            setToken(data.token);
            commit('SET_TOKEN', data.token);
            resolve();
          })
          .catch(error => {
            reject(error)
          });
      });

    },

    // 登录
    // loginByUserName({ commit }, userInfo) {
    //   let username = userInfo.name.trim();
    //   return new Promise((resolve, reject) => {
    //     loginByUsername(username, userInfo.password)
    //       .then(response => {
    //         const data = response.data;
    //         setToken(response.data.token);
    //         commit('SET_TOKEN', data.token)
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       })
    //   });
    //   commit('SET_TOKEN', '1');
    // },

    // 获取用户信息
    GetInfo({ commit, state }) {

      return new Promise((resolve, reject) => {

        getInfo(state.token)
          .then(response => {

            if (!response.data) {

              reject('error');

            }

            const data = response.data;

            commit('SET_ROLES', data.roles);
            commit('SET_NAME', data.name);
            commit('SET_AVATAR', data.avatar);
            commit('SET_INTRODUCTION', data.introduction);
            resolve();

          })
          .catch(error => {

            reject(error);

          });

      })

    },

    // 登出
    logOut({ commit, state }) {

      return new Promise((resolve, reject) => {

        logout(state.token)
          .then(() => {

            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();

          })
          .catch((error) => {

            reject(error);

          })

      });

    },

    // 前端登出
    FedLogOut({ commit }) {

      return new Promise(resolve => {

        commit('SET_TOKEN', '');
        removeToken();
        resolve();

      })

    }

  }
}

export default user