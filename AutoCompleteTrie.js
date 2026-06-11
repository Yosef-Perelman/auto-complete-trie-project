class AutoCompleteTrie {
  constructor(value, endOfWord) {
    this.value = this.value;
    this.endOfWord = endOfWord;
  }

  addWord(word) {}

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
