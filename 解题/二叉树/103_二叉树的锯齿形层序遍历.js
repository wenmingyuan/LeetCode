// https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/

/* 自己的解法   用 2 个栈代替队列   没通过   原因：有的情况需要先放右孩子后放左孩子   感觉这种方法不行 */
// var zigzagLevelOrder = function(root) {
//   let result = [];
//   if (!root) return result;
//   let stack1 = [root], stack2 = [];
//   while (stack1.length || stack2.length) {
//     let unEmptyStack = stack1.length ? stack1 : stack2;
//     let emptyStack = stack1.length ? stack2 : stack1;
//     let tmp = [];
//     while (unEmptyStack.length) {
//       let node = unEmptyStack.pop();
//       tmp.push(node.val);
//       if (node.left) emptyStack.push(node.left);
//       if (node.right) emptyStack.push(node.right);
//     }
//     result.push(tmp);  // 忘记用 tmp，忘记要返回二维数组了...
//   }
//   return result;
// };

/* 自己的解法  用 flag 标记层的方向  一开始没想到用 unshift() 方法  通过  和答案一样   unshift() 和 push() 就是双端队列的思想 */
var zigzagLevelOrder = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root], flag = true;  // 又写成 queue = [] 了...
  while (queue.length) {
    flag = !flag;
    let tmp = [], n = queue.length;
    while (n--) {
      let node = queue.shift();
      if (flag) tmp.unshift(node.val);
      else tmp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(tmp);
  }
  return result;
}
