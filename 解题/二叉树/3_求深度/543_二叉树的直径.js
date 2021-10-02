// https://leetcode-cn.com/problems/diameter-of-binary-tree/

/* 自己没想出来，看答案了 */

/* 答案
  思路：
    每条路径都可以看作是由 当前路径上的根结点的 左侧路径 和 右侧路径 拼接得到

    而根结点到某个结点的路径长度 就是 根结点到该结点的深度！（就像求最大深度那道题一样）

    因此，以当前结点为根结点最大路径长度 = 左侧最大路径长度 + 右侧最大路径长度
                                      = 左子树的最大深度 + 右子树的最大深度

    最后要求的是整棵树的直径（即最大路径长度）
        这就要对树中的每个结点，都算出以该结点为根结点的最大路径，然后再选取这些最大路径中的最大值

    这道题的关键就是：将树中的每个结点都作为根结点来处理，而经过一棵树的根结点的路径长度是很容易计算的！ 

    注意用 后序遍历 求最大深度

  https://leetcode-cn.com/problems/diameter-of-binary-tree/solution/er-cha-shu-de-zhi-jing-by-leetcode-solution/
*/
var diameterOfBinaryTree = function(root) {
  let getDepth = function(root) {
    if (!root) return 0;
    let L = getDepth(root.left);
    let R = getDepth(root.right);
    result = Math.max(result, L + R + 1);
    return Math.max(L, R) + 1;
  }
  
  let result = 1;
  getDepth(root);
  return result - 1;
};

/* 理解答案后自己写的      和答案差不多，区别在于我计算的是路径上的边，答案计算的是路径上的结点数减一 */
var diameterOfBinaryTree = function(root) {
  let getDepth = function(root) {
    if (!root) return 0;

    let leftDepth = getDepth(root.left);
    let rightDepth = getDepth(root.right);
    let len = leftDepth + rightDepth;

    if (len > result) result = len;

    return Math.max(leftDepth, rightDepth) + 1;
  }

  let result = 0;
  getDepth(root);  // 不用接收返回值
  return result;
}
