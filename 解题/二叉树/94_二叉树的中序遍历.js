// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己写的递归 */
var inorderTraversal = function(root) {
  let dfs = function(root) {
    if (!root) return;
    dfs(root.left);
    result.push(root.val);
    dfs(root.right);
  }
  let result = [];
  dfs(root);
  return result;
};

/* 看了答案后自己写的迭代   通过   但是写的麻烦，有重复代码
  自己的思路（需要参考答案改进）：
    1. 将根结点放入栈中
    2. 只要栈顶元素有左子结点：
         将栈顶元素的左子结点入栈
    3. 只要栈不为空：
         将栈顶元素出栈，记录为 node
         将 node.val 放入结果数组 result
         若 node 有右子结点：
           将右子结点入栈
           执行 2
    4. 返回 result
*/
var inorderTraversal = function(root) {
  let result = [];
  if (!root) return result;
  let stack = [root];  // 写成 [] 了...
  while (stack[stack.length - 1].left) {
    let top = stack[stack.length - 1];
    stack.push(top.left);
  }
  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);  // 忘写了...
    if (node.right) {
      stack.push(node.right);  // 忘写了...
      while (stack[stack.length - 1].left) {
        let top = stack[stack.length - 1];
        stack.push(top.left);
      }
    }
  }
  return result;
};

/* 答案的迭代     用 cur 指针的移动模拟中序遍历    循环结构值得学习
  思路：
    cur = root
    只要 cur !== null 或 栈不为空：
      如果 cur !== null：
        将 cur 入栈，cur = cur.left
      否则：
        将 cur 回退到栈顶元素对应的结点
        将 cur 出栈，并将 cur.val 放入 result
        cur = cur.right
    返回就 result
  注：
    将 cur 回退到栈顶元素对应的结点，这步包含了 2 种情况：
      1. cur 是空的左子结点（cur 回退到父结点）
      2. cur 是空的右子结点（cur 回退到的不是父结点）  
  参考：https://mp.weixin.qq.com/s/c_zCrGHIVlBjUH_hJtghCg
*/
var inorderTraversal = function(root) {
  let result = [];
  let stack = [];
  let cur = root;
  while (cur || stack.length) {  // 循环条件是 栈为空 或 指针指向 null，当栈和指针都为空时，终止循环
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    else {
      cur = stack.pop();
      result.push(cur.val);
      cur = cur.right;
    }
  }
  return result;
}

/* 理解答案后自己写的迭代  和答案一样  */
var inorderTraversal = function(root) {
  let result = [];
  let stack = [];
  let cur = root;
  while (stack.length || cur) {
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    else {
      cur = stack.pop();
      result.push(cur.val);
      cur = cur.right;
    }
  }
  return result;
}
