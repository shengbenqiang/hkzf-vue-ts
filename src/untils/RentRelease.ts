import { StringAny } from "./BaseType";
import type { UploaderFileListItem } from "vant";

export interface HouseReleaseInfo extends StringAny {
  area: string;
  price: string;
  title: string;
  desc: string;
  roomType: RoomStaticType;
  oriented: RoomStaticType;
  floor: RoomStaticType;
  areaInfo: AreaInfoType;
  selectPackage: PackageType[];
  houseImgs: UploaderFileListItem[];
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

export interface RentInfo {
  title: string;
  description: string;
  houseImg: string;
  oriented: string;
  supporting: string;
  price: string;
  roomType: string;
  size: string;
  floor: string;
  community: string;
}
