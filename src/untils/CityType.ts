export interface LocateType {
  label: string;
  pinyin: string;
  short: string;
  value: string;
}

export interface CityAbout {
  cityIndex: string[];
  cityList: ListItem;
}

export interface ListItem {
  [key: string]: LocateType[];
}
export interface CityInfo {
  label: string;
  value: string;
}
