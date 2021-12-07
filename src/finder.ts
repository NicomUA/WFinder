import { Bitmap } from './bitmap';
import { Matrix } from './common.interface';
import { FinderError } from './error';
import StringReader from './reader';
import { Utils } from './utils';

export default function finder(inputStrings: string[]): void {
  const reader = new StringReader(inputStrings);
  const cases = parseInt(reader.readLine());

  if (isNaN(cases)) {
    throw new FinderError('First line should contain number of cases');
  }

  if (cases <= 0 || cases > 1000)
    throw new FinderError('Cases number should be 1 >= cases <= 1000');

  for (let i = 1; i <= cases; i++) {
    const bitmapData: Matrix = [];
    const settingsRow = reader.readLine().split(' ');

    if (!settingsRow || settingsRow.length != 2) {
      throw new FinderError('Wrong bitmap settings format');
    }
    const [columns, rows] = settingsRow.map(Utils.mapParseToInt);
    if (!columns || !rows) throw new FinderError('Wrong columns:rows format');
    if (columns > 182 || rows > 182)
      throw new FinderError(
        `Allowed bitmap size is 182:182. Get ${columns}:${rows}`,
      );

    for (let i = 0; i < columns; i++) {
      const row = reader.readLine();
      if (!row) throw new FinderError(`Wrong rows number.`);

      const l: number[] = row.split('').map(Utils.mapParseForBitmap);

      if (l.length != rows)
        throw new FinderError(
          `Wrong columns in row. Should be ${rows}, but get ${l.length}`,
        );
      bitmapData[i] = l;
    }

    //creating bitmap from input data
    const bitmap = new Bitmap(columns, rows, bitmapData);

    if (bitmap.whitePixelsCount() === 0) {
      throw new FinderError('There should be at least one white pixel');
    }

    // print all processed data to stdout
    Utils.writeOutput(Utils.printMatrix(bitmap.getDistances()) + '\n');

    // cases should be separated by empty line
    if (i < cases) reader.readLine();
  }
}
