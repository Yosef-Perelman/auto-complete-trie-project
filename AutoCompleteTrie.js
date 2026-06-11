class AutoCompleteTrie {
  constructor(value, endOfWord = false) {
    this.value = value;
    this.children = new Map();
    this.endOfWord = endOfWord;
  }

  addWord(word) {
    let [first, ...rest] = word;
    rest = rest.join("");
    if (!this.children.has(first)) {
      this.children[first] = new AutoCompleteTrie(first);
    }
    if (!rest) {
      this.children[first].endOfWord = true;
    } else {
      this.children[first].addWord(rest);
    }
  }

  findWord(word) {}

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
