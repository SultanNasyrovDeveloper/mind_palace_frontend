import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'


Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        component: () => import('@/views/BaseView'),
        children: [
            {
                path: '/',
                redirect: toUrl => {
                    if (store.getters.getUserIsLoggedIn) {
                        return {name: 'dashboard'}
                    }
                    return {name: 'index'}
                }
            },
            {
                path: '/',
                component: () => import('@/views/IndexView'),
                name: 'index'
            },
            {
                path: '/login',
                component: () => import('@/views/LoginView'),
                name: 'login'
            },
            {
                path: '/signup',
                component: () => import('@/views/SignupView'),
                name: 'signup'
            },
            {
                path: '/dashboard',
                component: () => import('@/views/DashboardView'),
                name: 'dashboard',
                meta: { requiresAuth: true },
            },
            {
                path: '/mypalace/:rootId/node/:nodeId',
                component: () => import('@/views/MindPalaceView'),
                name: 'mypalace.node',
                props: true,
                meta: { requiresAuth: true }
            },
            {
                path: '/mypalace/:rootId',
                component: () => import('@/views/MindPalaceView'),
                props: true,
                name: 'mypalace',
                meta: { requiresAuth: true }
            },
            {
                path: '/profile',
                component: () => import('@/views/UserProfileView'),
                name: 'profile',
                meta: { requiresAuth: true }
            },
            {
                path: '/*',
                component: () => import('@/views/NotFoundView')
            }
        ]
    }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
    if (!store.getters.getUserIsLoggedIn && to.meta.requiresAuth) next({ 'name': 'login' });
    else next();
});

export default router;