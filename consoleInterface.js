const readline = require("readline");
const Trie = require("./AutoCompleteTrie");

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

function processCommand(line, root, rl) {
  if (!line) {
    console.log("Try typing again: ");
  }
  const [cmd, ...arg] = line.split(/\s+/);
  let word = arg[0];
  switch (cmd.toLowerCase()) {
    case "add": {
      root.addWord(word);
      console.log(`✓ Added '${word}' to dictionary`);
      break;
    }
    case "find": {
      if (root.findWord(word)) {
        console.log(`✓ '${word}' exists in dictionary`);
      } else {
        console.log(`✓ '${word}' don't exists in dictionary`);
      }
      break;
    }
    case "complete": {
      const completions = root.predictWords(word);
      console.log(`Suggestions for '${word}': ${completions.join(", ")}`);
      break;
    }
    case "help": {
      showCommandsList();
      break;
    }
    case "exit": {
      rl.close();
      break;
    }
    default:
      break;
  }
}

module.exports = { showWelcome, showCommandsList, processCommand };

if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  showWelcome();
  showCommandsList();
  rl.prompt();

  const root = new Trie(" ");

  rl.on("line", (input) => {
    const line = input.trim();
    processCommand(line, root, rl);
    rl.prompt();
  }).on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
  });
}
