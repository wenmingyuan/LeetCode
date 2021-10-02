// https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/

/* 自己的解法   通过   和答案一样 */
var levelOrder = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];  // 一开始写成 queue = [] 了...
  while (queue.length) {
    let node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
};
