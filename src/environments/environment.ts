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

export const environment: Environment = {
  production: false,
  tiles: [{
    fieldId: 'field1',
    tileType: ''
  }]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
