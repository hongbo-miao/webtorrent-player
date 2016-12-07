import { SpeedPipe } from './';

describe('Pipe: SpeedPipe', () => {
  const pipe = new SpeedPipe();

  it('transforms 0 to "0 B/s"', () => {
    expect(pipe.transform(0)).toBe('0 B/s');
  });

  it('transforms 0.1 to "0.1 B/s"', () => {
    expect(pipe.transform(0.1)).toBe('0.1 B/s');
  });

  it('transforms 1208 to "1.2 kB/s"', () => {
    expect(pipe.transform(1208)).toBe('1.2 kB/s');
  });

  it('transforms 1200008 to "1.2 MB/s"', () => {
    expect(pipe.transform(1200008)).toBe('1.2 MB/s');
  });
});
