import { Environment } from '@app/models/environment.model';

export const environment: Environment = {
  channelId: 1055033,
  locale: 'de-DE',
  production: true,
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
    backgroundColor: '#FFC107',
    fieldId: 4,
    foregroundColor: 'white',
    tileType: 'weight',
    unit: 'kg'
  }, {
    backgroundColor: '#3F51B5',
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
