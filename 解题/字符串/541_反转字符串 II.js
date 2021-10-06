// https://leetcode-cn.com/problems/reverse-string-ii/

/* 最近重写了这道题 */

/* 自己的思路     取余后判断是哪种情况，然后再反转     看了答案后发现自己的思路过于复杂 */

/* 答案

  思路：
    反转所有下标从 2k 的倍数开始，长度为 k 的子串。若长度不足 k，反转整个字串。

  细节：
    1. 首先要将字符串转换为数组，才能进行后续操作
    2. 需要定义一个字符数组的反转函数（参数是左、右指针），写法与 344_反转字符串 相同
    3. 调用函数时：
          左指针为 i
          右指针的位置需要进行判断：
            若 i + k > n，则右指针为 n - 1（字符串长度为 n）
            若 i + k <= n，则右指针为 i + k - 1
    4. 最后要将数组转换回字符串
  
  https://leetcode-cn.com/problems/reverse-string-ii/solution/fan-zhuan-zi-fu-chuan-ii-by-leetcode-sol-ua7s/
*/
var reverseStr = function(s, k) {
    const n = s.length;
    const arr = Array.from(s);
    for (let i = 0; i < n; i += 2 * k) {
        reverse(arr, i, Math.min(i + k, n) - 1);
    }
    return arr.join('');
};
const reverse = (arr, left, right) => {
    while (left < right) {
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

/* 理解答案后自己写的    和答案一样 */
var reverseStr = function(s, k) {
  let helper = function(arr, i, j) {
    while (i < j) {
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
      i++;  // 忘记写这句了...
      j--;  // 忘记写这句了...
    }
  }

  let n = s.length;
  let arr = s.split('');  // 一开始 split() 内没写参数导致出错...
  for (let i = 0; i < n; i += 2 * k) {
    if (i + k <= n) {
      helper(arr, i, i + k - 1);
    }
    else helper(arr, i, n - 1);
  }
  return arr.join('');
}
