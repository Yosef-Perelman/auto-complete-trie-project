import Trie from "./AutoCompleteTrie.js";

const root = new Trie(" ");
let numOfWords = 0;

const addButton = document.getElementById("addButton");
const wordInput = document.getElementById("wordInput");
const sugInput = document.getElementById("sugInput");
const wordsNumber = document.getElementById("number");
const addedMessage = document.getElementById("addedMessage");
const suggestionsList = document.getElementById("suggestionsList");
const list = document.getElementById("list");

addButton.addEventListener("click", () => {
  const word = wordInput.value.trim();

  if (!word) {
    addedMessage.textContent = `Cannot add empty word`;
    addedMessage.style.display = "block";
  } else if (root.findWord(word)) {
    addedMessage.textContent = `The word already in the dictionary`;
    addedMessage.style.display = "block";
  } else {
    root.addWord(word);

    console.log(`✓ Added '${word}' to dictionary`);

    wordsNumber.textContent = ++numOfWords;

    // Show success message
    addedMessage.textContent = `✓ Added '${word}' to dictionary`;
    addedMessage.style.display = "block";
  }

  // Clear input
  wordInput.value = "";

  // Hide message after 10 seconds
  setTimeout(() => {
    addedMessage.style.display = "none";
  }, 10000);
});

sugInput.addEventListener("input", () => {
  list.replaceChildren();

  const text = sugInput.value.trim();

  if (!text) {
    suggestionsList.classList.remove("open");
    return;
  }

  const completions = root.predictWords(text);

  if (completions.length === 0) {
    suggestionsList.classList.remove("open");
    return;
  }

  for (const word of completions) {
    const li = document.createElement("li");

    li.innerHTML =
      `<span class="highlight">${text}</span>` + word.slice(text.length);

    li.addEventListener("click", () => {
      sugInput.value = word;
      suggestionsList.classList.remove("open");
    });

    list.appendChild(li);
  }

  suggestionsList.classList.add("open");
});
