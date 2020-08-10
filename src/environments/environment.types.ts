export type TileType = 'weight' | 'temperature' | 'humidity';

export interface TileSettings {
    fieldId: string;
    channelId?: number;
    tileType: TileType;
}

export interface Environment {
  production: boolean;
  channelId: number | Array<number>;
  tiles: Array<TileSettings>;
}