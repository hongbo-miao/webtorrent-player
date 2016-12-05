import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-compatibility',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .tip {
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
    <h3 class="tip">Please use Chrome, Firefox, or Opera</h3>
  `
})
export class CompatibilityComponent { }
