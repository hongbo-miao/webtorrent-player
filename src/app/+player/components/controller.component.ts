import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'my-controller',
  template: `
    controller
    <div>{{vol}}</div>
    <button class="btn btn-primary" (click)="onVolUp()">+</button>
    <button (click)="onVolDown()">-</button>
  `
})
export class ControllerComponent implements OnChanges {
  @Input() video: any;
  vol: number = 0;

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['video'] && !_.isEqual(changes['video'].previousValue, changes['video'].currentValue)) {
      if (!this.video) return;

      this.vol = this.video.volume;
    }
  }

  onVolUp() {
    this.setVol(.1);
  }

  onVolDown() {
    this.setVol(-.1);
  }

  setVol(value) {
    let vol = this.video.volume;
    vol += value;

    //  test for range 0 - 1 to avoid exceptions
    if (vol >= 0 && vol <= 1) {
      this.video.volume = vol;
      this.vol = this.video.volume;
    } else {
      this.video.volume = (vol < 0) ? 0 : 1;
      this.vol = this.video.volume;
    }
  }
}
