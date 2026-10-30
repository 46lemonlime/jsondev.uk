/**
 * @file src/pages/terminal-page/autocomplete.js
 * @description Safe, pure frontend Tab autocomplete engine for the simulated Bash shell.
 * Resolves registered command names and virtual filesystem directory/file paths.
 * Adheres strictly to security boundaries: no real OS access, pure in-memory resolution.
 * @responsibility Compute command and virtual path completion candidates on Tab keypress.
 */

import { resolvePath, getNode } from "./virtualFs";

/**
 * Commands that accept virtual filesystem paths as arguments.
 */
export const PATH_AWARE_COMMANDS = ["cd", "ls", "tree"];

/**
 * Computes the longest common prefix among an array of strings.
 * @param {string[]} strings - Array of candidate strings.
 * @returns {string} Common prefix.
 */
export function getLongestCommonPrefix(strings) {
  if (!strings || strings.length === 0) return "";
  if (strings.length === 1) return strings[0];

  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    const s = strings[i];
    let j = 0;
    while (j < prefix.length && j < s.length && prefix[j] === s[j]) {
      j++;
    }
    prefix = prefix.slice(0, j);
    if (prefix === "") break;
  }
  return prefix;
}

/**
 * Resolves Tab completion candidates for the current input line.
 * @param {string} inputVal - Current value of the terminal input.
 * @param {Object} shellState - Virtual shell state { cwd, user, hostname, prevCwd }.
 * @param {Object} fs - Root virtual filesystem node.
 * @param {string[]} allowedCommands - Array of registered command names.
 * @returns {Object} Completion result:
 *   - { type: "none" }
 *   - { type: "complete", newInput: string, candidates: string[] }
 *   - { type: "extend", newInput: string, candidates: string[] }
 *   - { type: "multiple", candidates: string[] }
 */
export function getAutocompleteResult(inputVal, shellState, fs, allowedCommands) {
  if (typeof inputVal !== "string") {
    return { type: "none" };
  }

  // Case 1: User is typing the initial command name (no space yet, ignoring leading whitespace)
  const trimmedStart = inputVal.trimStart();
  if (!trimmedStart.includes(" ")) {
    if (!trimmedStart) {
      return { type: "none" };
    }

    const prefix = trimmedStart.toLowerCase();
    const matches = allowedCommands
      .filter((cmd) => cmd.startsWith(prefix))
      .sort((a, b) => a.localeCompare(b));

    if (matches.length === 0) {
      return { type: "none" };
    }

    if (matches.length === 1) {
      const leadingSpace = inputVal.slice(0, inputVal.length - trimmedStart.length);
      return {
        type: "complete",
        newInput: `${leadingSpace}${matches[0]} `,
        candidates: matches,
      };
    }

    // Multiple command matches: determine longest common prefix
    const lcp = getLongestCommonPrefix(matches);
    if (lcp.length > prefix.length) {
      const leadingSpace = inputVal.slice(0, inputVal.length - trimmedStart.length);
      return {
        type: "extend",
        newInput: `${leadingSpace}${lcp}`,
        candidates: matches,
      };
    }

    return {
      type: "multiple",
      candidates: matches,
    };
  }

  // Case 2: User has typed a command and is typing arguments or paths
  const firstSpaceIdx = inputVal.search(/\s/);
  const cmdName = inputVal.slice(0, firstSpaceIdx).trim().toLowerCase();

  // Only commands that accept filesystem paths should trigger path completion
  if (!PATH_AWARE_COMMANDS.includes(cmdName)) {
    return { type: "none" };
  }

  // Extract the target argument token currently being typed (after the last space)
  const lastSpaceIdx = inputVal.lastIndexOf(" ");
  const prefixBeforeArg = inputVal.slice(0, lastSpaceIdx + 1);
  const rawArg = inputVal.slice(lastSpaceIdx + 1);

  // If the user is typing a flag (e.g. -a, -l), do not complete filesystem paths
  if (rawArg.startsWith("-")) {
    return { type: "none" };
  }

  // Separate directory path component from base filename prefix
  let dirPart = "";
  let basePrefix = "";

  if (rawArg.includes("/")) {
    const lastSlash = rawArg.lastIndexOf("/");
    dirPart = rawArg.slice(0, lastSlash + 1);
    basePrefix = rawArg.slice(lastSlash + 1);
  } else {
    dirPart = "";
    basePrefix = rawArg;
  }

  // Resolve target directory in the virtual filesystem
  const targetDir =
    dirPart === ""
      ? shellState.cwd
      : resolvePath(shellState.cwd, dirPart, shellState.prevCwd);

  if (!targetDir) {
    return { type: "none" };
  }

  const dirNode = getNode(fs, targetDir);
  if (!dirNode || dirNode.type !== "dir") {
    return { type: "none" };
  }

  const isCd = cmdName === "cd";
  const showHidden = basePrefix.startsWith(".");

  const matches = [];
  const childKeys = Object.keys(dirNode.children || {}).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

  for (const name of childKeys) {
    if (!showHidden && name.startsWith(".")) {
      continue;
    }

    if (name.startsWith(basePrefix)) {
      const child = dirNode.children[name];
      const isDir = child.type === "dir";

      // 'cd' only navigates to directories
      if (isCd && !isDir) {
        continue;
      }

      matches.push({
        name,
        isDir,
        completedSegment: name + (isDir ? "/" : ""),
        displayName: name + (isDir ? "/" : ""),
      });
    }
  }

  // Support . and .. navigation candidates if user explicitly typed a dot
  if (basePrefix === "." || basePrefix === "..") {
    if ("..".startsWith(basePrefix)) {
      matches.unshift({
        name: "..",
        isDir: true,
        completedSegment: "../",
        displayName: "../",
      });
    }
    if (".".startsWith(basePrefix)) {
      matches.unshift({
        name: ".",
        isDir: true,
        completedSegment: "./",
        displayName: "./",
      });
    }
  }

  if (matches.length === 0) {
    return { type: "none" };
  }

  if (matches.length === 1) {
    const completedFull = `${prefixBeforeArg}${dirPart}${matches[0].completedSegment}`;
    return {
      type: "complete",
      newInput: completedFull,
      candidates: [matches[0].displayName],
    };
  }

  // Multiple path matches: compute longest common prefix
  const segments = matches.map((m) => m.completedSegment);
  const lcp = getLongestCommonPrefix(segments);

  if (lcp.length > basePrefix.length) {
    const extendedFull = `${prefixBeforeArg}${dirPart}${lcp}`;
    return {
      type: "extend",
      newInput: extendedFull,
      candidates: matches.map((m) => m.displayName),
    };
  }

  return {
    type: "multiple",
    candidates: matches.map((m) => m.displayName),
  };
}
