import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-compatibility',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .wrapper {
      text-align: center;
      width: 100%;
      color: #fff;
      background: #000;
      opacity: .95;
      padding: 12rem;
      font-weight: 100;
    }
  `],
  template: `
    <div class="wrapper">
      <h3>Please use Chrome, Firefox, Opera, or Edge</h3>
    </div>
  `
})
export class CompatibilityComponent { }
