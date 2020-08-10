export type TileType = 'weight' | 'temperature' | 'humidity';

export interface TileSettings {
  channelId?: number;
  fieldId: string;
  tileType: TileType;
}

export interface Environment {
  channelId: number | Array<number>;
  production: boolean;
  tiles: Array<TileSettings>;
}
