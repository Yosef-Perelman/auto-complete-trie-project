const readline = require("readline");
const trie = require("./AutoCompleteTrie");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showWelcome() {
  console.log("=== AutoComplete Trie Console ===");
}

function showCommandsList() {
  console.log("Available commands:");
  console.log(" add <word>      - Add a word to the dictionary");
  console.log(" find <word>     - Check if word exists");
  console.log(" complete <pref> - Show all completions for prefix");
  console.log(" help            - Show this help");
  console.log(" exit            - Quit the application");
}

showWelcome();
showCommandsList();

rl.on("line", (line) => {
  const line = input.trim();
  if (!line) {
    console.log("Try typing again: ");
  }
  const [cmd, ...rest] = line.split(/\s+/);
  switch (cmd.toLowerCase()) {
    case add:
      console.log(trie.addWord(arg));
      break;
    case find:
      console.log(trie.findWord(arg));
      break;
    case complete:
      console.log(trie.completePrefix(arg));
      break;
    case help:
      showCommandsList();
      break;
    case exit:
      rl.close();
      break;
    default:
      break;
  }
  console.log("Type again: ");
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
