// https://leetcode-cn.com/problems/spiral-matrix-ii/

/* 自己的思路   采用和 54_螺旋矩阵 同样的方法，区别在于：在朝某个方向遍历时，对相应位置的数组元素赋值    通过 */
var generateMatrix = function(n) {
  let result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = new Array(n);
  }
  let top = 0, down = n - 1, left = 0, right = n - 1;
  let num = 0;

  while (true) {
    for (let i = left; i <= right; i++) result[top][i] = ++num;
    top++;
    if (top > down) break;

    for (let i = top; i <= down; i++) result[i][right] = ++num;
    right--;
    if (right < left) break;

    for (let i = right; i >= left; i--) result[down][i] = ++num;
    down--;
    if (down < top) break;

    for (let i = down; i >= top; i--) result[i][left] = ++num;
    left++;
    if (left > right) break;
  }

  return result;
};

/* 答案和我写的差不多，区别在于答案的终止条件更简单，但我不打算参考，因为没有搞清楚循环是怎么终止的
  答案是用 num <= n * n 作为循环条件，但这道题是正方形矩阵，也许因为这个才能写的这么简洁
  而 54 题不一定是正方形矩阵，笨猪爆破组的题解最后也有写用数组长度作为循环终止条件，但循环体中也有写终止条件
  所以循环是如何终止的可能比我想的更复杂，暂时不研究了
  https://leetcode-cn.com/problems/spiral-matrix-ii/solution/spiral-matrix-ii-mo-ni-fa-she-ding-bian-jie-qing-x/
*/