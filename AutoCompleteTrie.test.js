const Trie = require("./AutoCompleteTrie");

const root = new Trie(" ");
console.log(root);

test("addWord", () => {
  root.addWord("dad");
  console.log(root);
  expect(root).toBeTruthy();
});

// describe("Trie", () => {
//   test("addWord", () => {
//     const root = new Trie(" ");
//     root.addWord("dad");
//     expect(root).toBeTruthy();
//   });
// });
