// https://leetcode-cn.com/problems/add-strings/

/* 自己的思路     从两个数字的个位开始，从右往左，逐位相加，并保留进位  */

/* 答案     和自己思路一样，对于超出另一个数字位数的部分，另一个数字需要补零 
  https://leetcode-cn.com/problems/add-strings/solution/zi-fu-chuan-xiang-jia-by-leetcode-solution/
*/

/* 理解答案思路后自己写的      用了一个指针 k，比答案要麻烦     通过 */
var addStrings = function(num1, num2) {
  let len1 = num1.length, len2 = num2.length;
  if (len2 > len1) return addStrings(num2, num1);

  let arr = [];
  let carry = 0;

  for (let k = 1; k <= len1; k++) {
    let x1 = num1[len1 - k], x2;
    if (k <= len2) x2 = num2[len2 - k];
    else x2 = '0';

    // let sum = x1 - 0 + x2;  // 数字 + 字符串 变成字符串类型了...
    let sum = (x1 - 0) + (x2 - 0) + carry;  // 一开始 carry 加的地方不对...
    arr.push(sum % 10);
    carry = Math.floor(sum / 10);
  }

  if (carry === 1) arr.push(1);

  return arr.reverse().join('');  // 一开始忘记反转字符串了...
};

/* 答案的代码更简洁     使用了 2 个指针，简化了代码，并且对最后的进位的处理也很好 */
var addStrings = function(num1, num2) {
  let i = num1.length - 1, j = num2.length - 1, add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add != 0) {
      const x = i >= 0 ? num1.charAt(i) - '0' : 0;
      const y = j >= 0 ? num2.charAt(j) - '0' : 0;
      const result = x + y + add;
      ans.push(result % 10);
      add = Math.floor(result / 10);
      i -= 1;
      j -= 1;
  }
  return ans.reverse().join('');
};

/* 仿照答案的代码写一遍       和答案一样 */
var addStrings = function(num1, num2) {
  let i = num1.length - 1, j = num2.length - 1;
  let carry = 0;
  let result = [];

  while (i >= 0 || j >= 0 || carry === 1) {
    let x1 = i >= 0 ? num1[i] - 0 : 0;
    let x2 = j >= 0 ? num2[j] - 0 : 0;
    let sum = x1 + x2 + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
    i--;  // 忘记写这句了...
    j--;  // 忘记写这句了...
  }

  return result.reverse().join('');
}
