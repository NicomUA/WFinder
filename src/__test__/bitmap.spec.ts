import { Bitmap } from '../bitmap';
import { Utils } from '../utils';

describe('[Unit] Bitmap', () => {
  let bitmapWithWhitePixel: Bitmap;

  it('Class should be initiated', () => {
    const bitmap = new Bitmap(1, 1);
    expect(bitmap).toBeDefined();
    expect(bitmap).toBeInstanceOf(Bitmap);
  });

  it('Class throw is wrong size provided', () => {
    expect(() => new Bitmap(0, 1)).toThrowError();
    expect(() => new Bitmap(1, 0)).toThrowError();
    expect(() => new Bitmap(-100, 0)).toThrowError();
  });

  it('Bitmap should be initialized with data', () => {
    const data = Utils.createMatrix(1, 1);
    const bitmap = new Bitmap(1, 1, data);

    expect(bitmap.data).toEqual(expect.arrayContaining([[0]]));
    expect(bitmap.whitePixelsCount()).toEqual(0);
  });

  it('Bitmap should store and count all white pixels data', () => {
    const data = Utils.createMatrix(2, 2);
    data[0][1] = 1;
    const bitmap = new Bitmap(2, 2, data);

    bitmapWithWhitePixel = bitmap;

    expect(bitmap.whitePixels).toEqual(
      expect.arrayContaining([{ x: 0, y: 1 }]),
    );
    expect(bitmap.whitePixelsCount()).toEqual(1);
  });

  it('Bitmap should throw if no white pixels', () => {
    const data = Utils.createMatrix(2, 2);
    const bitmap = new Bitmap(2, 2, data);
    expect(() => bitmap.findClosesWhitePixel({ x: 0, y: 0 })).toThrowError();
  });

  it('Bitmap should return all white pixels', () => {
    expect(bitmapWithWhitePixel).toBeDefined();
    expect(bitmapWithWhitePixel.findAllWhite()).toEqual(
      expect.arrayContaining([{ x: 0, y: 1 }]),
    );
  });

  it('Bitmap should return all white pixels', () => {
    expect(bitmapWithWhitePixel).toBeDefined();
    expect(bitmapWithWhitePixel.findClosesWhitePixel({ x: 0, y: 0 })).toEqual({
      x: 0,
      y: 1,
    });
  });

  it('Bitmap should return distance between two pixels', () => {
    expect(bitmapWithWhitePixel).toBeDefined();
    const distance = bitmapWithWhitePixel.calculateDistance(
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    );

    expect(distance).toBe(2);
  });

  it('Bitmap should be printed', () => {
    expect(bitmapWithWhitePixel).toBeDefined();
    const printedBitmap = bitmapWithWhitePixel.toString();
    expect(printedBitmap).toBe('0 1\n0 0');
  });

  it('Bitmap should calculate all distances to closes white pixel', () => {
    expect(bitmapWithWhitePixel).toBeDefined();
    const distances = bitmapWithWhitePixel.getDistances();

    expect(distances).toEqual(
      expect.arrayContaining([
        [1, 0],
        [2, 1],
      ]),
    );
  });
});
