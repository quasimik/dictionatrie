"use strict";

const fs = require("fs");
const wordListPath = __dirname + "/yawl.txt";

class Node {
  constructor(parent, boundary) {
    this.parent = parent || null;
    this.boundary = boundary || false;
    this.children = new Map();
  }
}

class Dictionary {

  constructor(words_param) {
    this.rootNode = new Node();
    var words = words_param || fs.readFileSync(wordListPath, "utf8").split("\n");
    for (var i = 0; i < words.length; i++) {
      this.insertWord(words[i], this.rootNode);
    };
  }

  insertWord(wordFragment, node) {
    if (wordFragment.length === 0) {
      node.boundary = true;
      return;
    }
    var nextNode = node.children.get(wordFragment[0]);
    if (nextNode === undefined) {
      var newNode = new Node(node);
      node.children.set(wordFragment[0], newNode);
      nextNode = newNode;
    }
    this.insertWord(wordFragment.slice(1), nextNode);
  }

  has(wordFragment, partial_param, node_param) {
    var node = node_param || this.rootNode;
    var partial = partial_param || false;
    if (wordFragment.length === 0) {
      if (partial || node.boundary) return true;
      return false;
    }
    var nextNode = node.children.get(wordFragment[0]);
    if (nextNode === undefined) return false;
    return this.has(wordFragment.slice(1), partial, nextNode);
  }
}

module.exports = Dictionary
