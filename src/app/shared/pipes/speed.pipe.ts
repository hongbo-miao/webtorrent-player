import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {
  transform(num: number): string {
    if (num === undefined) return '0 B/s';

    const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (num < 1) return `${num} B/s`;

    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    const newNum = Number((num / Math.pow(1000, exponent)).toFixed(1));
    const unit = units[exponent];

    return `${newNum} ${unit}/s`;
  }
}
