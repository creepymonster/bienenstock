import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, filter, map, retry } from 'rxjs/operators';

import { ThingChannel, ThingFeed, ThingFeeds, ThingField, ThingFieldEntry } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class ThingSpeakService {
  private THINGSPEAK_API_SERVER = 'https://api.thingspeak.com';

  constructor(private http: HttpClient) { }

  getChannelFeeds(channelId: number): Observable<ThingChannel & ThingFeeds> { // https://api.thingspeak.com/channels/1055033/feed.json
    const url = `${this.THINGSPEAK_API_SERVER}/channels/${channelId}/feed.json`;

    return this.http.get(url).pipe(
      map((res: any) => {
        const channel = this.mapChannel(res.channel);
        const feeds = this.mapFeeds(res.feeds, channel.channelFields);

        const ret: ThingChannel & ThingFeeds = Object.assign({}, channel, {
          feeds: this.splitFeeds(channel.channelFields, feeds)
        });

        return ret;
      })
    );
  }

  getFieldFeed(channelId: number, fieldId: number): Observable<ThingChannel & ThingFeeds> { // https://api.thingspeak.com/channels/1055033/field/1.json
    const url = `${this.THINGSPEAK_API_SERVER}/channels/${channelId}/field/${fieldId}.json`;

    return this.http.get(url).pipe(
      map((res: any) => {
        const channel = this.mapChannel(res.channel);
        const feeds = this.mapFeeds(res.feeds, channel.channelFields.find(field => field.fieldId === fieldId));

        const ret: ThingChannel & ThingFeeds = Object.assign({}, channel, {
          feeds: this.splitFeeds(channel.channelFields, feeds)
        });

        return ret;
      })
    );
  }

  getLastEntryInChannelFeed(channelId: number): Observable<ThingFieldEntry[]> { // https://api.thingspeak.com/channels/1055033/feed/last.json
    const url = `${this.THINGSPEAK_API_SERVER}/channels/${channelId}/feed/last.json`;

    return this.http.get(url).pipe(
      map((res: any) => this.mapFieldEntries(res))
    );
  }

  getLastEntryInFieldFeed(channelId: number, fieldId: number): Observable<ThingFieldEntry> { // https://api.thingspeak.com/channels/1055033/field/1/last.json
    const url = `${this.THINGSPEAK_API_SERVER}/channels/${channelId}/field/${fieldId}/last.json`;

    return this.http.get(url).pipe(
      map((res: any) => this.mapFieldEntry(res, fieldId))
    );
  }

  private getPropertyId(prop: string): number {
    const found = prop.match(/(\d+)/);

    if (found.length > 0) {
      return parseInt(found[found.length - 1], 10);
    }

    return 0;
  }

  private mapChannel(channelRes: any): ThingChannel {
    const fields = Object.getOwnPropertyNames(channelRes).filter(prop => prop.startsWith('field')).map(prop => {
      const fieldRet: ThingField = {
        fieldId: this.getPropertyId(prop),
        fieldKey: prop,
        fieldName: channelRes[prop]
      };

      return fieldRet;
    });

    const ret: ThingChannel = {
      channelId: channelRes.id,
      channelName: channelRes.name,
      channelDescription: channelRes.description,
      channelLatitude: parseFloat(channelRes.latitude),
      channelLongitude: parseFloat(channelRes.longitude),
      channelCreatedAt: new Date(channelRes.created_at),
      channelUpdatedAt: new Date(channelRes.updated_at),
      channelLastEntryId: parseInt(channelRes.last_entry_id, 10),
      channelFields: fields
    };

    return ret;
  }

  private mapFeeds(feedsRes: any, fields: ThingField[] | ThingField): ThingFieldEntry[] {
    const ret = [];

    feedsRes.map((fieldEntry: any) => {
      ret.push(...this.mapFeedsEntry(fieldEntry, fields));
    });

    return ret;
  }

  private mapFeedsEntry(res: any, fields: ThingField[] | ThingField): ThingFieldEntry[] {
    const ret = [];

    if (Array.isArray(fields)) {
      fields.forEach(field => {
        ret.push(this.mapFieldEntry(res, field.fieldId));
      });
    } else {
      ret.push(this.mapFieldEntry(res, fields.fieldId));
    }

    return ret;
  }

  private mapFieldEntries(fieldRes: any): ThingFieldEntry[] {
    const fieldIds = Object.getOwnPropertyNames(fieldRes).filter(prop => prop.startsWith('field')).map(prop => this.getPropertyId(prop));

    return fieldIds.map(fieldId => {
      return this.mapFieldEntry(fieldRes, fieldId);
    });
  }

  private mapFieldEntry(fieldRes: any, fieldId: number): ThingFieldEntry {
    const ret: ThingFieldEntry = {
      fieldId: fieldId,
      entryId: fieldRes.entry_id,
      entryCreatedAt: new Date(fieldRes.created_at),
      entryValue: fieldRes[`field${fieldId}`]
    };

    return ret;
  }

  private splitFeeds(fields: ThingField[], feeds: ThingFieldEntry[]): ThingFeed[] {
    return fields.map(field => {
      const ret: ThingFeed = {
        field: field,
        entries: feeds.filter(e => e.fieldId === field.fieldId)
      };

      return ret;
    });
  }
}
