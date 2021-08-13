import { ThingField } from './thing-field.model';

export interface ThingChannel {
  channelCreatedAt: Date;
  channelDescription: string;
  channelFields: ThingField[];
  channelId: number;
  channelLastEntryId: number;
  channelLatitude: number;
  channelLongitude: number;
  channelName: string;
  channelUpdatedAt: Date;
}
