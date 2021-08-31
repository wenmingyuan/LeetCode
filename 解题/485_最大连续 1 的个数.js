/* 自己的思路   通过   和答案差不多
  我和答案的区别：
    我是每遇到一个元素就比较一次 n 和 max 的大小
    答案是 在当前元素为 0 时 和 数组遍历结束后，比较 n 和 max 的大小
    答案省去了元素一直是 1 的情况下的比较，更节省时间
  还有答案是 在当前元素为 1 时，比较 n 和 max 的大小
  都可以
  --------------------------------------------------
  用 max 保存当前最大连续 1 的个数
  用 n 保存当前连续 1 的个数
  遍历数组
    若当前元素为 0，则重置 n 为 0
    若当前元素为 1，则 n++
    若 n > max，则 max = n
  返回 max
*/
var findMaxConsecutiveOnes = function(nums) {
  let max = 0, n = 0;
  for (let num of nums) {
    if (!num) n = 0;
    else n++;
    if (n > max) max = n;
  }
  return max;
}


/* 答案还有用 双指针 构造 滑动窗口 的做法，感觉和上面的思路其实差不多
  https://leetcode-cn.com/problems/max-consecutive-ones/solution/java-485-zui-da-lian-xu-1de-ge-shu-hua-dong-chuang/
*/


/* 测试 */
let nums = [1,1,0,1,1,1];
// let nums = [1];
console.log(findMaxConsecutiveOnes(nums));
