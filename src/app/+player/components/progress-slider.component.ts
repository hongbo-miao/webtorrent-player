import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-progress-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input type="range" min="0" max="1000" [value]="progress" #range (change)="onChangeProgress(range.value)" />
  `
})
export class ProgressSliderComponent {
  @Input() video: any;
  @Input() progress: number;
  @Output() changeProgress = new EventEmitter<number>();

  private onChangeProgress(progress: number) {
    this.changeProgress.emit(progress / 1000 * this.video.duration);
  }
}
