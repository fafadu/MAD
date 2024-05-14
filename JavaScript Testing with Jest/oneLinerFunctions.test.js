// oneLinerFunctions.test.js
const {
    filterEvens,
    sumOfSquares,
    findLongestWord,
    capitalizeWords,
    areAllTrue,
    asyncFetchProduct,
    extractEmails,
    removeDuplicates,
    countWords,
    flattenArray
  } = require('./oneLinerFunctions');
  
  test('filterEvens filters out odd numbers and works with positive, negative numbers, and empty array', () => {
    expect(filterEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
    expect(filterEvens([-1, -2, -3, -4])).toEqual([-2, -4]);
    expect(filterEvens([])).toEqual([]);
  });
  
  test('sumOfSquares computes the sum of squares of numbers, including positive and negative numbers', () => {
    expect(sumOfSquares([1, 2, 3])).toBe(14); // 1^2 + 2^2 + 3^2 = 14
    expect(sumOfSquares([-1, -2, -3])).toBe(14); // (-1)^2 + (-2)^2 + (-3)^2 = 14
    expect(sumOfSquares([])).toBe(0);
  });
  
  test('findLongestWord finds the longest word, considering words of varying lengths and multiple words of the same length', () => {
    expect(findLongestWord(['apple', 'banana', 'cherry'])).toBe('banana');
    expect(findLongestWord(['a', 'ab', 'abc'])).toBe('abc');
    expect(findLongestWord(['cat', 'dog', 'bat'])).toBe('cat'); // same length, returns the first
    expect(findLongestWord([])).toBe('');
  });
  
  test('capitalizeWords capitalizes each word in the sentence, handling single and multiple words including punctuation', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
    expect(capitalizeWords('javascript is fun')).toBe('Javascript Is Fun');
    expect(capitalizeWords('hello, world!')).toBe('Hello, World!');
    expect(capitalizeWords('')).toBe('');
  });
  
  test('areAllTrue checks if all elements satisfy the predicate with different predicates and various data types', () => {
    expect(areAllTrue([2, 4, 6], x => x % 2 === 0)).toBe(true);
    expect(areAllTrue([2, 4, 7], x => x % 2 === 0)).toBe(false);
    expect(areAllTrue([], x => x % 2 === 0)).toBe(true); // Empty array should return true
    expect(areAllTrue([true, true, true], x => x === true)).toBe(true);
    expect(areAllTrue([true, false, true], x => x === true)).toBe(false);
  });
  
  test('asyncFetchProduct resolves for positive id and rejects for non-positive id to simulate different responses', async () => {
    await expect(asyncFetchProduct(1)).resolves.toBe('Product 1');
    await expect(asyncFetchProduct(0)).rejects.toBe('Invalid ID');
    await expect(asyncFetchProduct(-1)).rejects.toBe('Invalid ID');
  });
  
  test('extractEmails extracts all valid email addresses, handling multiple, none, and invalid addresses', () => {
    expect(extractEmails('Contact us at test@example.com and info@example.org')).toEqual(['test@example.com', 'info@example.org']);
    expect(extractEmails('No emails here!')).toEqual([]);
    expect(extractEmails('Invalid emails: test@.com, @example.com')).toEqual([]);
    expect(extractEmails('Emails: test@example.com, another.test@example.com')).toEqual(['test@example.com', 'another.test@example.com']);
  });
  
  test('removeDuplicates removes duplicate values from the array, handling no duplicates, some duplicates, and all duplicates', () => {
    expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(removeDuplicates([1, 1, 1])).toEqual([1]);
    expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
    expect(removeDuplicates([])).toEqual([]);
  });
  
  test('countWords counts occurrences of each word in the sentence, handling different structures, punctuation, and cases', () => {
    expect(countWords('hello world hello')).toEqual({ hello: 2, world: 1 });
    expect(countWords('a a a b b')).toEqual({ a: 3, b: 2 });
    expect(countWords('A a a B b')).toEqual({ A: 1, a: 2, B: 1, b: 1 });
    expect(countWords('')).toEqual({});
    expect(countWords('Hello, world! Hello.')).toEqual({ 'Hello,': 1, 'world!': 1, 'Hello.': 1 });
  });
  
  test('flattenArray flattens nested arrays with different levels of nesting', () => {
    expect(flattenArray([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
    expect(flattenArray([[], []])).toEqual([]);
    expect(flattenArray([[1], [2, [3, 4]]])).toEqual([1, 2, [3, 4]]);
    expect(flattenArray([[1, [2, [3, 4]]]])).toEqual([1, [2, [3, 4]]]);
  });
  