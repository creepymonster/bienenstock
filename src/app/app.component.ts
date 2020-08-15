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

  getSettings(fieldId: number): TileSettings {
    return this.env.channels[this.channelIndex].tiles.find(tile => tile.fieldId === fieldId);
  }

  ngOnInit(): void {
    this.refreshChannel();
  }

  refreshChannel(): void {
    if (this.channelIndex < this.env.channels.length) {
      this.channel$ = this.thingSpeakService.getChannelFeeds(this.env.channels[this.channelIndex].channelId);
      this.channelIndex += 1;
    }

    if (this.channelIndex >= this.env.channels.length) {
      this.channelIndex = 0;
    }
  }

  toggleRefresh(state: boolean): void {
    this.autoSwitch = state;
  }
}
