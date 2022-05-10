export interface TitleListType {
  title: string;
  type: string;
}

export interface FilterSolveType {
  openType: string;
  condition: ConditionType;
  handleOpenType: (type: string) => void;
}

export interface ConditionType {
  [key: string]: CascadePickerType | basePicker[];
}

export interface CascadePickerType {
  label: string;
  value: string;
  children?: CascadePickerType[];
}

export interface basePicker {
  label: string;
  value: string;
}
