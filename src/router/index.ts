import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MapView from "@/views/MapView.vue";
import NewsView from "@/views/NewsView.vue";
import CityList from "@/views/CityList.vue";
import HomeView from "@/views/HomeView.vue";
import SearchView from "@/views/SearchView.vue";
import ParentView from "@/views/ParentView.vue";
import ProfileView from "@/views/ProfileView.vue";
import HouseListView from "@/views/HouseListView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
