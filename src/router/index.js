
/**
 * 编写路由步骤：
 *  1. 在 main.js 中引入 router.js 挂载到 Vue 实例中
 *  2. 配置路由实例：在 route.js 中引入 Vue、vue-router、配置路由实例
 *  3. 组件内配置：就是配置 router-link 、router-view
 */

import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import CountDown from '@/view/countDown'
import ChangeColor from '@/view/computedChangeColor'
import DepthSelector from '@/view/depthSelector'
// import roleTestPage from '@/view/roleTestPage'
import Layout from '@/view/Layout'
import Wel from '@/view/wel'
import Tree from '@/view/tree'
import DynamicRender from '@/view/dynamicRender'
import KeepAliveA from '@/view/keepAlive/a'
import KeepAliveB from '@/view/keepAlive/b'
import KeepAliveC from '@/view/keepAlive/c'
import RadioCheckbox from '@/view/radioCheckbox'
import Validate from '@/view/validate'
import SortTable from '@/view/sortTable'
import LoopForm from '@/view/loopForm'
import TablePageMemory from '@/view/tablePageMemory'
import DialogtablePageMemory from '@/view/dialogtablePageMemory'
import ShoppingCart from '@/view/shoppingCart'
import FlowEditor from '@/view/flowEditor'
import StringRenderStyle from '@/view/stringRenderStyle'
import Dialog from '@/view/dialog'
import PdfToImage from '@/view/pdfToImage'

/**
 * $router 和 $route 的区别：
 * $router: 指的是整个路由实例，可以操控整个路由，通过 '$router.push' 往其中添加任意路由对象
 * $route: 指当前路由实例（'router'）跳转到的路由对象
 * 路由实例可以包含多个路由对象，它们是父子关系
 * reoutes: 指 router 路由实例的 routes API. 用来配置多个 route 路由对象
 */

Vue.use(Router) // 加载全局组件 Router

export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  component: Login // 可以使通过 Vue.extend() 创建的组件构造器或只是一个组件配置对象
},
{
  path: '',
  component: Layout, // 重定向  // 首页
  redirect: 'Wel',
  children: [{
    path: 'Wel',
    component: Wel,
    name: 'Wel',
    meta: {
      title: 'Wel',
      noCache: true
    } // noCache: 页面不会被缓存，默认false
  },
  {
    path: '/countDown',
    name: 'countDown',
    component: CountDown
  },
  {
    path: '/changeColor',
    name: 'changeColor',
    component: ChangeColor
  },
  {
    path: '/depthSelector',
    name: 'depthSelector',
    component: DepthSelector
  },
  {
    path: '/tree',
    name: 'tree',
    component: Tree
  },
  {
    path: '/dynamicRender',
    name: 'dynamicRender',
    component: DynamicRender
  },
  {
    path: '/keepAliveA',
    name: 'keepAliveA',
    component: KeepAliveA,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/keepAliveB',
    name: 'KeepAliveB',
    component: KeepAliveB,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/keepAliveC',
    name: 'KeepAliveC',
    component: KeepAliveC
  },
  {
    path: '/radioCheckbox',
    name: 'RadioCheckbox',
    component: RadioCheckbox
  },
  {
    path: '/validate',
    name: 'Validate',
    component: Validate
  },
  {
    path: '/sortTable',
    name: 'SortTable',
    component: SortTable
  },
  {
    path: '/loopForm',
    name: 'LoopForm',
    component: LoopForm
  },
  {
    path: '/tablePageMemory',
    name: 'TablePageMemory',
    component: TablePageMemory
  },
  {
    path: '/dialogtablePageMemory',
    name: 'DialogtablePageMemory',
    component: DialogtablePageMemory
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/flowEditor',
    name: 'FlowEditor',
    component: FlowEditor
  },
  {
    path: '/stringRenderStyle',
    name: 'StringRenderStyle',
    component: StringRenderStyle
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: Dialog
  },
  {
    path: '/pdfToImage',
    name: 'PdfToImage',
    component: PdfToImage
  }
  ]
}
]

