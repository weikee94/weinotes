// --- Directions
// 1) Create a node class.  The constructor
// should accept an argument that gets assigned
// to the data property and initialize an
// empty array for storing children. The node
// class should have methods 'add' and 'remove'.
// 2) Create a tree class. The tree constructor
// should initialize a 'root' property to null.
// 3) Implement 'traverseBF' and 'traverseDF'
// on the tree class.  Each method should accept a
// function that gets called with each element in the tree

class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  add(data) {
    this.children.push(new Node(data));
  }

  remove(data) {
    this.children = this.children.filter((val) => val.data !== data);
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  // traverseBF
  //     a
  //   b   c
  // d

  // a, b, c, d
  // 技巧是先 defined arr = [a]
  // while arr.length
  // 把a shift出來同時把 b c 同時加進 arr
  // 此時 arr = [b, c]
  // 然後回到 while
  // 把b shift出來同時把 d 加進 arr
  // arr = [c, d]
  // 以此類推

  traverseBF(fn) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();
      arr.push(...node.children);
      fn(node);
    }
  }

  // traverseDF
  //     a
  //   b   c
  // d

  // a, b, d, c
  // 與BF 不同的是 BF 是在加arr 後面
  // DF 是加在 arr 前面

  traverseDF(fn) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();
      arr.unshift(...node.children);
      fn(node);
    }
  }
}

module.exports = { Tree, Node };
