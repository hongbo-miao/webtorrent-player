import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      margin: 6.6px 0;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 2.8px;
      cursor: pointer;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
      background: #ea5f32;
      border-radius: 0;
      border: 0 solid rgba(0, 0, 0, 0);
    }
    input[type=range]::-webkit-slider-thumb {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
      border: 0 solid rgba(0, 0, 0, 0);
      height: 16px;
      width: 2px;
      border-radius: 0;
      background: #ea5f32;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -6.6px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #ee7f5c;
    }
    input[type=range]::-moz-range-track {
      width: 100%;
      height: 2.8px;
      cursor: pointer;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
      background: #ea5f32;
      border-radius: 0;
      border: 0 solid rgba(0, 0, 0, 0);
    }
    input[type=range]::-moz-range-thumb {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
      border: 0 solid rgba(0, 0, 0, 0);
      height: 16px;
      width: 2px;
      border-radius: 0;
      background: #ea5f32;
      cursor: pointer;
    }
    input[type=range]::-ms-track {
      width: 100%;
      height: 2.8px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    input[type=range]::-ms-fill-lower {
      background: #d84616;
      border: 0 solid rgba(0, 0, 0, 0);
      border-radius: 0;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
    }
    input[type=range]::-ms-fill-upper {
      background: #ea5f32;
      border: 0 solid rgba(0, 0, 0, 0);
      border-radius: 0;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
    }
    input[type=range]::-ms-thumb {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
      border: 0 solid rgba(0, 0, 0, 0);
      width: 2px;
      border-radius: 0;
      background: #ea5f32;
      cursor: pointer;
      height: 2.8px;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: #ea5f32;
    }
    input[type=range]:focus::-ms-fill-upper {
      background: #ee7f5c;
    }
      `],
  template: `
    <input type="range" [min]="min" [max]="max" [value]="val" #range (change)="onChangeVal(range.value)" />
  `
})
export class SliderComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() val: number;
  @Output() changeVal = new EventEmitter<number>();

  private onChangeVal(value: number) {
    this.changeVal.emit(value);
  }
}
