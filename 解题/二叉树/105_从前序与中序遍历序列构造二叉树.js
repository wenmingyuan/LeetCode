// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己没分析出来，一片混乱    看答案了 */

/* 下面 2 个题解，可以大概参考下思路，我看完还是没有完全理解       后面笨猪爆破组的题解更加清晰地体现了思考步骤
  https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--22/
  https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/dong-hua-yan-shi-105-cong-qian-xu-yu-zhong-xu-bian/
*/

/* 大概理解答案后自己写的   前序遍历   通过    但写了很久...   时间复杂度为 O(n^2)
  由于需要使用 indexOf()，且二叉树遍历时间复杂度为 O(n)，所以最终时间复杂度为 O(n^2)
  思路：
      首先，由前序序列和中序序列可以得到
        根结点的索引为 preorder[0]
        左子结点的索引为 preorder[1]       （若存在，即左子树的范围区间不为空）
        右子结点的索引为 preorder[i + 1]   （若存在，即右子树的范围区别不为空， i 为根结点在中序数组中的索引）
      前序数组
        左子树的范围：[1, i + 1)        i 为根结点在中序数组中的索引
        右子树的范围：[i + 1, n)        n 为前序数组长度
      中序数组
        左子树的范围：[0, i)
        右子树的范围：[i + 1, n)
      当前序数组为空时，返回
*/
var buildTree = function(preorder, inorder) {
  let helper = function(preorder, inorder, root) {
    let n = preorder.length;
    if (n === 0) return;  // 当前序数组为空时，返回

    let i = inorder.indexOf(root.val);  // 找到根结点在中序数组中的索引
    if (i > 0) root.left = new TreeNode(preorder[1]);  // 若左子树不为空，处理根结点
    if (i + 1 < n) root.right = new TreeNode(preorder[i + 1]);  // 若右子树不为空，处理根结点

    helper(preorder.slice(1, i + 1), inorder.slice(0, i), root.left);  // 处理左子树
    helper(preorder.slice(i + 1, n), inorder.slice(i + 1, n), root.right);  // 处理右子树
  }

  let root = new TreeNode(preorder[0]);
  helper(preorder, inorder, root);
  return root;
}

// -------------------------------------------------------------------------------------------------------------------------

/* 笨猪爆破组的解题思路非常清晰，后序遍历，时间复杂度为 O(n^2)
    https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/ding-wei-chu-gen-jie-dian-de-wei-zhi-hua-fen-zuo-y/
  
    思路：
      1. preorder 序列的第一个结点是根结点
      2. 根据根结点的位置，将 inorder 序列划分为左、右子树的 inorder 序列
      3. 根据左、右子树的 inorder 序列长度，将 preorder 序列划分为左、右子树的 preorder 序列
      4. 根据左子树的 preorder、inorder 序列，和右子树的 preorder、inorder 序列，递归构建左子树和右子树

      左子树的
        前序数组区间：[1, mid + 1)    mid 为原中序数组中根结点的位置
        中序数组区间：[0, mid)
      右子树的
        前序数组区间：[mid + 1, n)    n 为原前序数组长度
        中序数组区间：[mid + 1, n)
*/
const buildTree = (preorder, inorder) => {
  if (inorder.length == 0) return null;
  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
};

/* 在上面代码的基础上优化    用一个 start 指针和一个 end 指针表示一个区间，这样就不用每次都用 slice() 切割数组了 

  递归函数的参数：
    之前代码的参数是前序数组区间和中序数组区间
    这里需要改成 4 个参数：
      前序数组的开始指针位置 (pStart)
      前序数组的结束指针位置 (pEnd)
      中序数组的开始指针位置 (iStart)
      中序数组的结束指针位置 (iEnd)

  左子树的
    前序数组的左指针：pStart + 1
    前序数组的右指针：pStart + leftNum    leftNum 是左子树的结点个数，注意必须要计算 leftNum
    中序数组的左指针：iStart
    中序数组的右指针：mid - 1             mid 是中序数组中根结点的位置
  右子树的
    前序数组的左指针：PStart + leftNum + 1
    前序数组的右指针：pEnd
    中序数组的左指针：mid + 1
    中序数组的右指针：iEnd

*/
const buildTree = (preorder, inorder) => {
  const helper = (p_start, p_end, i_start, i_end) => {
    if (p_start > p_end) return null;
    let rootVal = preorder[p_start];    // 根节点的值
    let root = new TreeNode(rootVal);   // 根节点
    let mid = inorder.indexOf(rootVal); // 根节点在inorder的位置
    let leftNum = mid - i_start;        // 左子树的节点数
    root.left = helper(p_start + 1, p_start + leftNum, i_start, mid - 1);
    root.right = helper(p_start + leftNum + 1, p_end, mid + 1, i_end);
    return root;
  };
  return helper(0, preorder.length - 1, 0, inorder.length - 1);
};

