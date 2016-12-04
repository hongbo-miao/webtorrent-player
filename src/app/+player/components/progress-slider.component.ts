import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-progress-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <my-slider [min]="0" [max]="1000" [val]="progress" (changeVal)="onJumpTo($event)"></my-slider>
  `
})
export class ProgressSliderComponent {
  @Input() progress: number;
  @Output() jumpTo = new EventEmitter<number>();

  private onJumpTo(progress: number) {
    this.jumpTo.emit(progress);
  }
}
