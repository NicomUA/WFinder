import { IPoint, Matrix } from './common.interface';
import { FinderError } from './error';
import { Utils } from './utils';

export class Bitmap {
  data: Matrix;
  whitePixels: IPoint[];

  constructor(public columns: number, public rows: number, inputData?: Matrix) {
    if (columns <= 0 || rows <= 0) {
      throw new FinderError('Bitmap size should be at least 1:1');
    }
    this.data = inputData || Utils.createMatrix(columns, rows);
    // find all white pixels if input data provided to avoid search in future
    this.whitePixels = inputData ? this.findAllWhite() : [];
  }

  findAllWhite(): IPoint[] {
    const whitePixels: IPoint[] = [];
    for (let x = 0; x < this.data.length; x++) {
      const row = this.data[x];
      for (let y = 0; y < row.length; y++) {
        if (this.data[x][y] === 1) whitePixels.push({ x, y });
      }
    }

    return whitePixels;
  }

  whitePixelsCount(): number {
    return this.whitePixels.length;
  }

  findClosesWhitePixel(startPosition: IPoint): IPoint {
    if (!this.whitePixels.length) {
      throw new FinderError(`Bitmap didn't contain white pixels`);
    }
    let minDistance = Infinity;
    let closesPixel = startPosition;
    // to avoid lot of memory usage and speed just find shortest distance from all founded white pixel
    // is can be implements using BFS or DFS graph algorithm is cases most of bitmap will be white pixel
    for (const whitePixel of this.whitePixels) {
      const currentDistance = this.calculateDistance(startPosition, whitePixel);
      if (currentDistance < minDistance) {
        minDistance = currentDistance;
        closesPixel = whitePixel;
      }
    }

    return closesPixel;
  }

  getDistances(): Matrix {
    const result = Utils.createMatrix(this.columns, this.rows);

    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.data[x][y] === 1) continue;

        const closesWhitePoint = this.findClosesWhitePixel({ x, y });
        result[x][y] = this.calculateDistance({ x, y }, closesWhitePoint);
      }
    }
    return result;
  }

  calculateDistance(p1: IPoint, p2: IPoint): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }

  toString(): string {
    return Utils.printMatrix(this.data);
  }
}
