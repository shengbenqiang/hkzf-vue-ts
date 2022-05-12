import { tabBarType } from "./ParentType";
import { HomeNavigate } from "./HomeType";
import { TitleListType } from "./ListType";
import { UserMenuType } from "./ProfileType";

export const tabs: tabBarType[] = [
  {
    key: "/home",
    title: "首页",
    icon: "icon-ind",
  },
  {
    key: "/houseList",
    title: "找房",
    icon: "icon-findHouse",
  },
  {
    key: "/news",
    title: "资讯",
    icon: "icon-infom",
  },
  {
    key: "/profile",
    title: "我的",
    icon: "icon-my",
  },
];

export const navigate: HomeNavigate[] = [
  {
    img: require("@/assets/images/nav-1.png"),
    name: "整租",
    path: "/houseList",
  },
  {
    img: require("@/assets/images/nav-2.png"),
    name: "合租",
    path: "/houseList",
  },
  {
    img: require("@/assets/images/nav-3.png"),
    name: "地图找房",
    path: "/map",
  },
  {
    img: require("@/assets/images/nav-4.png"),
    name: "去出租",
    path: "/rent",
  },
];

export const titleList: TitleListType[] = [
  {
    title: "区域",
    type: "area",
  },
  {
    title: "方式",
    type: "rentType",
  },
  {
    title: "租金",
    type: "price",
  },
  {
    title: "筛选",
    type: "more",
  },
];

export const menus: UserMenuType[] = [
  { id: 1, name: "我的收藏", iconfont: "icon-coll", to: "/collect" },
  { id: 2, name: "我的出租", iconfont: "icon-ind", to: "/rent" },
  { id: 3, name: "看房记录", iconfont: "icon-record" },
  { id: 4, name: "成为房主", iconfont: "icon-identity" },
  { id: 5, name: "个人资料", iconfont: "icon-myinfo" },
  { id: 6, name: "联系我们", iconfont: "icon-cust" },
];
