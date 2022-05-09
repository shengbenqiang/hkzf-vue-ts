export interface SearchProvide {
  getAreaName: (areaName: string) => void;
}
export interface AreaType {
  area: string;
  city: string;
  street: string;
  cityName: string;
  areaName: string;
  community: string;
  streetName: string;
  communityName: string;
}
