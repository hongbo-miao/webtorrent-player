import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .wrapper {
      z-index: 1;
      position: absolute;
      top: 1rem;
      left: 1rem;
      font-size: .7rem;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      width: 5rem;
      padding: .2rem .4rem;
      margin: 0;
    }
  `],
  template: `
    <div class="wrapper">
      <div>↓ {{downloadSpeed | speed}}</div>
      <div>↑ {{uploadSpeed | speed}}</div>
    </div>
  `
})
export class InfoComponent {
  @Input() downloadSpeed: number;
  @Input() uploadSpeed: number;
}
