import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'


Vue.use(VueRouter);


const routes = [
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
        path: '/',
        component: () => import('@/views/BaseApplicationView'),
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/DashboardView'),
                name: 'dashboard',
                meta: { requiresAuth: true },
            },
            {
                path: '/mypalace/:rootId',
                component: () => import('@/views/MindPalaceView'),
                props: true,
                name: 'mypalace',
                meta: { requiresAuth: true }
            },
            {
                path: 'mypalace/node/:nodeId',
                component: () => import('@/views/NodeDetailView'),
                props: true,
                name: 'node.detail',
                meta: { requiresAuth: true }
            },
            {
                path: 'learning',
                component: () => import('@/views/UserLearningView'),
                name: 'learning',
                meta: {requiresAuth: true}
            },
            {
                path: 'learning/node/:nodeId',
                component: () => import('@/views/NodeLearningCardView'),
                props: true,
                name: 'learning.node',
                meta: {requiresAuth: true}
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
    if (to.meta.requiresAuth && !store.getters.getUserIsLoggedIn) next({ 'name': 'login' });
    else next();
});

export default router;
