import { StrObj, BaseBoolean } from "./BaseType";

export interface TitleListType {
  title: string;
  type: string;
}

export interface FilterSolveType {
  openType: string;
  condition: ConditionType;
  conditionText: string;
  showMore: boolean;
  selectPicker: SelectPicker;
  showCondition: boolean;
  conditionData: CascadePickerType | BasePicker[];
  titleSelectedStatus: TitleStats;
  closePicker: () => void;
  handleOpenType: (type: string) => void;
  handleSelectPicker: (val: OnSelectType) => void;
  handleMoreSelected: (val: string) => void;
  closeMorePopup: () => void;
  clearMorePopup: () => void;
}

export interface ConditionType {
  [key: string]: CascadePickerType | BasePicker[];
}

export interface CascadePickerType {
  label?: string;
  value: string;
  text?: string;
  children?: CascadePickerType[];
}

export interface BasePicker {
  label?: string;
  value: string;
  text?: string;
}

export interface AreaListType {
  province_list: StrObj;
  city_list: StrObj;
  county_list: StrObj;
}

export interface SelectPicker {
  area: string[];
  rentType: string[];
  price: string[];
  more: string[];
}

export interface OnSelectType {
  value: string;
  tabIndex: number;
  selectedOptions: CascadePickerType[];
}

export interface TitleStats extends BaseBoolean {
  area: boolean;
  rentType: boolean;
  price: boolean;
  more: boolean;
}

export interface FilterStr {
  more: string;
  rentType: string;
  price: string;
  area: string;
}
