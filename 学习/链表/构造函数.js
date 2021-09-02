class Person {
  constructor(name) {
    this.name = name || null;
  }
}

let p1 = new Person('Tom');
console.log(p1.name);

let p2 = new Person();
console.log(p2.name);