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
                // base application vie
                path: '/',
                component: () => import('@/views/BaseApplicationView'),
                children: [
                    {
                        path: 'dashboard/',
                        component: () => import('@/views/DashboardView'),
                        name: 'dashboard'
                    }
                ]
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

export default router;
