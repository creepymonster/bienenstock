import { Component, Input, OnInit } from '@angular/core';

import { ThingFeed, ThingFieldEntry, TileSettings } from '@app/models';

@Component({
  selector: 'weight-view',
  templateUrl: './weight-view.component.html',
  styleUrls: ['./weight-view.component.scss']
})
export class WeightViewComponent implements OnInit {
  get firstEntry(): ThingFieldEntry {
    if (this.feed.entries && this.feed.entries.length > 0) {
      return this.feed.entries[0];
    }

    return null;
  }

  get lastEntry(): ThingFieldEntry {
    if (this.feed.entries && this.feed.entries.length > 0) {
      return this.feed.entries[this.feed.entries.length - 1];
    }

    return null;
  }

  @Input() feed: ThingFeed;
  @Input() locale: string;
  @Input() settings: TileSettings;

  constructor() { }

  formatCreatedAt(value: Date): string {
    return `${value.toLocaleDateString(this.locale)}, ${value.toLocaleTimeString(this.locale)}`;
  }

  formatValue(value: string): string {
    const parsedValue = parseFloat(value);
    
    return `${parsedValue.toLocaleString(this.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${this.settings.unit}`;
  }

  ngOnInit(): void {
  }
}
