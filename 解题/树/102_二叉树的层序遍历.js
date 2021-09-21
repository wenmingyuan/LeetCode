// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 学习了层序遍历的写法后自己写的   和答案一样 
  参考：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/er-cha-shu-de-ceng-xu-bian-li-by-leetcode-solution/
       https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/
*/
var levelOrder = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let arr = [];
    let n = queue.length;
    for (let i = 0; i < n; i++) {  // 开始写成 i < queue.length 了，这样会导致一轮循环后 queue.length 发生变化。用 n 保存 queue.length，就不会变化了。
      let node = queue.shift();
      arr.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(arr);
  }
  return result;
};

/* 测试 */
let root = null;
console.log(levelOrder(root));