// export const asyncRouterMap = [{
//   path: '/super_editor',
//   component: Layout,
//   children: [{
//     path: 'index',
//     // component: roleTestPage, // import 的组件，这是正常加载
//     component: resolve => require(['@/components/super_editor'], resolve), // 使用懒加载可以减少首页加载时间，此时不需要 import
//     name: '权限测试页', // 路由命名，name 要唯一
//     meta: {
//       role: ['admin', 'super_editor']
//     } // noCache: 页面不会被缓存，默认false
//   }]
// }];

export default new Router({
  // mode: 'history', // 路由模式： 默认为 hash，如果改为 history，需要后端配合
  // base: '/', // 基路径：默认值为 '/'， 如果整个单页应用在 /app/ 下，base 就应该设为 '/app', 一般可以写成 __dirname, 在 webpack 中配置
  routes: constantRouterMap // 可以传入其他参数
})

/**
 *
 * hash 模式：url 变化时，不会重新加载浏览器，通过改变 # 后边的值，实现浏览器渲染指定的组件
 * history 模式：通过 pushState() 方法对浏览器的浏览记录进行修改，来达到不用请求后端来渲染的效果，
 *    但是需要后端配合，需要在服务端增加一个覆盖所有情况的候选资源，如果 url 匹配不到任何静态资源，则应该返回同一个 index.html。否则会得到404
 *
 * ****************************************************
 *
 * 同一个路径可以匹配多个路由，谁先定义谁的优先级就高，
 * 路由参数对组件实例是复用的，例如：user/foo 和 user/bar 在使用路由参数时，复用的都是 user 组件，此时组件的生命周期不会再被调用。
 * 如果想路径切换时，进行一些初始化操作，可以用以下两种解决办法：
 * 1. 在组件内 watch $route 对象：
 *  watch: {
 *    '$route'() {
 *      // 对路由做出响应
 *    }
 *  }
 * 2. 使用2.2版本中的 beforeRouteUpdate 路由守卫：
 *  beforeRouteUpdate() {
 *    // 对路由做出改变
 *    next()
 *  }
 *
 * ******************************************************
 *
 * 编程式导航：
 *  通过 this.$router 访问路由实例，并通过this.router.push() 导航到不同的 url，进行路由映射
 *
 *  一般用到 router.push() 方法，该方法的参数可以使一个字符串路径，或者一个描述地址的对象：
 *    1. 字符串：
 *    this.$router.push('home');
 *    2. 对象：
 *    this.$router.push({name: 'home'});
 *    3. 命名路由：
 *    this.$router.push(name: 'user', params: {userId: 2333});
 *    4. 带查询参数 get 方式：
 *    this.$router.push({path: 'register', query: {plan: 'private'}})
 *  path 和 params 是不能同时生效的，否则 params 会被忽略掉，所以使用对象写法进行 params 传参时，要么就是加 path 加冒号 : ,要么使用 '命名路由'
 *  query 有没有 path 都可以进行传参
 *
 *  router.replace() 方法：
 *    将当前浏览器 history 记录替换掉，常见于权限验证，验证后就不让用户回退到登录页重复验证
 *
 *  router.go(n) 方法：
 *    参数是一个整数，前进多少或者后退多少
 *  编程时导航总结：
 *    params 参数不会显示在 url 地址栏中，除了在路由中通过 routes 进行配置，所以用户刷新页面后， params 参数就会丢失
 *    query 参数可以正常显示在 url 地址栏中，刷新页面后也不会丢失
 *
 * ******************************************************
 *
 * 嵌套路由：
 *  在 children 中配置，子路由中 path 中的值不能写成 '/foo' ，需要些成 'foo', 因为加上 '/' 会被认为是根路径
 *  component 写成一个对象，里边可以写对应的多一个组件，同时 component 需要改成 components
 *  一个组件有多个 router-view 时就需要用 命名视图(在 router-view 上加上 name="名称")，
 *  components 中的 key 就是 name 的值，value 就是组件
 *
 * *********************************************
 *
 * 重定向和别名：
 *  重定向：通过路由拦截 path, 然后替换 url 跳转到 redirect 所指定的路由上
 *  // a 重定向到 b
 *  {path: '/a', redirect: '/b'}
 *  // a 重定向到命名为 foo 的路由
 *  {path: '/a', redirect: {name: 'foo'}}
 *  // 一个方法，动态返回重定向目标
 *  {path: '/a', redirect: to => { // to 目标路由
 *      // reutrn 重定向的字符串路径 / 路径对象
 *      const {hash, params, query} = to
 *      if (query.to === 'foo') {
 *        return {path: '/foo', query: null}
 *      }
 *      if (hash === '#baz') {
 *        return { name: 'baz', hash: '' }
 *      }
 *      if (params.id) {
 *        return '/with-params/:id'
 *      } else {
 *        return '/bar'
 *      }
 *    }
 *  }
 *  别名：一个路由有两个路径
 *  {path: '/123', component: A, alias: '/456'} // 123, 456 都可以指向 A 这个组件
 *  如果别名多的话，可以 alias: ['/a1', '/a2',...]
 *
 * *********************************************************
 *
 * 路由组件传参：
 *  路由传参可以通过 params 和 query 进行传参，但这两种都是把参数放在 url 上，增加了参数和组件的高度耦合，
 *  可以用 route 的 props 进行解耦，提高组件的复用，同时不改变 url
 *    组件中：
 *      props: ['name'], // 使用 route 的 props 传参的时候，对应的组件一定要添加 props 进行接收，否则拿不到参数
 *      template: `{{this.name}}`
 *    路由配置：
 *      {path: '/hello/:name', component: Hello, props: true} // 布尔模式： props 被设置为 true, 此时 route.params (此处的 name)会被设置为组件属性
 *      {path: '/hello', component: Hello, props: {name: 'world'}} // 对象模式: 此时和 params 没有关系，直接将 name 传给 Hello 组件，此时的 props 需要是静态
 *      {path: '/hello/:years', component: Hello, props: dynamicPropsFn} // 函数模式：1. 这个函数默认接收一个参数即当前路由对象，2. 这个函数返回的是一个对象 3. 这个函数里你可以将静态值与路由相关值进行处理
 *      function dynamicPropsFn (route) {
 *        return {
 *          name: (new Date().getFullYear() + parseInt(route.params.years)) + '!'
 *        }
 *      }
 *
 * ******************************************************
 *
 * 路由懒加载：
 *  主要是通过 Vue 的异步组件和 Webpack 的代码分割功能来减少首屏加载时间
 *  component:resolve=>require(['@/component/HelloWorld'],resolve)
 *
 * ******************************************************
 *
 * 把组件按组分块
 *  webpack 版本 > 2.4
 *  需要在 webpack.base.conf.js 里面的 output 里的 filename 下面加上 chunkFileName
 *  引入组件时需要使用命名 chunk， 一个特殊的注释语法来提供 chunk name
 *  const Foo = () => import(斜杠* webpackChunkName: "group-foo" *斜杠 './Foo.vue')
 *
 * ********************************************
 *
 * 导航守卫：
 *  next() 进行管道中的下一个钩子
 *  next(false) 中断当前的导航，如果 url 改变了，那么 url 地址会重置到 from 路由对应的地址
 *  next('/') 或者 next({ path: '/' }) 跳转到一个不同的位置，当前导航被中断，然后进行新的导航
 *    可以向 next 传递任意位置对象 replace: true/ name: 'home' 之类的选项
 *  next(error) (2.4.0+) 如果传入的是 Error 实例，则导航会被终止并将错误传递给 router.onError() 注册过的回调
 *
 *  路由独享的守卫：
 *    beforeEnter: 路由只独享这一个钩子，在 routes 里配置：
 *    {
 *      path: '/foo',
 *      component: Foo,
 *      beforeEnter: (to, from, next) => {用法就是 beforeEnach 的用法}
 *    }
 *  组件内的守卫：
 *    beforeRouteEnter 进入路由前，此时实例还没有被创建，无法获取 this
 *    beforeRouteUpdate (2.2) 路由复用同一个组件时
 *    beforeRouteLeave 离开当前路由，此时可以用来保存数据、数据初始化、关闭定时器等
 *
 */
