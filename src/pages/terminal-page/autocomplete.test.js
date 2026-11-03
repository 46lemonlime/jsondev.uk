import { describe, it, expect } from "vitest";
import {
  getLongestCommonPrefix,
  getAutocompleteResult,
  PATH_AWARE_COMMANDS,
} from "./autocomplete";
import { createVirtualFs } from "./virtualFs";
import { ALLOWED_COMMANDS, INITIAL_SHELL_STATE } from "./commandEngine";

describe("autocomplete — Longest Common Prefix (getLongestCommonPrefix)", () => {
  it("returns empty string for empty array or no common prefix", () => {
    expect(getLongestCommonPrefix([])).toBe("");
    expect(getLongestCommonPrefix(["apple", "banana"])).toBe("");
  });

  it("returns full string if array has single item", () => {
    expect(getLongestCommonPrefix(["single"])).toBe("single");
  });

  it("finds correct longest common prefix for multiple strings", () => {
    expect(getLongestCommonPrefix(["project", "projects", "projectile"])).toBe("project");
    expect(getLongestCommonPrefix(["clear", "cd", "contact"])).toBe("c");
    expect(getLongestCommonPrefix(["poker-strategy-display.md", "portfolio-website.md"])).toBe("po");
  });
});

describe("autocomplete — Command Name Completion", () => {
  const fs = createVirtualFs();

  it("returns 'none' for empty or whitespace-only inputs", () => {
    expect(getAutocompleteResult("", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS)).toEqual({
      type: "none",
    });
    expect(getAutocompleteResult("   ", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS)).toEqual({
      type: "none",
    });
    expect(getAutocompleteResult(null, INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS)).toEqual({
      type: "none",
    });
  });

  it("completes unambiguous command uniquely and appends trailing space", () => {
    // "he" -> "help "
    const resHelp = getAutocompleteResult("he", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(resHelp).toEqual({
      type: "complete",
      newInput: "help ",
      candidates: ["help"],
    });

    // "tr" -> "tree "
    const resTree = getAutocompleteResult("tr", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(resTree).toEqual({
      type: "complete",
      newInput: "tree ",
      candidates: ["tree"],
    });

    // "wh" -> "whoami "
    const resWho = getAutocompleteResult("wh", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(resWho).toEqual({
      type: "complete",
      newInput: "whoami ",
      candidates: ["whoami"],
    });
  });

  it("preserves leading spaces during command completion", () => {
    const res = getAutocompleteResult("  he", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({
      type: "complete",
      newInput: "  help ",
      candidates: ["help"],
    });
  });

  it("returns 'multiple' when multiple commands share the exact typed prefix", () => {
    // "c" matches ["cd", "clear", "contact"] (common prefix is "c", no extension possible)
    const res = getAutocompleteResult("c", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res.type).toBe("multiple");
    expect(res.candidates).toEqual(["cd", "clear", "contact"]);
  });

  it("extends input to longest common prefix when multiple matches share more letters", () => {
    // Custom list with shared prefix
    const customCommands = ["show", "short", "shout"];
    const res = getAutocompleteResult("s", INITIAL_SHELL_STATE, fs, customCommands);
    expect(res).toEqual({
      type: "extend",
      newInput: "sho",
      candidates: ["short", "shout", "show"],
    });
  });

  it("returns 'none' when no registered command matches prefix", () => {
    const res = getAutocompleteResult("xyz", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({ type: "none" });
  });
});

describe("autocomplete — Filesystem Path Completion", () => {
  const fs = createVirtualFs();

  it("returns 'none' for commands that are not path-aware", () => {
    // "echo" is not in PATH_AWARE_COMMANDS
    const resEcho = getAutocompleteResult("echo pro", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(resEcho).toEqual({ type: "none" });

    // "help" is not path-aware
    const resHelp = getAutocompleteResult("help pro", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(resHelp).toEqual({ type: "none" });
  });

  it("returns 'none' if user is typing a flag instead of a path", () => {
    const res = getAutocompleteResult("ls -", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({ type: "none" });

    const resLa = getAutocompleteResult("ls -la", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(resLa).toEqual({ type: "none" });
  });

  it("completes unique directory for 'cd' appending trailing slash", () => {
    // In /home/guest, typing "cd ski" should complete to "cd skills/"
    const res = getAutocompleteResult("cd ski", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({
      type: "complete",
      newInput: "cd skills/",
      candidates: ["skills/"],
    });
  });

  it("restricts 'cd' completion strictly to directories (ignoring files)", () => {
    // In /home/guest, typing "cd REA" should NOT complete to README.md because it is a file
    const res = getAutocompleteResult("cd REA", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({ type: "none" });
  });

  it("allows 'ls' and 'tree' to complete both files and directories", () => {
    // "ls REA" should complete to "ls README.md"
    const res = getAutocompleteResult("ls REA", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({
      type: "complete",
      newInput: "ls README.md",
      candidates: ["README.md"],
    });
  });

  it("supports absolute path autocompletion", () => {
    // "ls /etc/h" should complete to "ls /etc/hostname"
    const res = getAutocompleteResult("ls /etc/h", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({
      type: "complete",
      newInput: "ls /etc/hostname",
      candidates: ["hostname"],
    });

    // "cd /ho" should complete to "cd /home/"
    const resHome = getAutocompleteResult("cd /ho", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(resHome).toEqual({
      type: "complete",
      newInput: "cd /home/",
      candidates: ["home/"],
    });
  });

  it("supports tilde (~) path autocompletion", () => {
    // "cd ~/ski" should complete to "cd ~/skills/"
    const res = getAutocompleteResult("cd ~/ski", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({
      type: "complete",
      newInput: "cd ~/skills/",
      candidates: ["skills/"],
    });
  });

  it("completes inside nested subdirectories", () => {
    // "ls skills/lan" should complete to "ls skills/languages.txt"
    const res = getAutocompleteResult("ls skills/lan", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({
      type: "complete",
      newInput: "ls skills/languages.txt",
      candidates: ["languages.txt"],
    });
  });

  it("supports hidden files when user explicitly types a leading dot", () => {
    // In /home/guest, ".b" should complete to ".bashrc"
    const res = getAutocompleteResult("ls .b", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    expect(res).toEqual({
      type: "complete",
      newInput: "ls .bashrc",
      candidates: [".bashrc"],
    });
  });

  it("does not show hidden files when user did not type a dot", () => {
    const res = getAutocompleteResult("ls ", INITIAL_SHELL_STATE, fs, ALLOWED_COMMANDS);
    if (res.type === "multiple") {
      expect(res.candidates).not.toContain(".bashrc");
      expect(res.candidates).not.toContain(".profile");
    }
  });

  it("verifies PATH_AWARE_COMMANDS only contains safe traversal commands", () => {
    expect(PATH_AWARE_COMMANDS).toEqual(["cd", "ls", "tree"]);
  });
});
