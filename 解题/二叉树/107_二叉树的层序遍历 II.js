// https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路  先层序遍历，再反转数组  或者  将出队元素放入栈中，之后再依次弹栈（我用这种方法）  通过  和答案差不多 */
var levelOrderBottom = function(root) {
  if (!root) return [];
  let queue = [root];
  let stack = [];
  while (queue.length) {
    let tmp = [];
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      tmp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    stack.push(tmp);
  }
  let result = [];
  while (stack.length) {
    result.push(stack.pop());
  }
  return result;
};

