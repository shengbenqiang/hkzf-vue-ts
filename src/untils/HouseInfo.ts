import { SwiperItem } from "./HomeType";

export interface HouseDetail {
  community: string;
  description: string;
  floor: string;
  houseCode: string;
  houseImg: SwiperItem[];
  oriented: string[];
  price: number;
  roomType: string;
  size: number;
  supporting: string[];
  tags: string[];
  title: string;
}

export interface Locate {
  latitude: string;
  longitude: string;
}
