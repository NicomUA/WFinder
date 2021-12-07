import finder from '../finder';
import { Utils } from '../utils';

describe('Finder', () => {
  let inputData: string[];
  beforeEach(() => {
    inputData = ['1', '2 2', '00', '01'];
  });

  it('Finder should be defined', () => {
    expect(finder).toBeDefined();
  });

  it('Finder should output result', () => {
    const mockWrite = jest.spyOn(Utils, 'writeOutput').mockImplementation();
    finder(inputData);
    expect(mockWrite).toHaveBeenCalledWith('2 1\n1 0\n');
  });

  it('Finder should output result for 2 cases', () => {
    const mockWrite = jest
      .spyOn(Utils, 'writeOutput')
      .mockClear()
      .mockImplementation();
    inputData = ['2', '2 2', '00', '01', '', '2 2', '00', '01'];
    finder(inputData);
    expect(mockWrite).toHaveBeenCalledWith('2 1\n1 0\n');
    expect(mockWrite).toHaveBeenCalledTimes(2);
  });

  it('Finder should throw if no white pixels in bitmap', () => {
    inputData[3] = '00';
    expect(() => finder(inputData)).toThrowError();
  });

  it('Finder should throw if cases data is wrong', () => {
    inputData[0] = 'a';
    expect(() => finder(inputData)).toThrowError(
      'First line should contain number of cases',
    );
    inputData[0] = '0';
    expect(() => finder(inputData)).toThrowError(
      'Cases number should be 1 >= cases <= 1000',
    );
    inputData[0] = '10001';
    expect(() => finder(inputData)).toThrowError(
      'Cases number should be 1 >= cases <= 1000',
    );
  });

  it('Finder should throw if bitmap setting row data is wrong', () => {
    inputData[1] = '';
    expect(() => finder(inputData)).toThrowError(
      'Wrong bitmap settings format',
    );
    inputData[1] = '1 ';
    expect(() => finder(inputData)).toThrowError(
      'Wrong bitmap settings format',
    );
    inputData[1] = ' 2';
    expect(() => finder(inputData)).toThrowError(
      'Wrong bitmap settings format',
    );
    inputData[1] = '22';
    expect(() => finder(inputData)).toThrowError(
      'Wrong bitmap settings format',
    );
    inputData[1] = '0 0';
    expect(() => finder(inputData)).toThrowError('');
  });

  it('Finder should throw if bitmap size > 182', () => {
    inputData[1] = ' 183 183';
    expect(() => finder(inputData)).toThrowError(
      `Allowed bitmap size is 182:182. Get 183:183`,
    );
  });
  it('Finder should throw if bitmap row length is wrong', () => {
    inputData[2] = '001';
    expect(() => finder(inputData)).toThrowError(
      `Wrong columns in row. Should be 2, but get 3`,
    );
  });
  it('Finder should throw if bitmap input data is wrong', () => {
    delete inputData[3];
    expect(() => finder(inputData)).toThrowError(`Wrong rows number.`);
  });
});
