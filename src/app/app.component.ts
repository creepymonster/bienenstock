import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ThingChannel, ThingFeeds, ThingField, ThingFieldEntry, TileSettings } from '@app/models';
import { Environment } from '@app/models/environment.model';
import { ENV } from '@app/providers/environment.provider';

import { ThingSpeakService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  channel$: Observable<ThingChannel & ThingFeeds>;
  channelIndex = 0;

  constructor(@Inject(ENV) private env: Environment, private thingSpeakService: ThingSpeakService) {
  }

  getLocale(): string {
    return this.env.locale;
  }

  getSettings(channelId: number, fieldId: number): TileSettings {
    return this.env.tiles.find(tile => (tile.channelId === channelId || !tile.channelId) && tile.fieldId === fieldId);
  }

  ngOnInit(): void {
    this.refreshChannel();
  }

  refreshChannel(): void {
    if (Array.isArray(this.env.channelId)) {
      if (this.channelIndex < this.env.channelId.length) {
        this.loadChannel(this.env.channelId[this.channelIndex]);
        this.channelIndex += 1;
      }

      if (this.channelIndex >= this.env.channelId.length) {
        this.channelIndex = 0;
      }
    } else {
      this.loadChannel(this.env.channelId);
    }
  }

  private loadChannel(channelId: number) {
    this.channel$ = this.thingSpeakService.getChannelFeeds(channelId);
  }
}
