class AutoCompleteTrie {
  constructor(value, endOfWord = false) {
    this.value = value;
    this.endOfWord = endOfWord;
    this.children = new Map();
  }

  addWord(word) {
    word = word.toLowerCase();
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
    word = word.toLowerCase();
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

  predictWords(prefix) {
    prefix = prefix.toLowerCase();
    const subTree = this._getRemainingTree(prefix, this);
    if (!subTree) {
      return [];
    }

    const allWords = this._allWordsHelper("", subTree, []);
    return allWords.map((word) => prefix + word);
  }

  _getRemainingTree(prefix, node) {
    if (!prefix) {
      return node;
    }

    const [first, ...rest] = prefix;
    const restWord = rest.join("");
    const child = node.children.get(first);

    if (!child) {
      return null;
    }

    return this._getRemainingTree(restWord, child);
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
