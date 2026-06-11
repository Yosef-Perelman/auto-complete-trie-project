const Trie = require("./AutoCompleteTrie");

test("addWord", () => {
  const root = new Trie(" ");
  root.addWord("dad");
  console.log(JSON.stringify(root, null, 2));
  expect(root).toBeTruthy();
});

test("findWord", () => {
  const root = new Trie(" ");
  root.addWord("dad");

  expect(root.findWord("dad")).toBeTruthy();
  expect(root.findWord("daddy")).toBeFalsy();
});
