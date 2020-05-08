// --- Directions
// Implement classes Node and Linked Lists
// See 'directions' document

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(val) {
    const newNode = new Node(val, this.head);
    this.head = newNode;
  }

  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) {
      return null;
    }
    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) {
      return;
    }
    let node = this.head.next;
    this.head = node;
  }

  removeLast() {
    let node = this.head;
    if (!this.head) {
      return;
    }
    if (!this.head.next) {
      this.head = null;
      return;
    }
    while (node) {
      if (!node.next.next) {
        node.next = null;
        return node;
      }
      node = node.next;
    }
  }

  insertLast(val) {
    if (!this.head) {
      this.head = new Node(val);
    }
    let node = this.head;
    while (node) {
      if (!node.next) {
        return (node.next = new Node(val));
      }
      node = node.next;
    }
  }

  getAt(index) {
    let node = this.head;
    let counter = 0;
    while (node) {
      node = node.next;

      if (counter === index) {
        return node;
      }

      counter++;
    }
    return null;
  }

  removeAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let previous = this.getAt(index - 1);
    if (!previous || !previous.next) {
      // handling remove index which is out of range
      return;
    }
    let node = this.head;
    let current = 0;
    while (node) {
      if (current === index) {
        return (previous.next = previous.next.next);
      }
      current++;
      node = node.next;
    }
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    let previous = this.getAt(index - 1);
    if (!previous || !previous.next) {
      let node = this.getLast();
      return (node.next = new Node(data));
    }
    let node = new Node(data, previous.next);
    previous.next = node;
  }

  forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      // 循環在這裏發生
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}

module.exports = { Node, LinkedList };
