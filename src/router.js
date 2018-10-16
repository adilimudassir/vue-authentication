import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/login",
      name: "login",
      component: () =>
        import( /* webpackChunkName: "Home" */ "./views/Login.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () =>
        import( /* webpackChunkName: "Home" */ "./views/Home.vue")
    },
    {
      path: "*",
      redirect: '/login'
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if (to.fullPath === '/home') {
    if (!store.state.accessToken) {
      next('/login');
    } 
  }

  if (to.fullPath === '/login') {
    if (store.state.accessToken) {
      next('/home');
    }
  }
  next();
})

export default router;