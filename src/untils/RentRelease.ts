import { StringAny } from "./BaseType";

export interface HouseReleaseInfo extends StringAny {
  area: string;
  price: string;
  title: string;
  desc: string;
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

export interface SelfFile {
  content: string;
  file: File;
  message: string;
  status: string;
}

export interface PackageType {
  id: number;
  name: string;
  icon: string;
}
