import { Environment } from '@app/models/environment.model';

export const environment: Environment = {
  channels: [{
    channelId: 1055033,
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
  }],
  locale: 'de-DE',
  production: true
};
