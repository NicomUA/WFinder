import { Matrix } from './common.interface';
import { FinderError } from './error';
import * as fs from 'fs';

export class Utils {
  /**
   * Parse int from input
   *
   * @param  {string} s - input string
   * @return {number} - output number.
   *
   * @static
   */
  static mapParseToInt(s: string): number {
    const num = parseInt(s);
    if (isNaN(num)) {
      throw new FinderError('Input should be number');
    }

    return num;
  }

  /**
   * Parse int from bitmap
   *
   * @param  {string} s - input string with 0 or 1
   * @return {number} - output number.
   *
   * @static
   */
  static mapParseForBitmap(s: string): number {
    const num = Utils.mapParseToInt(s);

    if (![0, 1].includes(num)) {
      throw new FinderError('Pixel should contain on 0 or 1');
    }

    return num;
  }

  /**
   * Transfer matrix [][] to string
   *
   * @param  {Matrix} matrix - input [][]
   * @return {string} - output formatted to string.
   *
   * @static
   */
  static printMatrix(matrix: Matrix): string {
    return matrix.map((j) => j.join(' ')).join('\n');
  }

  /**
   * Create 2d array
   *
   * @param  {number} columns - number of columns
   * @param  {number} rows - number of rows
   * @return {Matrix} - output 2d array.
   *
   * @static
   */
  static createMatrix(columns: number, rows: number): Matrix {
    const matrix = [];
    for (let i = 0; i < columns; i++) {
      matrix[i] = new Array(rows).fill(0);
    }
    return matrix;
  }

  /**
   * Read stdin stream
   *
   * @return {string} - data from stdin
   * @static
   */
  static readInput(): string {
    return fs.readFileSync(0, 'utf-8');
  }
  /**
   * Write to stdout stream
   *
   * @param  {string} output - output string
   * @return {void}
   * @static
   */
  static writeOutput(output: string): void {
    process.stdout.write(output);
  }
}
