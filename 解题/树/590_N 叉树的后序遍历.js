// https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/

function Node(val,children) {
  this.val = val;
  this.children = children;
};

/* 我写的递归  通过  和答案一样 */
var postorder = function(root) {
  let dfs = function(root) {
    if (!root) return;
    for (let i = 0; i < root.children.length; i++) {
      dfs(root.children[i]);
    }
    result.push(root.val);
  }
  let result = [];
  dfs(root);
  return result;
};

/* 我写的迭代  通过  和答案一样 */
var postorder = function(root) {
  let result = [];
  if (!root) return result;
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);
    for (let child of node.children) {
      if (child) stack.push(child);
    }
  }
  return result.reverse();
};
