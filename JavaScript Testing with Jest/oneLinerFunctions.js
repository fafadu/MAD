// oneLinerFunctions.js

// 1. filterEvens: 返回輸入數組中的所有偶數
const filterEvens = numbers => numbers.filter(n => n % 2 === 0);

// 2. sumOfSquares: 返回輸入數組中所有數字的平方和
const sumOfSquares = numbers => numbers.reduce((sum, n) => sum + n * n, 0);

// 3. findLongestWord: 返回輸入單詞數組中最長的單詞
const findLongestWord = words => words.reduce((longest, word) => word.length > longest.length ? word : longest, "");

// 4. capitalizeWords: 將輸入字符串中的每個單詞首字母大寫
const capitalizeWords = sentence => sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// 5. areAllTrue: 檢查數組中的每個元素是否都滿足給定的條件
const areAllTrue = (values, predicate) => values.every(predicate);

// 6. asyncFetchProduct: 模擬根據給定ID獲取產品數據的異步函數
const asyncFetchProduct = async id => id > 0 ? Promise.resolve(`Product ${id}`) : Promise.reject('Invalid ID');

// 7. extractEmails: 使用正則表達式提取字符串中的所有電子郵件地址
const extractEmails = text => text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [];

// 8. removeDuplicates: 移除數組中的所有重複值
const removeDuplicates = array => array.filter((item, index) => array.indexOf(item) === index);

// 9. countWords: 返回一個對象，表示字符串中每個單詞出現的次數
const countWords = sentence => sentence.trim() === '' ? {} : sentence.split(/\s+/).reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {});

// 10. flattenArray: 將嵌套數組展平為一個單一的數組
const flattenArray = arrays => arrays.reduce((flat, array) => flat.concat(array), []);

module.exports = {
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
};
