/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'

// Layouts
// import AfterLoginLayout from "@/layouts/AfterLoginLayout.vue";
import BeforeLoginLayout from "@/layouts/BeforeLoginLayout.vue";

// Pages
import IndexPage from "@/pages/index.vue";
import LoginPage from "@/pages/login.vue";

// Funkcja sprawdzająca, czy użytkownik jest zalogowany
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const routes = [
  {
    path: '/',
    component: BeforeLoginLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: '', component: IndexPage },
    ],
  },
  // {
  //   path: '/',
  //   component: AfterLoginLayout,
  //   children: [
  //     { path: 'dashboard', component: DashboardView },
  //     { path: 'profile', component: ProfileView },
  //   ],
  //   meta: { requiresAuth: true }, // Wymaga zalogowania
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ochrona tras
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: setupLayouts(routes),
// })
//
// // Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
//     if (!localStorage.getItem('vuetify:dynamic-reload')) {
//       console.log('Reloading page to fix dynamic import error')
//       localStorage.setItem('vuetify:dynamic-reload', 'true')
//       location.assign(to.fullPath)
//     } else {
//       console.error('Dynamic import error, reloading page did not fix it', err)
//     }
//   } else {
//     console.error(err)
//   }
// })
//
router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
