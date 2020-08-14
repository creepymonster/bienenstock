import { Injectable } from '@angular/core';

import { ThingFieldEntry } from '@app/models';

import { KalmanFilter } from './math';

export interface FilterResultEntry {
  filteredValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class MathServiceService {
  constructor() { }

  filter(entries: ThingFieldEntry[]): (ThingFieldEntry & FilterResultEntry)[] {
    const kf = new KalmanFilter(0.2, 3);  
    const retFiltered = [];

    entries.forEach(entry => {
      retFiltered.push(Object.assign({}, entry, { filteredValue: kf.filter(entry.entryNumberValue) }));
    });

    return retFiltered;
  }

  max(values: number[]): number {
    return Math.max(...values);
  }

  mean(values: number[]): number {
    return this.sum(values) / values.length;
  }

  median(values: number[]): number {
    values.sort();

    let median = 0;
    if (values.length % 2 === 0) { // even
      // average of two middle numbers
      median = (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
    } else { // odd
      // middle number only
      median = values[(values.length - 1) / 2];
    }

    return median;
  }

  min(values: number[]): number {
    return Math.min(...values);
  }

  stddev(values: number[], sample: boolean): number {
    const s2 = this.variance(values, sample);
    
    return Math.sqrt(s2);
  }

  sum(values: number[]): number {
    return values.reduce((sum, current) => sum + current, 0);
  }

  variance(values: number[], sample: boolean): number {
    const mean = this.mean(values);
    const divisor = (sample ? values.length - 1 : values.length);

    return (1 / divisor) * this.sum(values.map(i => {
      return (i - mean) * (i - mean);
    }));
  }
}
