const getters = {

  token: state => state.user.token,
  roles: state => state.user.roles,
  sidebar: state => state.app.sidebar
  // addRouters: state => state.permission.addRouters

};

export default getters;