import { Environment } from '@app/models/environment.model';

export const environment: Environment = {
  channelId: [1055033],
  locale: 'de-DE',
  production: false,
  tiles: [{
    backgroundColor: '#1ABC9C',
    fieldId: 1,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#2ECC71',
    fieldId: 2,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#3498DB',
    fieldId: 3,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#9B59B6',
    fieldId: 4,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#F1C40F',
    fieldId: 5,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#E67E22',
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
