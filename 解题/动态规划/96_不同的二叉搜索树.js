// https://leetcode-cn.com/problems/unique-binary-search-trees/

/* 自己的解法    普通的递归      通过    但时间复杂度太高   执行用时 3708 ms... 
  思路：
    这道题相当于给定中序序列为从 1 到 n，问一共能创建多少棵二叉树
    为了方便描述，将要求的函数命名为 f(n)
    为了求得 f(n) 的结果，需要先选择根结点，然后再分别计算左、右子树的 f(x)   x 表示结点数
    可以得到 f(n) = f(0)·f(n - 1) + f(1)·f(n - 2) + ··· + f(n - 1)·f(0)
    这个式子可以用递归求得结果
    终止条件：f(0) = 1, f(1) = 1

*/
var numTrees = function(n) {
  if (n === 0 || n === 1) return 1;

  let result = 0;
  for (let i = 0; i < n; i++) {
    result += numTrees(i) * numTrees(n - 1 - i);
  }
  return result;
};

/*  答案    递归 + 记忆化    避免了重复计算    执行用时 64 ms
  https://leetcode-cn.com/problems/unique-binary-search-trees/solution/bu-tong-de-er-cha-sou-suo-shu-cong-yuan-shi-de-di-/
  https://leetcode-cn.com/problems/unique-binary-search-trees/solution/shou-hua-tu-jie-san-chong-xie-fa-dp-di-gui-ji-yi-h/
*/
const numTrees = (n) => {
  const helper = (n) => {
    if (n == 0 || n == 1) return 1;
    if (memo[n]) return memo[n];  // 查找是否已计算过
    
    let result = 0;
    for (let i = 0; i <= n - 1; i++) {
      result += helper(i) * helper(n - 1 - i);
    }
    memo[n] = result;  // 将结果加入备忘录
    return result;
  };

  const memo = new Array(n + 1);  // 创建备忘录，记录从 0 到 n 的结果
  return helper(n);
};

/* 答案    动态规划    暂时没研究
  还是参考上面 2 个题解
*/
const numTrees = (n) => {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= i - 1; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
};
