// https://leetcode-cn.com/problems/reverse-words-in-a-string/

/* 最近重做了这道题 */

/* 自己的思路      调用 API      没有想其他方法 */

/* 答案     调用 API     不是个好的做法
  1. 先用 trim() 去除字符串开头和末尾的空格
  2. 再用 split(/\s+/) 把字符串变成数组
  3. 反转数组
  4. 用空格拼接数组元素为字符串
  参考：https://leetcode-cn.com/problems/reverse-words-in-a-string/solution/fan-zhuan-zi-fu-chuan-li-de-dan-ci-by-leetcode-sol/
*/
var reverseWords = function(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
};

// --------------------------------------------------------------------------------------------------------------------

/* 答案     双指针

  思路：
    1. right 和 left 都指向字符串末尾
    2. right 逆向遍历字符串，当 right 指向的字符不为空格时，left 指向 right，结束遍历
    3. left 逆向遍历字符串，当 left 指向的字符为空格时，将 left 和 right 之间的字符 + 空格 拼接到结果字符串
    4. right 指向 left
    5. 回到 2
  
  https://leetcode-cn.com/problems/reverse-words-in-a-string/solution/151-fan-zhuan-zi-fu-chuan-li-de-dan-ci-j-zle0/
  https://leetcode-cn.com/problems/reverse-words-in-a-string/solution/151fan-zhuan-zi-fu-chuan-li-de-dan-ci-sh-7naj/
*/
/* 代码感觉有些复杂，就不贴了，按自己的风格写就行了 */

/* 理解答案后自己写的双指针
  判断条件一开始把自己绕晕了，实际上唯一的特殊情况就是字符串最左边是空白
*/
/* 下面的代码写了很多注释 */
var reverseWords = function(s) {
  let right = s.length - 1, left = right;
  let arr = [];

  while (left >= 0) {  // right >= 0 也行
    while (s[right] === ' ') right--;  // right === 0 时，s[right] === undefined，自动终止循环
    left = right;
    while (left >= 0 && s[left] !== ' ') left--;  // 要保证 left >= 0，否则会无限循环

    // 字符放到数组里时，可以一个字符一个字符地放，也可以用后面写的 substring()
    // for (let i = left + 1; i <= right; i++) {
    //   arr.push(s[i]);
    // }
    // if (left !== right) arr.push(' ');

    if (left !== right) {  // 排除最左边是空白的情况，如果不判断，会多执行一次 arr.push(' ')
      arr.push(s.substring(left + 1, right + 1));  // substring() 要慎用，当起始位置大于终止位置时，相当于这两个参数互换位置
      arr.push(' ');
    }

    right = left;
  }

  arr.pop();  // 去掉最后一个空格
  return arr.join('');  // 注意要填参数
}
/* 下面的代码把注释去掉了 */
var reverseWords = function(s) {
  let right = s.length - 1, left = right;
  let arr = [];

  while (left >= 0) {
    while (s[right] === ' ') right--;
    left = right;
    while (left >= 0 && s[left] !== ' ') left--;
    if (left !== right) {
      arr.push(s.substring(left + 1, right + 1));
      arr.push(' ');
    }
    right = left;
  }

  arr.pop();
  return arr.join('');
}

/* 这题需要多练，能加强对于指针边界的控制 */
