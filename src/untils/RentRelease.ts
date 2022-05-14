import { StringAny } from "./BaseType";

export interface HouseReleaseInfo extends StringAny {
  area: string;
  price: string;
  roomType: RoomStaticType;
  oriented: RoomStaticType;
  floor: RoomStaticType;
  areaInfo: AreaInfoType;
}

export interface RoomStaticType {
  text: string;
  value: string;
}

export interface AreaInfoType {
  id: string;
  name: string;
}
