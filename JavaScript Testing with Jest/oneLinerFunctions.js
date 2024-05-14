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
    expect(filterEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]); // 典型情況
    expect(filterEvens([-1, -2, -3, -4])).toEqual([-2, -4]); // 負數情況
    expect(filterEvens([])).toEqual([]); // 邊界條件：空數組
  });
  
  test('sumOfSquares computes the sum of squares of numbers, including positive and negative numbers', () => {
    expect(sumOfSquares([1, 2, 3])).toBe(14); // 1^2 + 2^2 + 3^2 = 14 典型情況
    expect(sumOfSquares([-1, -2, -3])).toBe(14); // (-1)^2 + (-2)^2 + (-3)^2 = 14 負數情況
    expect(sumOfSquares([])).toBe(0); // 邊界條件：空數組
  });
  
  test('findLongestWord finds the longest word, considering words of varying lengths and multiple words of the same length', () => {
    expect(findLongestWord(['apple', 'banana', 'cherry'])).toBe('banana'); // 典型情況
    expect(findLongestWord(['a', 'ab', 'abc'])).toBe('abc'); // 不同長度的單詞
    expect(findLongestWord(['cat', 'dog', 'bat'])).toBe('cat'); // 相同長度的單詞，返回第一個
    expect(findLongestWord([])).toBe(''); // 邊界條件：空數組
  });
  
  test('capitalizeWords capitalizes each word in the sentence, handling single and multiple words including punctuation', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World'); // 典型情況
    expect(capitalizeWords('javascript is fun')).toBe('Javascript Is Fun'); // 多個單詞
    expect(capitalizeWords('hello, world!')).toBe('Hello, World!'); // 包含標點符號
    expect(capitalizeWords('')).toBe(''); // 邊界條件：空字符串
  });
  
  test('areAllTrue checks if all elements satisfy the predicate with different predicates and various data types', () => {
    expect(areAllTrue([2, 4, 6], x => x % 2 === 0)).toBe(true); // 典型情況
    expect(areAllTrue([2, 4, 7], x => x % 2 === 0)).toBe(false); // 不滿足條件
    expect(areAllTrue([], x => x % 2 === 0)).toBe(true); // 邊界條件：空數組
    expect(areAllTrue([true, true, true], x => x === true)).toBe(true); // 不同數據類型
    expect(areAllTrue([true, false, true], x => x === true)).toBe(false); // 不同數據類型
  });
  
  test('asyncFetchProduct resolves for positive id and rejects for non-positive id to simulate different responses', async () => {
    await expect(asyncFetchProduct(1)).resolves.toBe('Product 1'); // 典型情況
    await expect(asyncFetchProduct(0)).rejects.toBe('Invalid ID'); // 邊界條件：非正數ID
    await expect(asyncFetchProduct(-1)).rejects.toBe('Invalid ID'); // 邊界條件：非正數ID
  });
  
  test('extractEmails extracts all valid email addresses, handling multiple, none, and invalid addresses', () => {
    expect(extractEmails('Contact us at test@example.com and info@example.org')).toEqual(['test@example.com', 'info@example.org']); // 典型情況
    expect(extractEmails('No emails here!')).toEqual([]); // 無郵件地址
    expect(extractEmails('Invalid emails: test@.com, @example.com')).toEqual([]); // 無效郵件地址
    expect(extractEmails('Emails: test@example.com, another.test@example.com')).toEqual(['test@example.com', 'another.test@example.com']); // 多個郵件地址
  });
  
  test('removeDuplicates removes duplicate values from the array, handling no duplicates, some duplicates, and all duplicates', () => {
    expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]); // 典型情況
    expect(removeDuplicates([1, 1, 1])).toEqual([1]); // 所有重複值
    expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]); // 無重複值
    expect(removeDuplicates([])).toEqual([]); // 邊界條件：空數組
  });
  
  test('countWords counts occurrences of each word in the sentence, handling different structures, punctuation, and cases', () => {
    expect(countWords('hello world hello')).toEqual({ hello: 2, world: 1 }); // 典型情況
    expect(countWords('a a a b b')).toEqual({ a: 3, b: 2 }); // 重複單詞
    expect(countWords('A a a B b')).toEqual({ A: 1, a: 2, B: 1, b: 1 }); // 不同大小寫
    expect(countWords('')).toEqual({}); // 邊界條件：空字符串
    expect(countWords('Hello, world! Hello.')).toEqual({ 'Hello,': 1, 'world!': 1, 'Hello.': 1 }); // 包含標點符號
  });
  
  test('flattenArray flattens nested arrays with different levels of nesting', () => {
    expect(flattenArray([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]); // 典型情況
    expect(flattenArray([[], []])).toEqual([]); // 邊界條件：空數組
    expect(flattenArray([[1], [2, [3, 4]]])).toEqual([1, 2, [3, 4]]); // 嵌套數組
    expect(flattenArray([[1, [2, [3, 4]]]])).toEqual([1, [2, [3, 4]]]); // 多層嵌套數組
  });
  