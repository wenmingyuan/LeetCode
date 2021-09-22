// https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/

function Node(val,children) {
  this.val = val;
  this.children = children;
};

/* 我的解法   通过   和答案一样 
  https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/solution/dai-ma-sui-xiang-lu-wo-yao-da-shi-ge-er-3rkpg/
*/
var levelOrder = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let tmp = [];
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      tmp.push(node.val);
      for (let child of node.children) {  // 注意树和二叉树的子结点写法不同
        if (child) queue.push(child);
      }
    }
    result.push(tmp);
  }
  return result;
};

