/**
 * Simple string reader class.
 * Works like buffer with line by line output
 *
 * @constructor  {string[]} strings - initial strings array
 *
 */

export default class StringReader {
  private strings: string[];

  /**
   * Simple string reader class.
   * Works like buffer with line by line output
   *
   * @constructor  {string[]} strings - initial strings array
   *
   */
  constructor(strings: string[]) {
    this.strings = [...strings];
  }
  /**
   * Simple string reader class.
   * Works like buffer with line by line output
   *
   * @return {string} - shift first string from initial array
   *
   */
  readLine(): string {
    return this.strings.shift()?.trim() || '';
  }
}
