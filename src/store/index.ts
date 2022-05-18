import { defineStore } from "pinia";
import {
  AreaInfoType,
  RoomStaticType,
  HouseReleaseInfo,
} from "@/untils/RentRelease";

export const releaseMain = defineStore("release", {
  state: (): { houseInfo: HouseReleaseInfo } => ({
    houseInfo: {
      area: "",
      price: "",
      title: "",
      desc: "",
      roomType: {} as RoomStaticType,
      oriented: {} as RoomStaticType,
      floor: {} as RoomStaticType,
      areaInfo: {} as AreaInfoType,
      selectPackage: [],
      houseImgs: [],
    },
  }),
});

export const visitHouse = defineStore("houseInfo", {
  state: (): { houseCode: string } => ({
    houseCode: "",
  }),
});
