class AutoCompleteTrie {
  constructor(value, endOfWord = false) {
    this.value = value;
    this.endOfWord = endOfWord;
    this.children = new Map();
  }

  addWord(word) {
    let [first, ...rest] = word;
    rest = rest.join("");

    if (!this.children.has(first)) {
      this.children.set(first, new AutoCompleteTrie(first));
    }

    if (!rest) {
      this.children.get(first).endOfWord = true;
    } else {
      this.children.get(first).addWord(rest);
    }
  }

  findWord(word) {
    if (word.length === 0) {
      return this.endOfWord;
    }

    let [first, ...rest] = word;
    rest = rest.join("");

    if (this.children.has(first)) {
      return this.children.get(first).findWord(rest);
    } else {
      return false;
    }
  }

  predictWords(prefix) {}

  _getRemainingTree(prefix, node) {
    if (!prefix) {
      return this;
    }

    let [first, ...rest] = word;
    rest = rest.join("");

    return _getRemainingTree(rest, this.children.get(first));
  }

  _allWordsHelper(prefix, node, allWords) {
    if (!node) return allWords;

    if (node.endOfWord) {
      allWords.push(prefix);
    }

    for (const child of node.children.values()) {
      this._allWordsHelper(prefix + child.value, child, allWords);
    }

    return allWords;
  }
}

module.exports = AutoCompleteTrie;
