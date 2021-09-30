// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/

/* 自己的解法   用回溯思想，前序遍历得到 root 到 p 的路径和 root 到 q 的路径，然后找出深度最大的公共结点 */
/* 为节省时间，就先不写代码了，直接看答案的思路 */

/* 答案    递归，后序遍历    这个比较清晰，主要掌握这种方法    看图解

  思路：
    1. 定义布尔值 fx：
          x 结点的子树中（包括以 x 为根结点的树）是否存在 p 或 q
          即 (x = p || x = q) || flson || frson

    2. 若结点 x 满足以下条件之一，则 x 是 LCA：
            (1) p 和 q 分居根结点（x）的两侧
            (2) p 或 q 就是根结点（x），并且 q 或 p 在根结点（x）的左子树或右子树中

            即 (flson​ && frson​) || ((x = p || x = q) && (flson​ || frson​))
            lson 表示：x 的左子结点
            rson 表示：x 的右子结点

  关键就是理解上面 2 个式子！！！

  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/er-cha-shu-de-zui-jin-gong-gong-zu-xian-by-leetc-2/
*/
var lowestCommonAncestor = function(root, p, q) {
  const helper = (x, p, q) => {
    if (x === null) return false;

    const flson = helper(x.left, p, q);
    const frson = helper(x.right, p, q);
    if ((flson && frson) || ((x.val === p.val || x.val === q.val) && (flson || frson))) {  // 判断是否是 LCA
      ans = x;
    }
    
    return (x.val === p.val || x.val === q.val) || flson || frson;  // 返回 fx
  }
  
  let ans;
  helper(root, p, q);
  return ans;
};

/* 理解答案后自己写的    一开始有写错的地方，见代码，改正后和答案一样 */
var lowestCommonAncestor = function(root, p, q) {
  let helper = function(x, p, q) {
    if (!x) return false;

    let flson = helper(x.left, p, q);  // 一开始把 helper() 写成 lowestCommonAncestor() 了...
    let frson = helper(x.right, p, q);
    if ((flson && frson) || ((x.val === p.val || x.val === q.val) && (flson || frson))) {
      result = x;
    }

    return (x.val === p.val || x.val === q.val) || flson || frson;
  }

  let result = null;
  helper(root, p, q);
  return result;  // 一开始写成 return helper(root, p, q) 了...
}

// -----------------------------------------------------------------------------------------------------------------------

/* 答案    递归     很难理解    不研究了
  最难理解的地方就是：递归函数的功能是什么、为什么这么定义

  第一篇题解说的比较清楚：
    递归函数的功能并不是返回 p、q 的 LCA，而是返回 p、q 的 “引申定义的 LCA”。
    因为在递归的过程中，除了 p、q 均存在于子树中的情况，还会遇到子树中仅有 p、q 中的一个结点的情况，还有可能遇到 p、q 均不存在于子树的情况。
    
    引申定义的 LCA：
      若 p、q 都存在于 root 中，则 “引申定义的 LCA” 即为 p、q 的 LCA
      若 p、q 仅有一个存在于 root 中，则 “引申定义的 LCA” 为存在的那个结点
      若 p、q 都不存在于 root 中，则 “引申定义的 LCA” 为 null

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

/* 答案     存储父结点
  类似于二叉搜索树的公共祖先，也是要找到 root 到 p 的路径和 root 到 q 的路径
  但这是普通的二叉树，路径并不容易找到，所以要先遍历二叉树，用 Map 记录每个结点和它的父结点
  之后就可以从 p 开始，不断查找其祖先结点，并将其放入 Set 中，
      当 Map 中无法查找到祖先结点时，说明当前结点是 root，这样就构建完 root 到 p 的路径了
  然后从 q 开始，不断查找祖先结点，若当前结点存在于 Set 中，则该结点就是 LCA

  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/er-cha-shu-de-zui-jin-gong-gong-zu-xian-by-leetc-2/
*/
/* 代码就不贴了，主要掌握递归方法 */
