// https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/

/* 自己的思路       通过      和答案差不多

    核心思路：
      中序遍历序列是升序的，求任意两个结点值的差的绝对值的最小值，就相当于求中序序列中相邻结点的值的差的绝对值的最小值

    步骤：
      1. 用 min 表示结点值的差的绝对值的最小值
      2. 中序遍历二叉搜索树，计算当前结点与上一结点值的差 minus（肯定为正数）
      3. 若 minus 小于 min，则更新 min
      4. 若 min === 1，则返回（1 是 min 可能的最小值了，不用再计算了）
*/
var getMinimumDifference = function(root) {
  // 一开始多写了个 preval 参数，想着传入上一节点的值，但是又没有写返回值，所以出问题了
  // 所以把 preval 参数去掉，把它定义到 dfs() 函数的外面
  let dfs = function(root) {
    if (!root || min === 1) return;

    dfs(root.left);
    let minus = root.val - preval;
    preval = root.val;  // 更新 preval
    if (minus < min) min = minus;
    dfs(root.right);
  }
  
  let min = Infinity, preval = -Infinity;
  dfs(root, preval);  // 开始时会用中序序列的第一个结点值减去 -Infinity，这样得到的是正无穷，可以保证差值被替换掉
  return min;
};
