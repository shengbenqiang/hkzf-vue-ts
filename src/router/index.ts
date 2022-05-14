import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isAuth } from "@/untils/solve";
import MapView from "@/views/MapView.vue";
import NewsView from "@/views/NewsView.vue";
import CityList from "@/views/CityList.vue";
import RentView from "@/views/RentView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginVIew from "@/views/LoginVIew.vue";
import Collection from "@/views/Collection.vue";
import SearchView from "@/views/SearchView.vue";
import ParentView from "@/views/ParentView.vue";
import ProfileView from "@/views/ProfileView.vue";
import HouseListView from "@/views/HouseListView.vue";
import ReleaseHouseView from "@/views/ReleaseHouseView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: ParentView,
    children: [
      {
        path: "/",
        redirect: "/home",
        component: HomeView,
      },
      {
        path: "/home",
        name: "Home",
        component: HomeView,
      },
      {
        path: "/houseList",
        name: "HouseList",
        component: HouseListView,
      },
      {
        path: "/news",
        name: "News",
        component: NewsView,
      },
      {
        path: "/profile",
        name: "Profile",
        component: ProfileView,
      },
    ],
  },
  {
    path: "/cityList",
    name: "CityList",
    component: CityList,
  },
  {
    path: "/search",
    name: "SearchView",
    component: SearchView,
  },
  {
    path: "/map",
    name: "MapView",
    component: MapView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginVIew,
  },
  {
    path: "/collection",
    name: "Collection",
    meta: {
      isLogin: true,
    },
    component: Collection,
  },
  {
    path: "/rent",
    name: "RentView",
    meta: {
      isLogin: true,
    },
    component: RentView,
  },
  {
    path: "/releaseHouse",
    name: "ReleaseHouseView",
    meta: {
      isLogin: true,
    },
    component: ReleaseHouseView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta!.isLogin) {
    if (isAuth()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
