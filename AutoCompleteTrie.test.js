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
