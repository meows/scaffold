/** Randomly choose an element from array `arr`. 
 * @example 
 * sampleArray([1, 2, 3]) // => 2
 * sampleArray([1, 2, 3]) // => 1
*/
function sampleArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}