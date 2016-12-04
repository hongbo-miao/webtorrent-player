import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-progress-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <my-slider [min]="0" [max]="1000" [val]="progress" (changeVal)="onChangeVal($event)"></my-slider>
  `
})
export class ProgressSliderComponent {
  @Input() video: any;
  @Input() progress: number;
  @Output() changeProgress = new EventEmitter<number>();

  private onChangeVal(progress: number) {
    this.changeProgress.emit(progress / 1000 * this.video.duration);
  }
}
