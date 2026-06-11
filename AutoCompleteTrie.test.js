const Trie = require("./AutoCompleteTrie");

test("addWord", () => {
  const root = new Trie(" ");
  root.addWord("dad");
  expect(root.children.has("d")).toBeTruthy();
  expect(root.children.get("d").children.has("a")).toBeTruthy();
  expect(
    root.children.get("d").children.get("a").children.get("d").endOfWord,
  ).toBeTruthy();
  expect(
    root.children
      .get("d")
      .children.get("a")
      .children.get("d")
      .children.has("a"),
  ).toBeFalsy();
});

test("findWord", () => {
  const root = new Trie(" ");
  root.addWord("dad");

  expect(root.findWord("dad")).toBeTruthy();
  expect(root.findWord("daddy")).toBeFalsy();
});

test("_getRemainingTree", () => {
  const root = new Trie(" ");
  root.addWord("dad");
  root.addWord("day");

  const subtree = root._getRemainingTree("da", root);

  expect(subtree).not.toBeNull();
  expect(subtree.value).toBe("a");
  expect(subtree.children.has("d")).toBeTruthy();
  expect(subtree.children.has("y")).toBeTruthy();
});

test("_allWordsHelper", () => {
  const root = new Trie(" ");
  root.addWord("dad");
  root.addWord("day");

  const words = root._allWordsHelper("", root, []);

  expect(words).toContain("dad");
  expect(words).toContain("day");
  expect(words).toHaveLength(2);
});

test("predictWords returns completions for a prefix", () => {
  const root = new Trie(" ");
  root.addWord("dad");
  root.addWord("day");
  root.addWord("dazzle");

  const completions = root.predictWords("da");

  expect(completions).toContain("dad");
  expect(completions).toContain("day");
  expect(completions).toContain("dazzle");
  expect(completions).toHaveLength(3);
});

test("Integration tests", () => {
  const root = new Trie(" ");
  root.addWord("that");
  root.addWord("their");
  root.addWord("there");
  root.addWord("this");
  root.addWord("does");
  root.addWord("did");

  expect(root.findWord("did")).toBeTruthy();
  expect(root.findWord("didi")).toBeFalsy();

  const prediction = root.predictWords("th");

  expect(prediction.length).toBe(4);
  expect(prediction).toContain("this");
});
