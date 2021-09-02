// 结点类
function Node(val) {
  this.val = val;
  this.next = null;
}

// 链表类
function LinkedList() {
  this.head = null;
  this.append = append;  // 在链表末尾添加结点
  this.find = find;      // 查找具有某个值的结点
  this.insert = insert;  // 在某个结点的后面插入新结点
  this.remove = remove;  // 删除具有某个值的结点
  this.show = show;      // 打印链表
}

// 在链表末尾添加结点
function append(val) {
  let node = new Node(val);
  // 单独考虑没有头结点的情况
  if (this.head === null) this.head = node;
  else {
    let cur = this.head;
    while (cur.next !== null) cur = cur.next;
    cur.next = node;
    // 一开始我是这么写的：
    // while (cur !== null) cur = cur.next;
    // cur = node;
    // 最后一个结点本来指向空，我想让它指向 node，发现这样写没有效果
    // 原因应该是这样：
    //   假设有一个结点不为空，cur 指向这个结点
    //   那么可以用 cur.val = xxx 修改结点的值，可以用 cur.next = xxx 改变该结点的下一结点
    //   但是不能用 cur = node 改变该结点的下一结点
    //   感觉 cur 和 cur.val 很像C语言指针 p 和 *p 的区别
    //   可以参考 https://www.cnblogs.com/html55/p/9765636.html
    // 所以需要改成 cur.next = node
  }
}

// 查找具有某个值的结点
function find(val) {
  let cur = this.head;
  while (cur !== null && cur.val !== val) cur = cur.next;
  return cur;
}

// 在某个结点的后面插入新结点
function insert(val, newVal) {
  // 这里网上教程是直接调用 find，但是我调用就报错
  // 感觉是因为在 insert()中调用 find()，导致 find()中的 this 指向有问题
  // 把 find() 再在 insert() 里写一遍就不报错了
  // -------------------------------------------------------------------
  // let cur = find(val);
  // -------------------------------------------------------------------
  let cur = this.head;
  while (cur !== null && cur.val !== val) cur = cur.next;
  if (cur === null) return false;
  else {
    let node = new Node(newVal);
    node.next = cur.next;
    cur.next = node;
    return true;
  }
}

// 删除具有某个值的结点
function remove(val) {
  let pre = this.head;
  // 没有头结点 或者 只有一个结点但值不对
  if (pre === null || (pre.next === null && pre.val != val)) return false;
  // 删除头结点
  else if (pre.val === val) {
    this.head = pre.next;
    return true;
  }
  // 有多个结点 并且 不删除头结点
  else {
    let cur = pre.next;
    while (cur !== null && cur.val !== val) {
      pre = cur;
      cur = cur.next;
    };
    // 没找到匹配的结点
    if (cur === null) return false;
    // 找到了匹配的结点
    else {
      pre.next = cur.next;
      return true;
    }
  }
}

// 打印链表
function show() {
  let str = '';
  let cur = this.head;
  while (cur !== null) {
    str = str + '--->' +  cur.val;
    cur = cur.next;
  }
  console.log(str);
}

// 测试
// ---------------------------------
let ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.show();

// ll.remove(1)
// ll.show()