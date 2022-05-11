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
  Field,
  Icon,
  Toast,
  Cascader,
  Popup,
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
  .use(Field)
  .use(Icon)
  .use(Cascader)
  .use(Toast)
  .use(Popup)
  .mount("#app");
