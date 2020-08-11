import { Environment } from '@app/models/environment.model';

export const environment: Environment = {
  channelId: 1055033,
  locale: 'de-DE',
  production: false,
  tiles: [{
    backgroundColor: '#F44336',
    fieldId: 1,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#009688',
    fieldId: 2,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#9C27B0',
    fieldId: 3,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#607D8B',
    fieldId: 4,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#2196F3',
    fieldId: 5,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#4CAF50',
    fieldId: 6,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
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
