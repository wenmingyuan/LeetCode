// https://leetcode-cn.com/problems/binary-tree-postorder-traversal/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己写的递归  通过  和答案一样 */
var postorderTraversal = function(root) {
  let result = [];
  let dfs = function(root) {
    if (!root) return;
    dfs(root.left);
    dfs(root.right);
    result.push(root.val);
  }
  dfs(root);  // 忘记调用了...
  return result;
};

/* 自己写的迭代 
  思路：
    将根结点放入栈中
    若栈顶元素为标记元素（null），则出栈 2 次，将第 2 次出栈的结点的值放入 result
    否则，若栈顶元素的左右子结点都为 null，则弹出栈顶元素，将该结点的值放入 result
    否则，将一个标记元素（null）放入栈中，再将之前的栈顶元素的左右子结点（若存在）放入栈中
*/
var postorderTraversal = function(root) {
  let result = [];
  if (!root) return result;
  let stack = [root];
  while (stack.length) {
    let top = stack[stack.length - 1];
    if (!top) {
      stack.pop();
      let node = stack.pop();
      result.push(node.val);
    }
    else if (!top.right && !top.left) {
      let node = stack.pop();
      result.push(node.val);
    }
    else {
      stack.push(null);  // 做标记
      if (top.right) stack.push(top.right);  // 一开始把 top 写成 root 了...
      if (top.left) stack.push(top.left);
    }
  }
  return result;
};

/* 答案的迭代   比我的简单
  思想：
    后序遍历的顺序是 左右根，将它反过来就是 根右左，而 根右左 可以用 类似前序遍历（根左右）的方式实现
    和前序遍历的区别在于入栈顺序改变了，而且最后将 result 反转了
  思路：
    将根结点放入栈中
    只要栈不为空：
      将栈顶元素出栈，将它的值放入结果数组 result
      将它的左子结点入栈（若存在）
      将它的右子结点入栈（若存在）
    将 result 反转
    返回 result
*/
var postorderTraversal = function(root) {
  let result = [];
  if (!root) return result;
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  result.reverse();
  return result;
};
