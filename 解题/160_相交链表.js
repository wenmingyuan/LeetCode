function ListNode(val) {
  this.val = val;
  this.next = null;
}


/* 自己的解法 空间复杂度 O(n) 和答案一样
  思路：
    遍历某一条链表，将它的所有结点都存储到 Set 中
    然后遍历另一条链表，每到一个结点就判断一下它是否在 Set 里
      若遇到某结点在 Set 中，返回该结点
    若遍历完了也没有结点在 Set 中，返回 null
*/
var getIntersectionNode = function(headA, headB) {
  let set = new Set();
  while (headA) {
    set.add(headA);
    headA = headA.next;  // 忘写这句了，犯了低级错误...
  }
  while (headB) {
    if (set.has(headB)) return headB;
    headB = headB.next;
  }
  return null;
}


/* 自己想的 O(1) 的方法  通过了  但是相比与答案，我的方法要花费更多时间
  思路简而言之：先获得 2 条链表各自的长度，然后计算长度差 m - n，让指向更长链表的第一个结点的指针 a 先走 m - n 步，
           然后这时指向另一条链表的第一个结点的指针 b 和 a 同时向后移动，当它们相等时，就是相交节点。
  具体流程：
    分别遍历 2 条链表，记录下它们的结点数目 m 和 n，并保存它们的最后一个结点的引用
    判断 2 条链表的最后一个结点是否相同
      若不同，则返回 null（没有交点）
      若相同，则
        令指针 a 指向链表 A 的第一个结点
        令指针 b 指向链表 B 的第一个结点
        若 m >= n，则 a 向后移动 m - n 个位置
        若 m < n，则 b 向后移动 n - m 个位置
        只要 a !== b，循环：
          a 向后移动
          b 向后移动
        返回 a
*/
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null;

  let a = new ListNode(0), b = new ListNode(0);
  a.next = headA;
  b.next = headB;
  let m = 0, n = 0;
  while (a.next) {
    a = a.next;
    m++;
  }
  while (b.next) {
    b = b.next;
    n++;
  }
  if (a !== b) return null;

  a = headA;
  b = headB;
  if (m >= n) {
    for (let i = 0; i < m - n; i++) a = a.next;
  }
  else {
    for (let i = 0; i < n - m; i++) b = b.next;
  }
  while (a !== b) {
    a = a.next;
    b = b.next;
  }
  return a;
}


/* 答案的 O(1)方法 思路简洁了很多，但不太容易想到
  主要思路是：
    a 和 b 分别指向链表 A 和链表 B 的第一个结点，让它们同时向后移动
    当 a 或 b 指向 null 时，这个指针要去指向另一条链的第一个结点
    两个指针继续向后移动
    当 b 或 a 指向空时，这个指针要去指向另一条链的第一个结点
    两个指针继续向后移动
    当 a 和 b 相等时，它们指向的结点就是相交节点
    若 a 和 b 都指向 null，则两条链没有交点
  思路参考：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/intersection-of-two-linked-lists-shuang-zhi-zhen-l/
  代码参考：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/xiang-jiao-lian-biao-by-leetcode-solutio-a8jn/
*/
var getIntersectionNode = function(headA, headB) {
  if (headA === null || headB === null) {
      return null;
  }
  let pA = headA, pB = headB;
  while (pA !== pB) {
      pA = pA === null ? headB : pA.next;
      pB = pB === null ? headA : pB.next;
  }
  return pA;
}


/* 自己大概理解答案的思路后写的 改成和答案一样了 */
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null;
  let a = headA, b = headB;
  while (a !== b) {
    // 我写麻烦了，用 if else 就不用这么麻烦了
    // if (a) a = a.next;
    // if (b) b = b.next;
    // if (!a && !b) return null;  // 我想着如果 2 条链不相交会出现死循环，所以加了这句
    // if (!a) a = headB;
    // if (!b) b = headA;
    // 下面是正确的写法，也可以写成答案中三元表达式的形式
    if (a) a = a.next;
    else a = headB;
    if (b) b = b.next;
    else b = headA;
  }
  return a;
}
