import finder from './finder';
import { Utils } from './utils';

try {
  const inputData = Utils.readInput().split('\n');
  finder(inputData);
} catch (e) {
  console.error(e);
  process.exit(0);
} finally {
  process.exit(0);
}
