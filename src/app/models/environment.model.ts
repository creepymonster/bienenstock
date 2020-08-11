export type TileType = 'weight' | 'temperature' | 'humidity';

export interface TileSettings {
  backgroundColor: string;
  channelId?: number;
  fieldId: number;
  foregroundColor: string;
  tileType: TileType;
  unit: string;
}

export interface Environment {
  channelId: number | number[];
  locale: string;
  production: boolean;
  tiles: TileSettings[];
}
