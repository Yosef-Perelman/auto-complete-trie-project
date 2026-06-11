const Trie = require("./AutoCompleteTrie");
const { showWelcome, showCommandsList, processCommand } = require("./consoleInterface");

describe("showWelcome", () => {
  test("logs welcome banner", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    showWelcome();
    expect(spy).toHaveBeenCalledWith("=== AutoComplete Trie Console ===");
    spy.mockRestore();
  });
});

describe("showCommandsList", () => {
  test("logs all five commands plus header", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    showCommandsList();
    expect(spy).toHaveBeenCalledTimes(6);
    expect(spy).toHaveBeenCalledWith("Available commands:");
    spy.mockRestore();
  });
});

describe("processCommand", () => {
  let root;
  let mockRl;

  beforeEach(() => {
    root = new Trie(" ");
    mockRl = { close: jest.fn() };
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("empty input logs retry message", () => {
    processCommand("", root, mockRl);
    expect(console.log).toHaveBeenCalledWith("Try typing again: ");
  });

  test("add command inserts word into trie", () => {
    processCommand("add hello", root, mockRl);
    expect(root.findWord("hello")).toBeTruthy();
    expect(console.log).toHaveBeenCalledWith("✓ Added 'hello' to dictionary");
  });

  test("add command is case-insensitive (cmd)", () => {
    processCommand("ADD world", root, mockRl);
    expect(root.findWord("world")).toBeTruthy();
  });

  test("find command confirms word exists", () => {
    root.addWord("hello");
    processCommand("find hello", root, mockRl);
    expect(console.log).toHaveBeenCalledWith("✓ 'hello' exists in dictionary");
  });

  test("find command reports missing word", () => {
    processCommand("find hello", root, mockRl);
    expect(console.log).toHaveBeenCalledWith("✓ 'hello' don't exists in dictionary");
  });

  test("complete command returns matching suggestions", () => {
    root.addWord("hello");
    root.addWord("help");
    root.addWord("world");
    processCommand("complete hel", root, mockRl);
    expect(console.log).toHaveBeenCalledWith("Suggestions for 'hel': hello, help");
  });

  test("complete command returns empty list when no match", () => {
    processCommand("complete xyz", root, mockRl);
    expect(console.log).toHaveBeenCalledWith("Suggestions for 'xyz': ");
  });

  test("help command prints the commands list", () => {
    processCommand("help", root, mockRl);
    expect(console.log).toHaveBeenCalledWith("Available commands:");
  });

  test("exit command closes readline", () => {
    processCommand("exit", root, mockRl);
    expect(mockRl.close).toHaveBeenCalledTimes(1);
  });

  test("unknown command does nothing", () => {
    processCommand("foobar", root, mockRl);
    expect(console.log).not.toHaveBeenCalled();
    expect(mockRl.close).not.toHaveBeenCalled();
  });
});
