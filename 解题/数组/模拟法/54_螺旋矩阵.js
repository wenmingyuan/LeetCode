// https://leetcode-cn.com/problems/spiral-matrix/

/* 自己的思路     没想出来怎么写代码 */

/* 答案

  设定 4 个方向的边界（top, right, down, left）
  遍历 1 个方向用 1 个 for 循环（起始位置与终止位置是一对边界，例如起始于 left，终止于 right）
  每遍历完一个方向，更新相应边界（如遍历完向右方向，应将上边界下降一层）

  主要参考这个：https://leetcode-cn.com/problems/spiral-matrix/solution/cxiang-xi-ti-jie-by-youlookdeliciousc-3/
  只看第二种方法（遍历到底）：https://leetcode-cn.com/problems/spiral-matrix/solution/shou-hui-tu-jie-liang-chong-bian-li-de-ce-lue-kan-/
*/
var spiralOrder = function (matrix) {
  const result = [];
  if (matrix.length == 0) return result;  // 数组为空，直接返回
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;  // 对边界赋值

  while (true) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);  // 向右
    top++;
    if (top > bottom) break;

    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);  // 向下
    right--;
    if (left > right) break;

    for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);  // 向左
    bottom--;
    if (top > bottom) break;

    for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);  // 向上
    left++;
    if (left > right) break;
  }
  
  return result;
};

/* 大概理解答案后写的     和答案一样，一开始有写错的地方 */
var spiralOrder = function(matrix) {
  let result = [];
  let top = 0, right = matrix[0].length - 1, down = matrix.length - 1, left = 0;

  while (true) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);  // 条件全都写成 < 了，应该是 <= ...
    top++;
    if (top > down) break;

    for (let i = top; i <= down; i++) result.push(matrix[i][right]);
    right--;
    if (right < left) break;

    for (let i = right; i >= left; i--) result.push(matrix[down][i]);
    down--;
    if (down < top) break;

    for (let i = down; i >= top; i--) result.push(matrix[i][left]);  // 一开始写成 matrix[left][i] 了...
    left++;
    if (left > right) break;
  }

  return result;
}
