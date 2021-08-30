/* 自己的思路  两个数进行异或运算，将结果转换为 2 进制，看有几个 1。  不知道这么做会不会太复杂，直接看答案吧。 */


/* 答案也是这个思路，看结果中有几个 1 叫做 “位计数” ，位计数需要了解移位运算。   暂时不想看了，之后再做这类题吧。 
  参考：https://leetcode-cn.com/problems/hamming-distance/solution/javascriptwei-yun-suan-jie-fa-by-zhu-zhu-xia-6/
*/
var hammingDistance = function(x, y) {
  let ans = 0
  while (x !== 0 || y !== 0) {
      if ((x & 1) !== (y & 1)) {
          ans++
      }
      x >>= 1
      y >>= 1
  }
  return ans
}

