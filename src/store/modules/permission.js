import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户匹配
 * @param route 
 * @param roles 
 */
function hasPermission(roles, route) {

  if (route.meta && route.meta.role) {

    // 返回和当前权限相符的用户权限
    return roles.some(role => route.meta.role.indexOf(role >= 0));

  } else {
    
    return true;

  }

}

/**
 * 递归过滤异步路由列表，返回符合角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {

  const accessedRouters = asyncRouterMap.filter(route => {

    if (hasPermission(roles, route)) {

      if (route.children && route.children.length) {

        route.children = filterAsyncRouter(route.children, roles)

      }

      return true;

    }

    return false;

  });

  return accessedRouters;

}

const PERMISSION = {

  state: {

    addRouters: [],
    routers: constantRouterMap

  },
  mutations: {

    SET_ROUTERS(state, routers) {

      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);

    }

  },
  actions: {

    // 获取路由权限
    GenerateRoutes({ commit }, data) {

      return new Promise(resolve => {

        const { roles } = data;

        const accessedRouters = asyncRouterMap.filter(v => {

          if (roles.indexOf('admin') > 0) return true;
          if (hasPermission(roles, v)) {

            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child;
                }
                return false;
              });
              return v;
            } else {
              return v;
            }

          }
          
          return false;
        });
      //   let accessedRouters = [];

      //   if (roles.indexOf('admin') >= 0) {

      //     accessedRouters = asyncRouterMap

      //   } else {

      //     accessedRouters = filterAsyncRouter(asyncRouterMap, roles);

      //   }

        commit('SET_ROUTERS', accessedRouters);
        resolve();

      });

    }

  }

};

export default PERMISSION;