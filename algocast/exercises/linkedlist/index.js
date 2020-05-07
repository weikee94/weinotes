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
}

module.exports = { Node, LinkedList };
