// https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/

/* 自己写的前序   感觉后序比较麻烦   通过 */
var sumNumbers = function(root) {
  let dfs = function(root, path) {
    if (!root) return;
    path += root.val;
    if (!root.left && !root.right) {
      arr.push(path - 0);
    }
    else {
      dfs(root.left, path);
      dfs(root.right, path);
    }
  }

  let arr = [], sum = 0;
  dfs(root, '');
  for (let e of arr) {
    sum += e;
  }
  return sum;  // 忘记 return 了...
};

/* 答案的 dfs 更简洁   当前节点的 sum  = 父节点的 sum * 10 + 当前节点的值    还需要再理解一下，没太搞懂是怎么想出来的
  参考：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/solution/qiu-gen-dao-xie-zi-jie-dian-shu-zi-zhi-he-by-leetc/
*/
const dfs = (root, prevSum) => {
  if (!root) return 0;
  const sum = prevSum * 10 + root.val;
  if (!root.left && !root.right) return sum;
  return dfs(root.left, sum) + dfs(root.right, sum);
}
var sumNumbers = function(root) {
  return dfs(root, 0);
};

// ---------------------------------------------------------------------------------------------------------------------------

/* 答案的 bfs  使用 2 个队列，一个队列存储当前层的结点，一个队列存储该结点的路径数字    题解中的图很清晰
  参考：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/solution/qiu-gen-dao-xie-zi-jie-dian-shu-zi-zhi-he-by-leetc/
*/
var sumNumbers = function(root) {
  if (root === null) {
      return 0;
  }
  let sum = 0;
  const nodeQueue = [];
  const numQueue = [];
  nodeQueue.push(root);
  numQueue.push(root.val);
  while (nodeQueue.length) {
      const node = nodeQueue.shift();
      const num = numQueue.shift();
      const left = node.left, right = node.right;
      if (left === null && right === null) {
          sum += num;
      } else {
          if (left !== null) {
              nodeQueue.push(left);
              numQueue.push(num * 10 + left.val);
          }
          if (right !== null) {
              nodeQueue.push(right);
              numQueue.push(num * 10 + right.val);
          }
      }
  }
  return sum;
};

/* 理解答案的 BFS 后，自己写的    通过    和答案对比发现不用区分层，即不用写 while(n--) */
var sumNumbers = function(root) {
  let sum = 0;
  if (!root) return sum;
  let nodeQueue = [root], tmpSumQueue = [root.val];
  while (nodeQueue.length) {
    // let n = nodeQueue.length;
    // while (n--) {
      let node = nodeQueue.shift();
      let tmpSum = tmpSumQueue.shift();
      if (!node.left && !node.right) sum += tmpSum;
      if (node.left) {
        nodeQueue.push(node.left);
        tmpSumQueue.push(tmpSum * 10 + node.left.val);
      }
      if (node.right) {
        nodeQueue.push(node.right);
        tmpSumQueue.push(tmpSum * 10 + node.right.val);
      }
    // }
  }
  return sum;
}
