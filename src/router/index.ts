import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommandView from '../views/client/CommandesView.vue'
import CartView from '../views/client/CartView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/cart',
        name: 'cart',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: CartView
    },
    {
        path: '/orders',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: CommandView
    },
    {
        path: '/loginUser',
        name: 'LoginUser',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/loginUser.vue')
    },
    {
        path: '/suivi',
        name: 'suivi',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/client/TrackingView.vue')
    },
    {
        path: '/RestaurateurPage',
        name: 'RestaurateurPage',
        component: () => import(/* webpackChunkName: "about" */ '../views/RestaurateurPage.vue')
    },
    {
        path: '/account',
        name: 'monCompte',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/client/AccountView.vue')
    },
    {
        path: '/commercial',
        name: 'commercial',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/commercial/CommercialView.vue')
    },
    {
        path: '/livraisonPage',
        name: 'livraisonPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Livreur/ListLivraisonPage.vue')
    },
    {
        path: '/livraison',
        name: 'livraison',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Livreur/LivraisonPage.vue')
    },
    {
        path: '/politique',
        name: 'politique',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/rgpdFriendly/PolitiqueView.vue')
    },
    {
        path: '/condition',
        name: 'condition',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/rgpdFriendly/ConditionView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
