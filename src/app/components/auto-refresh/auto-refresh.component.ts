import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { timer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'auto-refresh',
  templateUrl: './auto-refresh.component.html',
  styleUrls: ['./auto-refresh.component.scss']
})
export class AutoRefreshComponent implements OnInit, OnDestroy {
  countdown: string;
  everySecond: Observable<number> = timer(0, 1000);
  @Output() Refresh: EventEmitter<any> = new EventEmitter<any>();
  @Input() RefreshEveryMinutes = 3;
  remainingTime: number;
  searchDate: moment.Moment = moment();
  searchEndDate: moment.Moment;

  private subscription: Subscription;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.searchEndDate = this.searchDate.add(this.RefreshEveryMinutes, 'minutes');

    this.subscription = this.everySecond.subscribe(() => {
      const currentTime: moment.Moment = moment();

      this.remainingTime = this.searchEndDate.diff(currentTime)  / 1000;

      if (this.remainingTime <= 0) {
        this.searchDate = moment();
        this.searchEndDate = this.searchDate.add(this.RefreshEveryMinutes, 'minutes');

        this.Refresh.emit();
      } else {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = Math.floor(this.remainingTime - minutes * 60);

        if (seconds < 10) {
          this.countdown = `${minutes}:0${seconds}`;
        } else {
          this.countdown = `${minutes}:${seconds}`;
        }
      }

      this.ref.markForCheck();
    });
  }
}
