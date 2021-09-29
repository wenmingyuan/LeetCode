// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/

/* 自己的解法   用回溯思想，前序遍历得到 root 到 p 的路径和 root 到 q 的路径，然后找出深度最大的公共结点 */
/* 为节省时间，就先不写代码了，直接看答案的思路 */

/* 答案
  最难理解的地方就是：递归函数的功能是什么、为什么这么定义。
  第一篇题解说的比较清楚：找到 root 中 p、q 结点的 “引申定义的 LCA”。

  递归函数的功能并不是返回 p、q 的 LCA，而是返回 p、q 的 “引申定义的 LCA”。
  因为在递归的过程中，除了 p、q 均存在于子树中的情况，还会遇到子树中仅有 p、q 中的一个结点的情况，还有可能遇到 p、q 均不存在于子树的情况。

  很有启发的一点是第一篇题解的最后写了这样一句话：
      “我思路的核心是将函数的功能明晰成一句话，对根节点和所有子节点一视同仁，而不是在pq不存在于子树的时候改变函数的功能描述。”
  而对比的这正是第二篇题解对于递归函数功能的表述，显然第一篇题解关于 LCA 的引申定义使得递归函数更易于理解。
  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/zui-jin-gong-gong-zu-xian-tong-guo-yan-shen-ding-y/
  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/c-jing-dian-di-gui-si-lu-fei-chang-hao-li-jie-shi-/

  下面代码随想录的题解和前面题解的讲解方式不同，暂时先不深入理解了
  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/236-er-cha-shu-de-zui-jin-gong-gong-zu-x-tl5b/
*/
var lowestCommonAncestor = function(root, p, q) {
  if (!root) return null;
  if (p === root || q === root) return root;

  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  if (!left) return right;  // 包含了 left、right 都为空的情况
  if (!right) return left;
  return root;
};
