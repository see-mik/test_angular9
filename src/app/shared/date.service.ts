import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs/index';

export type Date = BehaviorSubject<moment.Moment>;

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: Date = new BehaviorSubject(moment());

  getDate(): Date {
    return this.date;
  }

  changeMonth(dir: number): void {
    const val = this.date.value.add(dir, 'month');
    this.date.next(val);
  }

  changeDate(date: moment.Moment): void {
    const val = this.date.value.set({
      date: date.date(),
      month: date.month()
    });

    this.date.next(val);
  }
}
