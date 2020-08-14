import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
  get locale(): string {
    return this.env.locale;
  }

  get showFullscreen(): boolean {
    return this.document.documentElement.requestFullscreen && !(document.documentElement.clientWidth === screen.width && document.documentElement.clientHeight === screen.height);
  }

  autoSwitch = true;
  channel$: Observable<ThingChannel & ThingFeeds>;
  channelIndex = 0;
  timeStamp = '';

  constructor(@Inject(DOCUMENT) private document: any, @Inject(ENV) private env: Environment, private thingSpeakService: ThingSpeakService) {
  }

  fullscreen(): void {
    this.document.documentElement.requestFullscreen();
  }

  getSettings(channelId: number, fieldId: number): TileSettings {
    return this.env.tiles.find(tile => (tile.channelId === channelId || !tile.channelId) && tile.fieldId === fieldId);
  }

  ngOnInit(): void {
    this.refreshChannel();
  }

  refreshChannel(): void {
    if (this.channelIndex < this.env.channelId.length) {
      this.channel$ = this.thingSpeakService.getChannelFeeds(this.env.channelId[this.channelIndex]);
      this.channelIndex += 1;
    }

    if (this.channelIndex >= this.env.channelId.length) {
      this.channelIndex = 0;
    }
  }

  toggleRefresh(state: boolean): void {
    this.autoSwitch = state;
  }
}
