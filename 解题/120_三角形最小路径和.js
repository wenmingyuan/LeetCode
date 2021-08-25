/* 自己写的 自底向上（递推）
  令 dp[i][j] 为：以 triangle[i][j] 为顶点的三角形的最小路径和
  子问题：
    求解 dp[i][j]
  状态转移方程：
    dp[i][j] = triangle[i][j] + Min(dp[i + 1][j], dp[i + 1][j + 1])
  初始值：
    dp[n][j] = triangle[n][j] （n 为三角形最下面一层的索引）
  最终的问题：
    求解 dp[0][0]

  -------------------------------------------------------------------------

  对二维数组的操作不太熟悉，下面是自己写的操作二维数组的代码，下面会使用
  // 如果不用 line，直接写 dp[i][j] = triangle[i][j] 会报错。
  // 因为 dp 是数组（即使是空的），所以 dp[i] = xxx 是可以的。
  // 但是 dp[i][j] 相当于对 dp[i] 这个数组中的元素赋值，然而现在 dp[i] 不存在，它根本不是个数组，所以会报错。

  let triangle = [[2],[3,4],[6,5,7],[4,1,8,3]];
  let dp = [];

  for (let i = 3; i >= 0; i--) {
    let line = [];
    for (let j = 0; j <= i; j++) {
      line[j] = triangle[i][j];
    }
    dp[i] = line;
  }

  console.log(dp);
*/
// var minimumTotal = function(triangle) {
//   let n = triangle.length - 1;
//   let dp = [];
//   // 纠结了好久怎么让 dp 添加元素，觉得用 unshift() 每次添加元素时都要移动整个数组太耗时间
//   // 但我其实可以先声明一个长度和 triangle 一样的数组，然后再从后向前修改元素
//   for (let i = n; i >= 0; i--) {
//     let line = [];  // 为什么用 line 见上方说明
//     for (let j = 0; j <= i; j++) {
//       if (i === n) line[j] = triangle[i][j];
//       else {
//         line[j] = triangle[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
//       }
//     }
//     dp[i] = line;
//   }
//   return dp[0][0];
// }


/* 答案的 自底向上 
  参考：https://leetcode-cn.com/problems/triangle/solution/shou-hua-tu-jie-dp-si-lu-120-san-jiao-xing-zui-xia/
*/
// const minimumTotal = (triangle) => {
//   const h = triangle.length;
//   // 初始化dp数组
//   const dp = new Array(h);
//   for (let i = 0; i < h; i++) {
//     dp[i] = new Array(triangle[i].length);
//   }

//   for (let i = h - 1; i >= 0; i--) { // 自底而上遍历
//     for (let j = 0; j < triangle[i].length; j++) { // 同一层的
//       if (i == h - 1) {  // base case 最底层
//         dp[i][j] = triangle[i][j];  
//       } else { // 状态转移方程，上一层由它下面一层计算出
//         dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
//       }
//     }
//   }
//   return dp[0][0];
// }


/* 看了答案后修改自己的 自底向上，主要是修改二维数组的创建 和答案一样 */
// var minimumTotal = function(triangle) {
//   let height = triangle.length;

//   // 下面是二维数组的创建，必须掌握，我自己的做法显得比较混乱，还是一开始就创建好比较清晰
//   let dp = new Array(height);
//   for (let i = 0; i < height; i++) {
//     dp[i] = new Array(i + 1);
//   }

//   for (let i = height - 1; i >= 0; i--) {
//     for (let j = 0; j <= i; j++) {
//       if (i === height - 1) dp[i][j] = triangle[i][j];
//       else dp[i][j] = triangle[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
//     }
//   }
//   return dp[0][0];
// }


/* 在修改了自己的 自底向上 基础上，自己写的 自底向上 + 优化空间，和答案差不多 
  参考：https://leetcode-cn.com/problems/triangle/solution/shou-hua-tu-jie-dp-si-lu-120-san-jiao-xing-zui-xia/
*/
var minimumTotal = function(triangle) {
  let height = triangle.length;
  let dp = new Array(height);  // 为优化空间，只使用一维数组
  for (let i = height - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (i === height - 1) dp[j] = triangle[i][j];
      else dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
    }
  }
  return dp[0];
}


/* 测试 */
let triangle = [[2],[3,4],[6,5,7],[4,1,8,3]];
let res = minimumTotal(triangle);
console.log(res);
