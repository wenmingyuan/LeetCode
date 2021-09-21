// https://leetcode-cn.com/problems/reverse-string-ii/

/* 自己的思路  分为题目中的 2 种情况讨论   一开始没通过  测试用例："abcdefg", 1   修改后通过了 */
// var reverseStr = function(s, k) {
//   let result = '';
//   let times = Math.floor(s.length / (2 * k));
//   let mod = s.length % (2 * k);
//   let frontLength = times * 2 * k;
//   // 先处理前面能被整除的部分
//   for (let i = 0; i < frontLength; i += 2 * k) {  // 一开始把条件错写成 i < times 了
//     for (let j = i + k - 1; j >= i; j--) {
//       result += s[j];
//     }
//     for (let j = i + k; j < i + 2 * k; j++) {
//       result += s[j];
//     }
//   }
//   // 再处理后面剩余的部分，分情况讨论
//   if (mod >= k) {
//     for (let i = frontLength + k - 1; i >= frontLength; i--) {
//       result += s[i];
//     }
//     for (let i = frontLength + k; i < s.length; i++) {
//       result += s[i];
//     }
//   }
//   else {
//     for (let i = s.length - 1; i >= frontLength; i--) {
//       result += s[i];
//     }
//   }
//   return result;
// };

/* 答案   比我的简洁很多，不太容易想到实现方式
  思路：
    先将字符串转换为数组，这样不需要反转的字符部分就不需要复制一份了
    通过 for 循环，将所有需要反转的字符部分进行反转，这需要定义一个反转函数
    反转函数的参数要有反转的起始位置和终止位置，注意特别考虑字符串末尾不能被 2k 整除的部分，终止位置会有所不同
    将数组还原为字符串
  参考：https://leetcode-cn.com/problems/reverse-string-ii/solution/fan-zhuan-zi-fu-chuan-ii-by-leetcode-sol-ua7s/
*/
// var reverseStr = function(s, k) {
//     const n = s.length;
//     const arr = Array.from(s);
//     for (let i = 0; i < n; i += 2 * k) {
//         reverse(arr, i, Math.min(i + k, n) - 1);
//     }
//     return arr.join('');
// };
// const reverse = (arr, left, right) => {
//     while (left < right) {  // 双指针的写法要记住
//         const temp = arr[left];
//         arr[left] = arr[right];
//         arr[right] = temp;
//         left++;
//         right--;
//     }
// }

/* 理解答案后自己写的  和答案一样 */
var reverseStr = function(s, k) {
  let arr = Array.from(s);
  for (let i = 0; i < s.length; i += 2 * k) {
    reversePart(arr, i, Math.min(i + k, s.length) - 1);
  }
  return arr.join('');
}
let reversePart = function(arr, start, end) {
  while (start < end) {
    let tmp = arr[start];
    arr[start] = arr[end];
    arr[end] = tmp;
    start++;
    end--;
  }
}

/* 测试 */
// let s = "abcdefg", k = 2;
// let s = "abcdefg", k = 1;
let s = "abcd", k = 2;
console.log(reverseStr(s, k));
