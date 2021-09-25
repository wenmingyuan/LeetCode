// https://leetcode-cn.com/problems/path-sum-ii/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 我的解法   递归    应该返回二维数组，一开始写成返回一维数组了...    没通过，超时了   */
var pathSum = function(root, targetSum) {
  if (!root) return [];
  if (!root.left && !root.right) {
    if (root.val === targetSum) return [[root.val]];
    return [];
  }
  let leftPath = pathSum(root.left, targetSum - root.val);
  let rightPath = pathSum(root.right, targetSum - root.val);
  // 合并左右子树的路径
  for (let e of rightPath) {
    leftPath.push(e);
  }
  // 在每条路径的最前面添加 root.val
  for (let i = 0; i < leftPath.length; i++) {
    leftPath.unshift(root.val);
  }
  return leftPath;
};

/* 我的解法  回溯   通过   但是写的太麻烦了，没什么价值
  dfs() 函数的参数使用字符串类型表示路径，而非数组，因为字符串是基本类型，值传递时不会修改原字符串
*/
var pathSum = function(root, targetSum) {
  let dfs = function(root, path) {
    if (!root) return;
    if (!root.left && !root.right) {
      path += root.val;
      result.push(path);
    }
    else {
      path += root.val + ',';
      dfs(root.left, path);
      dfs(root.right, path);
    }
  }
  
  let result = [];
  dfs(root, '');
  // return result;  // 忘记把字符串转换回数组了...
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].split(',');
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] -= 0;  // 将字符串转换为数字
    }
  }
  let result2 = [];
  for (let e of result) {
    let sum = 0;
    for (let k of e) {
      sum += k;
    }
    if (sum === targetSum) result2.push(e);
  }
  return result2;
}

/* 自己重新思考后写的   dfs() 函数的参数改成数组，使用 pop() 实现回溯（用字符串还要再处理，太麻烦了）   改为深拷贝后通过
  特别注意数组的深拷贝！
*/
var pathSum = function(root, targetSum) {
  let dfs = function(root, curSum, path) {
    if (!root) return;
    path.push(root.val);
    if (!root.left && !root.right) {
      if (curSum + root.val === targetSum) {
        // allPaths.push(path);
        // 注意 path 是数组的引用！这里相当于把数组的引用 push 到 allPaths 中了，因此 allPaths 中已经存在的元素会被改变！
        allPaths.push(path.slice());
      }
      path.pop();
      return;
    }
    dfs(root.left, curSum + root.val, path);
    dfs(root.right, curSum + root.val, path);
    path.pop();
  }

  let allPaths = [];
  dfs(root, 0, []);
  return allPaths;
}

/* 答案    和我重新思考后写的差不多，注意 slice() 深拷贝！   见评论区
  参考：https://leetcode-cn.com/problems/path-sum-ii/solution/javascript-hui-su-xiang-jin-zhu-shi-by-jsliang-7/
*/
const pathSum = (root, sum) => {
  const result = [];

  const recursion = (root, path, treeSum) => {
    if (!root) return;
    path.push(root.val);
    treeSum += root.val;
    if (!root.left && !root.right) {
      if (treeSum === sum) {
        result.push(path.slice());
      }
    } else {
      recursion(root.left, path, treeSum);
      recursion(root.right, path, treeSum);
    }
    path.pop();
  };

  recursion(root, [], 0);
  return result;
};
