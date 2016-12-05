export function prettyBytes(num) {
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (num < 1) return `${num} B`;

  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  const newNum = Number((num / Math.pow(1000, exponent)).toFixed(1));
  const unit = units[exponent];

  return `${newNum} ${unit}`;
}
