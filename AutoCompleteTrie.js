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

  completePrefix(arg) {}

  _getRemainingTree(prefix, node) {
    if (!prefix) {
      return this;
    } else {
      return _getRemainingTree(prefix.slice(1), node);
    }
  }

  _allWordsHelper(prefix, node, allWords) {}
}

module.exports = AutoCompleteTrie;
