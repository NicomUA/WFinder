export class FinderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Finder';
  }
}
