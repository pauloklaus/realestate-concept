import Vue from "vue"
import VueRouter from "vue-router"
import Search from "@/views/Search.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "search",
        component: Search,
        meta: {
            title: "Procurar"
        }
    },
    {
        path: "/favoritos",
        name: "favorites",
        component: () => import(/* webpackChunkName: "about" */ "../views/Favorites.vue"),
        meta: {
            title: "Favoritos"
        }
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.afterEach((to) => {
    to.meta.path = to.path.endsWith("/") ? to.path.substr(0, to.path.length - 1) : to.path;

    Vue.nextTick(() => {
        document.title = process.env.VUE_APP_NAME;

        if (to.meta.title)
            document.title += " / " + to.meta.title;
    });
});

export default router
