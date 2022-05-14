import { defineStore } from "pinia";
import {
  AreaInfoType,
  RoomStaticType,
  HouseReleaseInfo,
} from "@/untils/RentRelease";

export const releaseHouseInfoStore = defineStore("releaseInfoStore", {
  state: (): { houseInfo: HouseReleaseInfo } => ({
    houseInfo: {
      area: "",
      price: "",
      roomType: {} as RoomStaticType,
      oriented: {} as RoomStaticType,
      floor: {} as RoomStaticType,
      areaInfo: {} as AreaInfoType,
    },
  }),
});
