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
  Sticky,
  List,
  Button,
  Form,
  Cell,
  CellGroup,
  Dialog,
  Picker,
  Uploader,
  Notify,
} from "vant";
import "@/untils/VantStyle";
import { createPinia } from "pinia";

const pinia = createPinia();
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
  .use(Dialog)
  .use(Popup)
  .use(Sticky)
  .use(List)
  .use(Button)
  .use(Form)
  .use(Cell)
  .use(CellGroup)
  .use(Picker)
  .use(Uploader)
  .use(pinia)
  .use(Notify)
  .mount("#app");
