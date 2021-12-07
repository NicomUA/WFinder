import { Utils } from '../utils';
import fs from 'fs';

describe('[Unit] Utils', () => {
  let utils: Utils;
  beforeEach(() => {
    utils = new Utils();
  });

  it('Class should be initiated', () => {
    expect(utils).toBeDefined();
    expect(utils).toBeInstanceOf(Utils);
  });

  it('Utils should have static method mapParseToInt', () => {
    expect(Utils.mapParseToInt).toBeDefined();
    expect(typeof Utils.mapParseToInt).toBe('function');
  });

  it('Utils:mapParseToInt should throw if provided value is NaN', () => {
    expect(() => Utils.mapParseToInt('s')).toThrowError();
  });

  it('Utils:mapParseToInt should return number from string', () => {
    expect(Utils.mapParseToInt('0')).toBe(0);
  });

  it('Utils should have static method mapParseForBitmap', () => {
    expect(Utils.mapParseForBitmap).toBeDefined();
    expect(typeof Utils.mapParseForBitmap).toBe('function');
  });

  it('Utils:mapParseForBitmap should throw if provided value is NaN', () => {
    expect(() => Utils.mapParseForBitmap('s')).toThrowError();
  });

  it('Utils:mapParseForBitmap should throw if provided value not 1 or 0', () => {
    expect(() => Utils.mapParseForBitmap('2')).toThrowError();
  });

  it('Utils:mapParseForBitmap should return number from string', () => {
    expect(Utils.mapParseForBitmap('0')).toBe(0);
  });

  it('Utils should have static method createMatrix', () => {
    expect(Utils.createMatrix).toBeDefined();
    expect(typeof Utils.createMatrix).toBe('function');
  });

  it('Utils:createMatrix should return 2d array for 2:2', () => {
    const matrix = Utils.createMatrix(2, 2);
    expect(matrix).toEqual(
      expect.arrayContaining([
        [0, 0],
        [0, 0],
      ]),
    );
  });

  it('Utils should have static method printMatrix', () => {
    expect(Utils.printMatrix).toBeDefined();
    expect(typeof Utils.printMatrix).toBe('function');
  });

  it('Utils:printMatrix should return string for output', () => {
    const matrix = Utils.createMatrix(2, 2);
    expect(Utils.printMatrix(matrix)).toEqual('0 0\n0 0');
  });

  it('Utils should have static method readInput', () => {
    expect(Utils.readInput).toBeDefined();
    expect(typeof Utils.readInput).toBe('function');
  });

  it('Utils:readInput should return string for input', () => {
    jest.mock('fs');
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('test');
    const input = Utils.readInput();
    expect(input).toBe('test');
  });

  it('Utils:writeOutput should write stdout.write', () => {
    jest.mock('process');
    const mockWrite = jest.spyOn(process.stdout, 'write');
    Utils.writeOutput('test');
    expect(mockWrite).toBeCalled();
  });
});
