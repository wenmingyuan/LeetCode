function Node(val) {
  this.val = val;
  this.next = null;
}

// -------------------------------------------------

// let node1 = new Node(1);
// node1.next = new Node(2);
// let cur = node1.next;

// cur.val = 3;
// console.log(cur === node1.next);  // true

// console.log(cur.val);  // 3
// console.log(node1.next.val);  // 3

// -------------------------------------------------

let node1 = new Node(1);
node1.next = new Node(2);
let cur = node1.next;

let node = new Node(3);
cur = node;
console.log(cur === node1.next);  // false

console.log(cur.val);  // 3
console.log(node1.next.val);  // 2

// -------------------------------------------------

// let node1 = new Node(1);
// let cur = node1.next;

// let node = new Node(3);
// cur = node;
// console.log(cur === node1.next);  // false

// console.log(cur.val);  // 3
// console.log(node1.next);  // null