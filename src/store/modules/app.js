import Cookies from 'js-cookie'

const app = {

  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop'
  },

  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.withoutAnimation = false;
    }
  },

  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    }
  }

};

export default app;