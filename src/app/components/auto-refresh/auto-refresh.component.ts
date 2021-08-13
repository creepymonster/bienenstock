import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { timer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'auto-refresh',
  templateUrl: './auto-refresh.component.html',
  styleUrls: ['./auto-refresh.component.scss']
})
export class AutoRefreshComponent implements OnInit, OnDestroy {
  get isActive(): boolean {
    return !!this.subscription;
  }

  countdown: string;
  everySecond: Observable<number> = timer(0, 1000);
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Input() refreshEveryMinutes = 3;
  remainingTime: number;
  searchDate: moment.Moment = moment();
  searchEndDate: moment.Moment;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<any>();

  private subscription: Subscription;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.searchEndDate = this.searchDate.add(this.refreshEveryMinutes, 'minutes');
    this.subscription = this.everySecond.subscribe(() => this.updateTimer());
  }

  toggleTimer(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
      this.toggle.emit(false);
    } else {
      this.subscription = this.everySecond.subscribe(() => this.updateTimer());
      this.toggle.emit(true);
    }
  }

  updateTimer(): void {
    const currentTime: moment.Moment = moment();

    this.remainingTime = this.searchEndDate.diff(currentTime) / 1000;

    if (this.remainingTime <= 0) {
      this.searchDate = moment();
      this.searchEndDate = this.searchDate.add(this.refreshEveryMinutes, 'minutes');

      this.refresh.emit();
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
  }
}
