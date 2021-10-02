// https://leetcode-cn.com/problems/sqrtx/

/* 自己的思路    通过     看了答案发现我不用把数组搞得那么大，数组末尾元素是 x 即可...
  相当于给定的数组为 [0, 1, 2, 3, ..., 2^31 - 1]，查找最后一个 数组元素的平方 <= x 的元素
  用二分查找
*/
var mySqrt = function(x) {
  let start = 0, end = x;  // 根据答案修改，不需要那么长的数组
  // let start = 0, end = 1;  
  // for (let i = 0; i < 31; i++) {
  //   end *= 2;
  // }
  while (start <= end) {
    let mid = Math.floor((end - start) / 2) + start;
    let square = mid * mid;
    if (square < x) start = mid + 1;
    else if (square > x) end = mid - 1;
    else return mid;
  }
  return end;  // 没有查找到，返回 end 或 start - 1，因为 start 是第一个 元素的平方 > x 的位置
  // 为什么 start 是第一个 元素的平方 > x 的位置？可以参考 35_搜索插入位置 中我的解释
};
