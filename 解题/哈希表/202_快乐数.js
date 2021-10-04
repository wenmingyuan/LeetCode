// https://leetcode-cn.com/problems/happy-number/

/* 自己的思路如下              为节省时间，直接看答案了
  按照快乐数的计算步骤，循环计算给定数的每位数字的平方和，
    若平方和的结果为 1，则返回 true
    若平方和结果与之前计算出的结果相等（说明是无限循环），返回 false
  但有个问题是：如果一个数不是快乐数，那么循环计算平方和的结果一定会出现重复吗？（答案回答了这个问题：一定会重复）
*/

// -------------------------------------------------------------------------------------------------------------------

/* 看了答案后写的总结

  这道题有 2 个难点：

  1. 为什么不是快乐数的数，循环计算的结果一定会出现重复
    可参考官方题解，也有网友作出解释：
      网友 “菜鸟”:  
          “为啥一定不会出现死循环，因为int类型最大值为为‭‭2 147 483 647‬‬， 
          所以平方和最大的数是1 999 999 999，平方和为1 + 81*9 = 724。
          任何数的平方和都在1到724之间，724次循环之内一定有重复的”
      来源：https://leetcode-cn.com/problems/happy-number/solution/shi-yong-kuai-man-zhi-zhen-si-xiang-zhao-chu-xun-h/

  2. 计算一个数的每位数字的平方和，需要知道代码如何写
*/

// -------------------------------------------------------------------------------------------------------------------

/* 答案     和我的思路一样      用 Set 存储已经计算出的平方和
  结合了下面两个题解的代码
  https://leetcode-cn.com/problems/happy-number/solution/kuai-le-shu-by-leetcode-solution/
  https://leetcode-cn.com/problems/happy-number/solution/202-kuai-le-shu-setzai-ha-xi-fa-zhong-de-ying-yong/
*/
var isHappy = function(n) {
  let set = new Set();
  while (n !== 1 && !set.has(n)) {
    set.add(n);
    n = getSum(n);
  }
  return n === 1;
}
let getSum = function(n) {  // 求一个数的每位数字的平方和
  let sum = 0;
  while (n !== 0) {
    sum += (n % 10) * (n % 10);
    // n /= 10;  // 答案是用 JAVA 或 C++ 写的，我抄的时候忘记了 JS 的除法要手动向下取整，导致测试超时...
    n = Math.floor(n / 10);
  }
  return sum;
}

/* 理解答案后自己写的 Set 判断方法     和答案一样 */
var isHappy = function(n) {
  let set = new Set();
  while (n !== 1 && !set.has(n)) {
    set.add(n);
    n = getSum(n);  // 忘写这句了...
  }
  return n === 1;
}
let getSum = function(n) {
  let sum = 0;
  while (n !== 0) {
    sum += (n % 10) * (n % 10);
    n = Math.floor(n / 10);
  }
  return sum;
}

// -------------------------------------------------------------------------------------------------------------------

/* 答案     快慢指针     类似于判断是否是环形链表
  参考上面的题解和下面的
  https://leetcode-cn.com/problems/happy-number/solution/ha-xi-biao-kuai-man-zhi-zhen-kuai-le-shu-ghj4/
*/
var isHappy = function(n) {
  let slow = n, fast = getSum(n);
  while (fast !== 1 && slow !== fast) {
    slow = getSum(slow);
    fast = getSum(getSum(fast));
  }
  return fast === 1;
}
let getSum = function(n) {  // 求一个数的每位数字的平方和
  let sum = 0;
  while (n !== 0) {
    sum += (n % 10) * (n % 10);
    n = Math.floor(n / 10);
  }
  return sum;
}

/* 理解答案后自己写的快慢指针     和答案一样，一开始写错了 */
var isHappy = function(n) {
  // let slow = n, fast = n;  // fast 初始时不应该和 slow 一样，因为循环条件中有 slow !== fast
  let slow = n, fast = getSum(n);
  while (slow !== fast && fast !== 1) {
    slow = getSum(slow);
    fast = getSum(getSum(fast));
  }
  return fast === 1;
}
let getSum = function(n) {
  let sum = 0;
  while (n !== 0) {
    sum += (n % 10) * (n % 10);
    n = Math.floor(n / 10);
  }
  return sum;
}
