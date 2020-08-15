import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';

import { ThingFeed, ThingFieldEntry, TileSettings } from '@app/models';
import { MathServiceService } from '@app/services';

const MAX_VIEW_INDEX = 1;

export interface ChartOptions {
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  grid: ApexGrid;
  legend: ApexLegend;
  markers: ApexMarkers;
  series: ApexAxisChartSeries;
  stroke: ApexStroke;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
}

@Component({
  selector: 'weight-view',
  templateUrl: './weight-view.component.html',
  styleUrls: ['./weight-view.component.scss']
})
export class WeightViewComponent implements OnChanges {
  @Input() autoSwitch: boolean;

  get direction(): string {
    const value = this.lastEntry.entryNumberValue;
    const comparedTo = this.mathService.median(this.values);

    if (value > comparedTo) {
      return '↗';
    }

    if (value < comparedTo) {
      return '↘';
    }

    return '→';
  }

  get isViewChart(): boolean {
    // return true;
    return this.viewIndex === 1;
  }

  get isViewSummary(): boolean {
    // return false;
    return this.viewIndex === 0;
  }

  get lastEntry(): ThingFieldEntry {
    if (this.feed.entries && this.feed.entries.length > 0) {
      return this.feed.entries[this.feed.entries.length - 1];
    }

    return null;
  }

  get max(): string {
    return this.formatValue(this.mathService.max(this.values));
  }

  get mean(): string {
    return this.formatValue(this.mathService.mean(this.values));
  }

  get median(): string {
    return this.formatValue(this.mathService.median(this.values));
  }

  get min(): string {
    return this.formatValue(this.mathService.min(this.values));
  }

  get prevEntry(): ThingFieldEntry {
    if (this.feed.entries && this.feed.entries.length > 1) {
      return this.feed.entries[this.feed.entries.length - 2];
    }

    return null;
  }

  get stddev(): string {
    return this.formatValue(this.mathService.stddev(this.values, true));
  }

  get sum(): string {
    return this.formatValue(this.mathService.sum(this.values));
  }

  get variance(): string {
    return this.formatValue(this.mathService.variance(this.values, true));
  }

  chartOptions: Partial<ChartOptions>;
  @Input() feed: ThingFeed;
  @Input() locale: string;
  @Input() settings: TileSettings;
  values: number[];
  viewIndex = 0;

  constructor(private mathService: MathServiceService) { }

  formatDate(value: Date): string {
    return `${value.toLocaleDateString(this.locale)}, ${value.toLocaleTimeString(this.locale)}`;
  }

  formatShortDate(value: Date): string {
    return value.toLocaleTimeString(this.locale);
  }

  formatValue(value: number): string {
    return `${value.toLocaleString(this.locale, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} ${this.settings.unit}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'feed': {
            this.values = this.feed.entries.map(x => x.entryNumberValue);
            this.chartOptions = {
              chart: {
                width: '100%',
                type: 'line',
                zoom: {
                  enabled: false
                },
                toolbar: {
                  show: false
                },
                fontFamily: '"Open Sans", sans-serif',
                animations: {
                  enabled: false
                },
                offsetX: 0,
                offsetY: 0
              },
              colors: [
                this.settings.backgroundColor
              ],
              dataLabels: {
                enabled: false
              },
              grid: {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                strokeDashArray: 5,
                xaxis: {
                  lines: {
                    show: true
                  }
                },
                yaxis: {
                  lines: {
                    show: true
                  }
                },
                padding: {
                  bottom: 0,
                  left: 0,
                  right: 9,
                  top: 0
                }
              },
              legend: {
                fontWeight: 300,
                fontSize: '12px',
                labels: {
                  colors: ['rgba(255, 255, 255, 1)']
                }
              },
              series: [{
                name: 'Original',
                data: this.feed.entries.map(x => {
                  return <[number, number]>[x.entryCreatedAt.getTime(), x.entryNumberValue];
                })
              }, {
                name: 'Kalman Filter',
                data: this.mathService.filter(this.feed.entries).map(x => {
                  return <[number, number]>[x.entryCreatedAt.getTime(), x.filteredValue];
                })
              }],
              stroke: {
                curve: 'smooth',
                colors: ['#fff', 'rgba(52, 73, 94, 0.85)'],
                width: 3
              },
              tooltip: {
                enabled: true,
                followCursor: false,
                style: {
                  fontSize: '12px'
                },
                y: {
                  formatter: (value: number) => {
                    if (!value) {
                      return;
                    }

                    return `${value.toLocaleString(this.locale, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} ${this.settings.unit}`;
                  }
                },
                x: {
                  formatter: (value: number) => {
                    if (!value) {
                      return;
                    }

                    const dateValue = new Date(value);
                    return `${dateValue.toLocaleDateString(this.locale)}, ${dateValue.toLocaleTimeString(this.locale)}`;
                  }
                },
                marker: {
                  show: false
                }
              },
              xaxis: {
                type: 'datetime',
                labels: {
                  show: true,
                  datetimeUTC: true,
                  style: {
                    colors: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '12px'
                  },
                  rotate: 0,
                  format: 'HH "h"'
                },
                axisBorder: {
                  show: false
                },
                tooltip: {
                  enabled: false
                }
              },
              yaxis: {
                labels: {
                  show: true,
                  padding: 0,
                  offsetX: 5,
                  align: 'left',
                  style: {
                    colors: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '12px'
                  },
                  formatter: (value: number) => {
                    if (!value) {
                      return;
                    }

                    return `${value.toLocaleString(this.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
                },
                axisBorder: {
                  show: false
                }
              }
            };

            break;
          }
        }
      }
    }
  }

  switchView(): void {
    let nextViewIndex = this.viewIndex + 1;

    if (nextViewIndex > MAX_VIEW_INDEX) {
      nextViewIndex = 0;
    }

    this.viewIndex = nextViewIndex;
  }
}
