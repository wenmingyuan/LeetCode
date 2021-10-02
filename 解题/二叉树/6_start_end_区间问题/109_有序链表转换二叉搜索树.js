// https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路     想到 2 种方法     直接看答案了
    自己想的方法1：把链表转换成数组，然后就和 108 题一样了 
    自己想的方法2：快慢指针，从中间断开链表，但是感觉很麻烦 
*/

// -------------------------------------------------------------------------------------------------------------

/* 自己写的方法1    通过    和答案方法1一样     时间复杂度 O(n) 
  https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/shou-hua-tu-jie-san-chong-jie-fa-jie-zhu-shu-zu-ku/
*/
var sortedListToBST = function(head) {
  let helper = function(start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let leftRoot = helper(start, mid - 1);
    let rightRoot = helper(mid + 1, end);
    let root = new TreeNode(arr[mid], leftRoot, rightRoot);

    return root;
  }

  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  return helper(0, arr.length -1);
}

// -------------------------------------------------------------------------------------------------------------

/* 答案     和我想的方法2一样     但感觉容易写错，下面不截断链表的方法更容易理解     时间复杂度 O(nlogn)
  还是参考上面的题解
*/
const sortedListToBST = (head) => {
  if (head == null) return null;

  let slow = head;
  let fast = head;
  let preSlow; // 保存slow的前一个节点

  while (fast && fast.next) {
    preSlow = slow;        // 保存当前slow
    slow = slow.next;      // slow走一步
    fast = fast.next.next; // fast走两步
  }

  const root = new TreeNode(slow.val);     // 根据slow指向的节点值，构建节点
  if (preSlow != null) {   // 如果preSlow有值，即slow左边有节点，需要构建左子树
    preSlow.next = null;   // 切断preSlow和中点slow
    root.left = sortedListToBST(head);     // 递归构建左子树
  }
  root.right = sortedListToBST(slow.next); // 递归构建右子树

  return root;
};

// -------------------------------------------------------------------------------------------------------------

/* 答案     类似方法2，但不截断链表     核心代码和数组创建二叉搜索树很像，只不过后者用数组下标表示区间，而前者用指针表示区间

  注意 start 和 end 是左闭右开！这个很关键！
    没有选择左右都闭是因为链表很难访问前一结点，而数组可以很方便地通过将下标 - 1 就得到前一元素
    比如左子树的区间用左闭右开表示：[start, mid)，用左右都闭表示：[start, mid 的前一结点]，访问 mid 的前一结点还需要再定义一个指针，很麻烦
    右子树的区间用左闭右开表示：[mid.next, end)，这让初始区间能够很方便地表示：[head, null)
  注意左闭右开和左右都闭的写法的区别之处：
    1. if (start === end) 条件用 === 还是 >
    2. 递归左右子树时输入的区间
    3. 初始区间的右端点

  另外需要自己写一个获取链表从 start 到 end 的中间结点的方法 getMid()

  时间复杂度 O(nlogn) 
  https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/you-xu-lian-biao-zhuan-huan-er-cha-sou-suo-shu-1-3/
*/
var sortedListToBST = function(head) {
  return buildTree(head, null);  // 左闭右开
}
var buildTree = function(start, end) {
  if (start === end) return null;  // 左闭右开，判断条件是 ===，不是 >
  
  let mid = getMid(start, end);  // 使用快慢指针方法获取链表的中间结点

  let root = new TreeNode(mid.val);
  root.left = buildTree(start, mid);  // 左闭右开
  root.right = buildTree(mid.next, end);  // 左闭右开
  
  return root;
}
var getMid = function(start, end) {  // 快慢指针找链表中间结点见 876 题，这里就是把 null 换成了 end
  let slow = start, fast = start;
  while (fast !== end && fast.next !== end) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;  // 若有 2 个中间结点，返回的是后一个结点，详见 876 题里我写的注释
}

/* 理解答案后自己写的    注意左闭右开   和答案一样 */
var sortedListToBST = function(head) {
  let helper = function(start, end) {
    if (start === end) return null;

    let mid = getMid(start, end);

    let leftRoot = helper(start, mid);
    let rightRoot = helper(mid.next, end);
    let root = new TreeNode(mid.val, leftRoot, rightRoot);

    return root;
  }

  let getMid = function(start, end) {
    let slow = start, fast = start;
    while (fast !== end && fast.next !== end) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  return helper(head, null);
}

// -------------------------------------------------------------------------------------------------------------

/* 答案    方法3    时间复杂度 O(n)
  结合了官方题解和笨猪爆破组的代码，主要参考官方题解，官方题解更容易理解

  思路：
  给定一个索引，用链表访问该索引处的元素显然比数组访问元素慢得多，因此每次获取链表中间结点的值的做法时间复杂度高
  
  为了优化时间复杂度，不应每次都去获取链表中间结点的值，而应按照链表的遍历顺序去构造二叉搜索树
  而链表的遍历顺序就是二叉搜索树的中序遍历顺序
  因此，需要将二叉搜索树结点赋值的顺序从前序或后序（答案一般是前序，我习惯用后序）改变成中序！！！

  108 题我的写法，我习惯用后序：
    let leftRoot = helper(start, mid - 1);
    let rightRoot = helper(mid + 1, end);
    let root = new TreeNode(nums[mid], leftRoot, rightRoot);

  108 题答案，赋值顺序是前序：
    let root = new TreeNode(nums[mid]);
    root.left = helper(start, mid - 1);
    root.right = helper(mid + 1, end);

  为了将结点赋值顺序改为前序，需要修改代码为（对比答案代码）：
    let root = new TreeNode();  // 根结点仅占位
    root.left = helper(start, mid - 1);
    root.val = cur.val;  // 现在可以对根结点赋值，因为 cur 走到了根结点在链表中的位置
    cur = cur.next;
    root.right = helper(mid + 1, end);

  前面说了我们不需要获取链表中间结点的值，但是我们需要获取链表中间结点的索引，这就相当于把链表看作数组
  我们需要 mid（链表中间结点的索引）来划分左右子树
  因此，需要需要先求出链表的长度，然后将链表的第一个结点编号为 0。

  注意这里的区间为左右都闭

  https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/you-xu-lian-biao-zhuan-huan-er-cha-sou-suo-shu-1-3/
  https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/shou-hua-tu-jie-san-chong-jie-fa-jie-zhu-shu-zu-ku/
*/
let sortedListToBST = (head) => {
  let helper = (start, end) => {
    if (start > end) return null;  // 区间左右都闭

    let mid = Math.floor((start + end) / 2);

    let root = new TreeNode();  // 根结点暂时仅占位，还没法赋值
    root.left = helper(start, mid - 1);  // 左
    root.val = cur.val;  // 现在可以对根结点赋值，因为 cur 走到了根结点在链表中的位置
    cur = cur.next;
    root.right = helper(mid + 1, end);  // 右

    return root;
  };

  if (head == null) return null;
  let n = 0;  // 链表长度
  let cur = head;  // 备份链表第一个结点的指针
  while (head) {  // 计算链表长度
    n++;
    head = head.next;
  }
  return helper(0, n - 1);  // 将链表的第一个结点编号为 0
};

/* 大概理解答案后自己写的方法3     和答案一样 */
var sortedListToBST = function(head) {
  let helper = function(start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let root = new TreeNode();
    root.left = helper(start, mid - 1);
    root.val = cur.val;
    cur = cur.next;
    root.right = helper(mid + 1, end);

    return root;
  }

  let cur = head;
  let n = 0;
  while (head) {
    n++;
    head = head.next;
  }
  return helper(0, n - 1);
}
