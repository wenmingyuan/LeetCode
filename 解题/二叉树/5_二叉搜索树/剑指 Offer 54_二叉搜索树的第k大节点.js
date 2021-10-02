// https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/

/* 自己的思路    反向中序遍历，得到的序列是降序的，直接返回第 k 次访问的元素即可     通过 */
var kthLargest = function(root, k) {
  let dfs = function(root) {
    if (!root) return;

    dfs(root.right);
    count++;
    if (count === k) {
      result = root.val;
      return;
    }
    dfs(root.left);
  }

  let result, count = 0;
  dfs(root);
  return result;
};

/* 答案    思路和我一样，但是答案可以提前终止
  https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/solution/mian-shi-ti-54-er-cha-sou-suo-shu-de-di-k-da-jie-d/
*/
var kthLargest = function(root, k) {
  let dfs = function(root) {
    if (!root) return;

    dfs(root.right);
    if (k === 0) return;  // 提前终止
    if (--k === 0) result = root.val;  // 没有像我一样用 count 计数，而是直接修改 k，值得学习
    dfs(root.left);
  }

  let result;
  dfs(root);
  return result;
}

/* 借鉴答案，修改自己的代码，实现提前终止     通过 */
var kthLargest = function(root, k) {
  let dfs = function(root) {
    if (!root) return;

    dfs(root.right);
    // 原来自己写的代码
    // count++;
    // if (count === k) {
    //   result = root.val;
    //   return;
    // }
    if (count === k) return;
    count++;
    if (count === k) result = root.val;
    dfs(root.left);
  }

  let result, count = 0;
  dfs(root);
  return result;
};