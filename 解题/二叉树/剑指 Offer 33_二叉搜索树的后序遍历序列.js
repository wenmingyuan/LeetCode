// https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/

/* 自己的思路       为节省时间，直接看答案了
    将后序序列升序排序，得到中序序列
    根据后序序列的最后一个元素（根结点），找到中序序列中根结点的位置
    将中序序列划分为左、右子树
    将后序序列划分为左、右子树
    分别比较中序和后序的左、右子树的元素能否对应上（把后序序列放到 Set 中，遍历中序序列的元素，查找其是否在 Set 中）
      若能对应上，则递归处理左、右子树
      否则，返回 false
*/

/* 答案    比我的思路简单很多
  思路：
    由于后序序列的顺序是：左 右 根
    并且二叉搜索树满足：左子树的所有结点值 < 根结点的值 < 右子树的所有结点值
    因此，在后序序列中，比较当前元素与根结点的大小关系，即可确定该元素是在左子树还是右子树

  具体做法：
    从左到右依次遍历后序序列的元素
      若当前元素 > 根结点，则停止遍历
      检查 该结点与根结点之间的所有结点是否都 < 根结点（如果是二叉搜索树，就应该满足这个条件，否则，就不是二叉搜索树）
        若不满足该条件，则返回 false
        若满足该条件，则递归处理左、右子树

    例如序列为 [1, 4, 2, 3]，从左往右遍历
      1 < 3，继续遍历
      4 > 3，停止遍历
      检查 4 和 3 之间的所有结点是否都 > 3
        发现 2 < 3，返回 false

  这道题的关键：回归二叉搜索树的定义
  https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/solution/di-gui-he-zhan-liang-chong-fang-shi-jie-jue-zui-ha/
*/
var verifyPostorder = function(postorder) {
  let helper = function(start, end) {
    if (start >= end) return true;  // 等于的时候只有一个元素，直接返回 true

    // 找到右子树起始位置
    let rStart = start;
    let rootVal = postorder[end];
    while (postorder[rStart] < rootVal) {
      rStart++;
    }

    // 判断右子树的元素是否都大于根结点
    let tmp = rStart;
    while (tmp < end) {
      tmp++;
      if (postorder[tmp] < rootVal) {
        return false;
      }
    }

    // 递归左、右子树
    return helper(start, rStart - 1) && helper(rStart, end - 1);
  }

  return helper(0, postorder.length - 1);
};

/* 理解答案后写的     和答案一样，一开始写错了 */
var verifyPostorder = function(postorder) {
  let helper = function(start, end) {
    if (start >= end) return true;
    
    let rStart = start;
    while (postorder[rStart] < postorder[end]) {
      rStart++;
    }
    
    let tmp = rStart;
    while (tmp < end) {
      tmp++;
      if (postorder[tmp] < postorder[end]) {
        return false;
      }
    }

    // return helper(start, rStart - 1) && helper(rStart, end);  // 写错了
    return helper(start, rStart - 1) && helper(rStart, end - 1);
  }

  // return helper(0, postorder.length);  // 写错了
  return helper(0, postorder.length - 1);
}
