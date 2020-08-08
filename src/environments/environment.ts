export type TileType = 'weight' | 'temperature' | 'humidity';

export interface Tile {
    fieldId: string;
    tileType: TileType;
}

export interface Environment {
  production: boolean;
  channelId: number;
  tiles: Array<Tile>;
}

export const environment: Environment = {
  production: false,
  channelId: 1055033,
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