/* 进一步优化代码    利用 Map，在查找 inorder 数组中的根结点时，将 indexOf() 的 O(n) 时间复杂度降低到 O(1)   最终时间复杂度为 O(n)
  注：最开始切割数组的代码无法用 Map 优化，因为每次的 inorder 数组并不是同一个
*/
const buildTree = (preorder, inorder) => {
  const map = new Map();
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }
  const helper = (p_start, p_end, i_start, i_end) => {
    if (p_start > p_end) return null;
    let rootVal = preorder[p_start];    // 根节点的值
    let root = new TreeNode(rootVal);   // 根节点
    let mid = map.get(rootVal);         // 根节点在inorder的位置
    let leftNum = mid - i_start;        // 左子树的节点数
    root.left = helper(p_start + 1, p_start + leftNum, i_start, mid - 1);
    root.right = helper(p_start + leftNum + 1, p_end, mid + 1, i_end);
    return root;
  };
  return helper(0, preorder.length - 1, 0, inorder.length - 1);
};

// -------------------------------------------------------------------------------------------------------------------------

/* 自己理解后写的   和答案差不多，把 root 的赋值语句写到 leftRoot 和 rightRoot 的下面了，使后序遍历更容易理解 */
var buildTree = function(preorder, inorder) {
  let n = preorder.length;
  if (n === 0) return null;
  
  let mid = inorder.indexOf(preorder[0]);
  let leftRoot = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  let rightRoot = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  let root = new TreeNode(preorder[0], leftRoot, rightRoot);

  return root;
}

/* 自己写的优化   一开始写的时候很多细节没有注意，见代码中注释  */
var buildTree = function(preorder, inorder) {
  let helper = function(pStart, pEnd, iStart, iEnd) {
    if (pStart > pEnd) return null;

    let mid = inorder.indexOf(preorder[pStart]);  // 一开始写成 inorder.indexOf(pStart) 了...
    let leftNum = mid - iStart;  // leftNum 一开始计算成 mid + 1 - iStart 了...
    let leftRoot = helper(pStart + 1, pStart + leftNum, iStart, mid - 1);
    let rightRoot = helper(pStart + leftNum + 1, pEnd, mid + 1, iEnd);  // pEnd 和 iEnd 都错写成 n 了...
    let root = new TreeNode(preorder[pStart], leftRoot, rightRoot);

    return root;
  }

  let n = preorder.length;
  return helper(0, n - 1, 0, n - 1);
}

/* 自己写的进一步优化 */
var buildTree = function(preorder, inorder) {
  let helper = function(pStart, pEnd, iStart, iEnd) {
    if (pStart > pEnd) return null;

    // let mid = inorder.indexOf(preorder[pStart]);
    let mid = map.get(preorder[pStart]);
    let leftNum = mid - iStart;
    let leftRoot = helper(pStart + 1, pStart + leftNum, iStart, mid - 1);
    let rightRoot = helper(pStart + leftNum + 1, pEnd, mid + 1, iEnd);
    let root = new TreeNode(preorder[pStart], leftRoot, rightRoot);

    return root;
  }

  let n = preorder.length;
  let map = new Map();
  for (let i = 0; i < n; i++) {
    map.set(inorder[i], i);  // 一开始写成 map.set(preorder[i], i) 了...
  }
  return helper(0, n - 1, 0, n - 1);
}
