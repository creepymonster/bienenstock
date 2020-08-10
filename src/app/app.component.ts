import { Component } from '@angular/core';

import { ThingSpeakService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bienenstock';

  constructor(private thingSpeakService: ThingSpeakService) {
    this.thingSpeakService.getLastEntryInFieldFeed(1055033, 1).subscribe(value => {
      console.log(value);
    });

    this.thingSpeakService.getChannelFeeds(1055033).subscribe(value => {
      console.log(value);
    });

    this.thingSpeakService.getFieldFeed(1055033, 1).subscribe(value => {
      console.log(value);
    });

    this.thingSpeakService.getLastEntryInChannelFeed(1055033).subscribe(value => {
      console.log(value);
    });
  }
}
