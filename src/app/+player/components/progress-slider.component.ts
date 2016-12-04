import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-progress-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <wtp-slider [min]="0" [max]="1000" [val]="progress" (changeVal)="onJumpTo($event)"></wtp-slider>
  `
})
export class ProgressSliderComponent {
  @Input() progress: number;
  @Output() jumpTo = new EventEmitter<number>();

  private onJumpTo(progress: number) {
    this.jumpTo.emit(progress);
  }
}
