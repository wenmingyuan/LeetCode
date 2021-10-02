// https://leetcode-cn.com/problems/unique-binary-search-trees-ii/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路    递归，后序遍历    通过    写了很久
  问题转化成给定中序遍历序列，构造所有的二叉树    
  嵌套 3 个 for 循环，最外层是选择 root ，第二层是选择左子结点，最内层是选择右子结点
*/
var generateTrees = function(n) {
  let helper = function(start, end) {
    if (start > end) return [];

    let roots = [];

    for (let mid = start; mid <= end; mid++) {
      let leftRoots = helper(start, mid - 1);
      let rightRoots = helper(mid + 1, end);

      let leftNum = leftRoots.length;
      let rightNum = rightRoots.length;

      // if (!leftNum && !rightNum) {
      if (leftNum && rightNum) {              // 犯了低级错误，排查了半天问题
        for (let i = 0; i < leftNum; i++) {
          for (let j = 0; j < rightNum; j++) {
            let root = new TreeNode(mid + 1, leftRoots[i], rightRoots[j]);
            roots.push(root);
          }
        }
      }
      else if (leftNum && !rightNum) {
        for (let i = 0; i < leftNum; i++) {
          let root = new TreeNode(mid + 1, leftRoots[i]);
          roots.push(root);
        }
      }
      else if (!leftNum && rightNum) {
        for (let j = 0; j < rightNum; j++) {
          let root = new TreeNode(mid + 1, null, rightRoots[j]);
          roots.push(root);
        }
      }
      else {
        let root = new TreeNode(mid + 1);
        roots.push(root);
      }
    }

    return roots;
  }

  // 没有创建初始的 1 到 n 的数组，递归函数中用 索引 + 1 表示数组元素
  return helper(0, n - 1);
};

/* 答案    比我的简洁
  我的答案的区别在于：
    当左、右子树为空时（即 start > end），我返回的是 []，而答案返回的是 [null]
    我的代码需要判断左、右子树的结点数组的长度是否为 0，因为我的代码没法直接让左、右子结点为 null
    而答案直接返回 [null]，逻辑和非空结点构成的数组是一致的，这样可以避免像我一样复杂的讨论
  https://leetcode-cn.com/problems/unique-binary-search-trees-ii/solution/cong-gou-jian-dan-ke-shu-dao-gou-jian-suo-you-shu-/
*/
var generateTrees = function(n) {
  if (n === 0) return [];
  return helper(1, n);
}
let helper = function(start, end) {
  let list = [];

  if (start > end) {
    list.push(null);
    return list;
  }

  for (let i = start; i <= end; i++) {
    let leftList = helper(start, i - 1);
    let rightList = helper(i + 1, end);
    for (let leftRoot of leftList) {
      for (let rightRoot of rightList) {
        let root = new TreeNode(i, leftRoot, rightRoot);
        list.push(root);
      }
    }
  }

  return list;
}

/* 理解答案后自己写的    和答案一样 */
var generateTrees = function(n) {
  let helper = function(start, end) {
    let list = [];

    if (start > end) {
      list.push(null);
      return list;
    }

    for (let i = start; i <= end; i++) {  // i 不是索引，i 是结点的值
      let leftList = helper(start, i - 1);
      let rightList = helper(i + 1, end);
      for (let leftRoot of leftList) {
        for (let rightRoot of rightList) {
          let root = new TreeNode(i, leftRoot, rightRoot);
          list.push(root);
        }
      }
    }

    return list;
  }

  return helper(1, n);  // 不使用数组索引了，使用结点的值，更方便
}
