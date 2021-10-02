// https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路     后序遍历      写的太复杂了，不知道为什么总是报错...
  递归函数返回一个二维数组，第一个元素是众数数组，第二个元素是众数的出现次数（数组中的众数的出现次数相同）

  步骤：
    递归左、右子树，分别得到左、右子树的二维数组 leftInfo、rightInfo
    处理根结点：
      1. 若 root.val 同时存在于 leftInfo[0] 和 rightInfo[0]，则返回 [[root.val], leftInfo[1] + rightInfo[1] + 1]
      2. 若 root.val 不存在于 leftInfo[0] 和 rightInfo[0]，则返回 leftInfo[1] 和 rightInfo[1] 较大的那一个的二维数组
      3. 若 root.val 仅存在于 leftInfo[0]，则比较 leftInfo[1] + 1 和 rightInfo[1]
          若相等，则将 root.val 添加到 rightInfo[0] 中，返回 [rightInfo[0], rightInfo[1]]
          若小于，则返回 rightInfo
          若大于，则返回 [[root.val], leftInfo[1] + 1]
      4. 若 root.val 仅存在于 rightInfo[0]，则比较 leftInfo[1] 和 rightInfo[1] + 1
          若相等，则将 root.val 添加到 leftInfo[0] 中，返回 [leftInfo[0], leftInfo[1]]
          若小于，则返回 [[root.val], rightInfo[1] + 1]
          若大于，则返回 leftInfo
*/
// var findMode = function(root) {
//   let dfs = function(root) {
//     if (!root) return [[], 0];
//     if (!root.left && !root.right) return [[root.val], 1];

//     let leftInfo = findMode(root.left);
//     let rightInfo = findMode(root.right);
//     let isInLeft = leftInfo.indexOf(root.val) !== -1;
//     let isInRight = rightInfo.indexOf(root.val) !== -1

//     if (isInLeft && isInRight) return [[root.val], leftInfo[1] + rightInfo[1] + 1];
//     if (!isInLeft && !isInRight) {
//       if (leftInfo[1] > rightInfo[1]) return leftInfo;
//       else return rightInfo;   // 不可能等于
//     }
//     if (isInLeft && !isInRight) {
//       if (leftInfo[1] + 1 === rightInfo[1]) {
//         rightInfo[0].push(root.val);
//         return [rightInfo[0], rightInfo[1]];
//       }
//       else if (leftInfo[1] + 1 < rightInfo[1]) return rightInfo;
//       else return [[root.val], leftInfo[1] + 1];
//     }
//     if (!isInLeft && isInRight) {
//       if (leftInfo[1] === rightInfo[1] + 1) {
//         leftInfo[0].push(root.val);
//         return [leftInfo[0], leftInfo[1]];
//       }
//       else if (leftInfo[1] < rightInfo[1] + 1) return [[root.val], rightInfo[1] + 1];
//       else return leftInfo;
//     }
//   }

//   if (!root) return [];
//   let rootInfo = dfs(root);
//   return rootInfo[0];
// };

/* 看了答案发现需要用中序遍历，这道题的中序序列是非递减的（因为有相等的值，所以不是递增）
  换汤不换药，二叉搜索树的题一定要考虑能否用中序遍历！！！
  实际上这道题和二叉搜索树关系不大，主要是考察能否从一个非递减序列中找出所有的众数！ 
*/

/* 答案
  朴素的做法是根据中序序列，用 Map 存储每个数字的出现次数，但这样需要开辟额外的空间。
  优化空间的做法是用变量记录信息：
    base 记录当前数字
    count 记录当前数字出现的次数
    maxCount 记录已遍历的数字中最大的出现次数
    result 数组存储所有众数
  https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/solution/er-cha-sou-suo-shu-zhong-de-zhong-shu-by-leetcode-/
*/
var findMode = function(root) {
  let base = 0, count = 0, maxCount = 0;
  let result = [];

  const update = (curNum) => {  // update() 的作用是更新 base、count、maxCount、result 这几个变量
    if (curNum === base) ++count;
    else {
      count = 1;
      base = curNum;
    }
    if (count === maxCount) result.push(base);
    if (count > maxCount) {
      maxCount = count;
      result = [base];
    }
  }

  // 中序遍历
  const dfs = (root) => {
    if (!root) return;
    dfs(root.left);
    update(root.val);  // 调用 update()
    dfs(root.right);
  }

  dfs(root);
  return result;
};

/* 理解答案后自己用额外空间写的    通过    但这种方法没有利用二叉搜索树的性质    不推荐使用 */
var findMode = function(root) {
  let dfs = function(root) {
    if (!root) return;
    dfs(root.left);
    let count = map.get(root.val) === undefined ? 0 : map.get(root.val);
    map.set(root.val, count + 1);
    dfs(root.right);
  }

  let map = new Map();
  let max = -Infinity, result = [];
  dfs(root);  // 一开始写成 dfs() 了... 没写参数
  for (let e of map) {
    if (e[1] > max) {
      max = e[1];
      result = [];  // 清空数组
      result.push(e[0]);
    }
    else if (e[1] === max) {  // 不止一个众数
      result.push(e[0]);
    }
  }
  return result;
}

/* 理解答案后自己不用额外空间写的    一开始写错了，见代码    改后和答案差不多，区别在于答案把根结点的处理逻辑封装成函数了 */
var findMode = function(root) {
  let dfs = function(root) {
    if (!root) return;
    dfs(root.left);

    if (root.val === base) {
      count++;
    }
    // else if (root.val !== base) {  // 写的复杂了
    else {
      base = root.val;
      count = 1;
    }
    if (count === maxCount) result.push(root.val);
    else if (count > maxCount) {
      maxCount = count;  // 忘记写这句了...
      result = [];
      result.push(root.val);
    }

    dfs(root.right);
  }

  let base = -Infinity, count = 0, maxCount = 0;
  let result = [];
  dfs(root);
  return result;
}
