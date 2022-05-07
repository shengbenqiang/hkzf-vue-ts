import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  NavBar,
} from "vant";
import "@/untils/VantStyle";

const app = createApp(App);

app
  .use(router)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .mount("#app");
