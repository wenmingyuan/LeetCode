// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/* 自己的思路    思考了一会才有思路    通过       但写了很久

  根据 root.val 和 p.val 的大小关系，有选择地遍历二叉搜索树，用数组记录从 root 到 p 的路径上经过的结点
  根据 root.val 和 q.val 的大小关系，有选择地遍历二叉搜索树，
    每经过一个结点，查找该结点是否在 root 到 p 的路径上出现过，
      若出现过，则记录该结点（将它放到数组中）（后来写代码的时候进行了优化，用一个变量表示 LCA）
      若没有出现过，则它的上一个结点就是 LCA（最近公共祖先）
*/
var lowestCommonAncestor = function(root, p, q) {
  // 记录 root 到 p 的路径
  let pPath = [];
  let cur = root;
  while (cur) {
    pPath.push(cur);
    if (p.val < cur.val) cur = cur.left;
    else if (p.val > cur.val) cur = cur.right;  // 一开始写成 if 了...  导致上面一句和这句可能都执行
    else break;
  }

  // 将 pPath 转换成 Map，加速查找
  let map = new Map();
  for (let e of pPath) {
    map.set(e, 0);
  }

  // 记录 root 到 q 的路径
  let lca = null;
  cur = root;
  while (cur) {
    if (map.get(cur) === undefined) return lca;
    else lca = cur;
    if (q.val < cur.val) cur = cur.left;
    else if (q.val > cur.val) cur = cur.right;
    else return lca;  // 一开始没有写这句话，以为不用处理 q.val === cur.val 的情况。后来测试用例 [2,1] 1 2 无法通过，才发现缺少了这里的逻辑
  }
};

/* 答案    我的解法和答案方法一的思路相同     答案没有进行优化，但代码会更简单
  区别在于答案是先完整地获取 2 条路径（2 个数组），之后再从 2 个数组中找出具有最大索引的相同元素（LCA）    
  我应该向答案学习，先写出来再说，之后再考虑优化
  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/solution/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-26/
*/
/* 不贴代码了，还要转换成 JS，太麻烦 */

// ------------------------------------------------------------------------------------------------------------------------

/* 答案    递归
  关键在于思路：
    当 p 的值和 q 的值都小于根结点时，说明 p 和 q 都在左子树中，递归左子树
    当 p 的值和 q 的值都大于根结点时，说明 p 和 q 都在右子树中，递归右子树
    其他情况，根结点就是 LCA：
      (1) p 和 q 分居根结点两侧
      (2) 其中一个是根结点，另一个在左子树或右子树
  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/solution/di-gui-he-die-dai-fa-by-hyj8/
*/
const lowestCommonAncestor = (root, p, q) => {
  if (p.val < root.val && q.val < root.val) {
      return lowestCommonAncestor(root.left, p, q);
  }
  if (p.val > root.val && q.val > root.val) {
      return lowestCommonAncestor(root.right, p, q);
  }
  return root;
};

/* 理解答案的递归后自己写的    和答案一样 */
var lowestCommonAncestor = function(root, p, q) {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  else if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  else return root;
}

// ------------------------------------------------------------------------------------------------------------------------

/* 答案    递归的迭代版本 */
const lowestCommonAncestor = (root, p, q) => {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      break;
    }
  }
  return root;
};

/* 理解答案的迭代后自己写的    和答案一样，但一开始写错了，见代码注释 */
var lowestCommonAncestor = function(root, p, q) {
  let cur = root;  // 可以像答案一样，不用 cur，全部用 root   我用了 cur，下面没注意就出错了...
  while (cur) {
    if (p.val < cur.val && q.val < cur.val) {  // 一开始把 cur.val 都写成 root.val 了...
      cur = cur.left;
    }
    else if (p.val > cur.val && q.val > cur.val) {
      cur = cur.right;
    }
    else return cur;
  }
}
