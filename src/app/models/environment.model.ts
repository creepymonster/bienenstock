export type TileType = 'weight' | 'temperature' | 'humidity';

export interface ChannelSettings {
  channelId: number;
  tiles: TileSettings[];
}

export interface TileSettings {
  backgroundColor: string;
  fieldId: number;
  foregroundColor: string;
  tileType: TileType;
  unit: string;
}

export interface Environment {
  channels: ChannelSettings[];
  locale: string;
  production: boolean;
}
