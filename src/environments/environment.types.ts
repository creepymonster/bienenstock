export type TileType = 'weight' | 'temperature' | 'humidity';

export interface TileSettings {
    fieldId: string;
    tileType: TileType;
}

export interface MqttSettings {
  server: string;
  protocol: string;
  port: number;
}

export interface Environment {
  production: boolean;
  tiles: Array<TileSettings>;
  mqtt: MqttSettings;
}
