import { Injectable } from "@angular/core";
import { interval, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class IntervalService {
  interval$: Observable<number>;

  constructor() {
    this.interval$ = interval(1000);
  }
}