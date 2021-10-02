// https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/

function Node(val,children) {
  this.val = val;
  this.children = children;
};

/* 我的解法  递归  和答案一样
  参考：https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/solution/yi-tao-quan-fa-shua-diao-nge-bian-li-shu-de-wen--3/
*/
var preorder = function(root) {
  let result = [];
  dfs(root, result);
  return result;
};
let dfs = function(root, result) {
  if (!root) return;
  result.push(root.val);
  for (let child of root.children) {
    dfs(child, result);  // 忘记加 result 参数了...
  }
}

/* 我的解法   迭代   通过  和答案一样 */
var preorder = function(root) {
  let result = [];
  if (!root) return result;
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);
    for (let i = node.children.length - 1; i >= 0; i--) {
      if (node.children[i]) stack.push(node.children[i]);
    }
  }
  return result;
}
