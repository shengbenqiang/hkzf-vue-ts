import { tabBarType } from "./ParentType";
import { HomeNavigate } from "./HomeType";
import { TitleListType } from "./ListType";
import { UserMenuType, EmptyType } from "./ProfileType";
import { RoomStaticType, PackageType } from "./RentRelease";

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
    path: "/releaseHouse",
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
  { id: 1, name: "我的收藏", iconfont: "icon-coll", to: "/collection" },
  { id: 2, name: "我的出租", iconfont: "icon-ind", to: "/rent" },
  { id: 3, name: "看房记录", iconfont: "icon-record", to: "" },
  { id: 4, name: "成为房主", iconfont: "icon-identity", to: "" },
  { id: 5, name: "个人资料", iconfont: "icon-myinfo", to: "" },
  { id: 6, name: "联系我们", iconfont: "icon-cust", to: "" },
];

export const emptyData: EmptyType = {
  emptyImg: require("@/assets/images/not-found.png"),
};

export const roomTypeData: RoomStaticType[] = [
  { text: "一室", value: "ROOM|d4a692e4-a177-37fd" },
  { text: "二室", value: "ROOM|d1a00384-5801-d5cd" },
  { text: "三室", value: "ROOM|20903ae0-c7bc-f2e2" },
  { text: "四室", value: "ROOM|ce2a5daa-811d-2f49" },
  { text: "四室+", value: "ROOM|2731c38c-5b19-ff7f" },
];

export const orientedData: RoomStaticType[] = [
  { text: "东", value: "ORIEN|141b98bf-1ad0-11e3" },
  { text: "西", value: "ORIEN|103fb3aa-e8b4-de0e" },
  { text: "南", value: "ORIEN|61e99445-e95e-7f37" },
  { text: "北", value: "ORIEN|caa6f80b-b764-c2df" },
  { text: "东南", value: "ORIEN|dfb1b36b-e0d1-0977" },
  { text: "东北", value: "ORIEN|67ac2205-7e0f-c057" },
  { text: "西南", value: "ORIEN|2354e89e-3918-9cef" },
  { text: "西北", value: "ORIEN|80795f1a-e32f-feb9" },
];

export const floorData: RoomStaticType[] = [
  { text: "高楼层", value: "FLOOR|1" },
  { text: "中楼层", value: "FLOOR|2" },
  { text: "低楼层", value: "FLOOR|3" },
];

export const packageData: PackageType[] = [
  {
    id: 1,
    name: "衣柜",
    icon: "icon-wardrobe",
  },
  {
    id: 2,
    name: "洗衣机",
    icon: "icon-wash",
  },
  {
    id: 3,
    name: "空调",
    icon: "icon-air",
  },
  {
    id: 4,
    name: "天然气",
    icon: "icon-gas",
  },
  {
    id: 5,
    name: "冰箱",
    icon: "icon-ref",
  },
  {
    id: 6,
    name: "暖气",
    icon: "icon-Heat",
  },
  {
    id: 7,
    name: "电视",
    icon: "icon-vid",
  },
  {
    id: 8,
    name: "热水器",
    icon: "icon-heater",
  },
  {
    id: 9,
    name: "宽带",
    icon: "icon-broadband",
  },
  {
    id: 10,
    name: "沙发",
    icon: "icon-sofa",
  },
];
