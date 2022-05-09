export interface LabelType {
  coord: MapLocate;
  count: number;
  label: string;
  value: string;
}

interface MapLocate {
  latitude: number;
  longitude: number;
}
