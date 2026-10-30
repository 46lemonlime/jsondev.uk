/**
 * @file src/pages/terminal-page/virtualFs.js
 * @description In-memory, read-only simulated UNIX virtual filesystem for jsondev.uk.
 * Implements deterministic directory hierarchies, safe path normalization,
 * and standard POSIX navigation resolution (., .., ~, -) without host OS access.
 * @responsibility Maintain virtual directory tree, validate paths, and format ls/cd responses.
 */

import { projects } from "../../constants/index.js";

/**
 * Constructs the deterministic, read-only virtual filesystem tree.
 * Populates /home/guest/projects dynamically from public project constants.
 * @returns {Object} Root filesystem node.
 */
export function createVirtualFs() {
  // Build project files dynamically from existing public constants
  const projectChildren = {};
  projects.forEach((p) => {
    const filename = `${p.slug}.md`;
    projectChildren[filename] = {
      name: filename,
      type: "file",
      size: (p.content ? p.content.length * 4 : 512) + (p.stack ? p.stack.length * 32 : 128),
      slug: p.slug,
      title: p.name,
      category: Array.isArray(p.categories) ? p.categories[0] : p.category || "Project",
    };
  });

  return {
    "/": {
      name: "/",
      type: "dir",
      children: {
        home: {
          name: "home",
          type: "dir",
          children: {
            guest: {
              name: "guest",
              type: "dir",
              children: {
                "README.md": {
                  name: "README.md",
                  type: "file",
                  size: 614,
                  description: "JsonDev Virtual Shell overview and navigation guide.",
                },
                ".bashrc": {
                  name: ".bashrc",
                  type: "file",
                  size: 192,
                  description: "Simulated bash shell initialization script.",
                },
                ".profile": {
                  name: ".profile",
                  type: "file",
                  size: 88,
                  description: "Simulated user environment profile.",
                },
                projects: {
                  name: "projects",
                  type: "dir",
                  children: projectChildren,
                },
                skills: {
                  name: "skills",
                  type: "dir",
                  children: {
                    "languages.txt": { name: "languages.txt", type: "file", size: 312 },
                    "frameworks.txt": { name: "frameworks.txt", type: "file", size: 248 },
                    "foundations.txt": { name: "foundations.txt", type: "file", size: 284 },
                    "roadmap.url": { name: "roadmap.url", type: "file", size: 96 },
                  },
                },
                about: {
                  name: "about",
                  type: "dir",
                  children: {
                    "bio.txt": { name: "bio.txt", type: "file", size: 486 },
                    "experience.txt": { name: "experience.txt", type: "file", size: 624 },
                    "education.txt": { name: "education.txt", type: "file", size: 348 },
                  },
                },
                contact: {
                  name: "contact",
                  type: "dir",
                  children: {
                    "linkedin.url": { name: "linkedin.url", type: "file", size: 52 },
                    "github.url": { name: "github.url", type: "file", size: 42 },
                    "twitter.url": { name: "twitter.url", type: "file", size: 38 },
                    "message-builder.url": { name: "message-builder.url", type: "file", size: 26 },
                  },
                },
              },
            },
          },
        },
        etc: {
          name: "etc",
          type: "dir",
          children: {
            hostname: { name: "hostname", type: "file", size: 11 },
            "os-release": { name: "os-release", type: "file", size: 72 },
          },
        },
        bin: {
          name: "bin",
          type: "dir",
          children: {
            help: { name: "help", type: "file", size: 1024 },
            pwd: { name: "pwd", type: "file", size: 1024 },
            whoami: { name: "whoami", type: "file", size: 1024 },
            echo: { name: "echo", type: "file", size: 1024 },
            clear: { name: "clear", type: "file", size: 1024 },
            history: { name: "history", type: "file", size: 1024 },
            ls: { name: "ls", type: "file", size: 1024 },
            cd: { name: "cd", type: "file", size: 1024 },
            tree: { name: "tree", type: "file", size: 1024 },
            about: { name: "about", type: "file", size: 1024 },
            projects: { name: "projects", type: "file", size: 1024 },
            skills: { name: "skills", type: "file", size: 1024 },
            contact: { name: "contact", type: "file", size: 1024 },
          },
        },
      },
    },
  };
}

/**
 * Normalizes an absolute path, safely resolving '.' and '..' without escaping root.
 * @param {string} pathStr - Absolute path string.
 * @returns {string} Normalized absolute path.
 */
export function normalizePath(pathStr) {
  if (!pathStr || pathStr === "/") return "/";
  const segments = pathStr.split("/").filter(Boolean);
  const stack = [];

  for (const seg of segments) {
    if (seg === ".") {
      continue;
    } else if (seg === "..") {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(seg);
    }
  }

  return "/" + stack.join("/");
}

/**
 * Resolves a given target path against the current working directory.
 * Supports absolute paths, relative paths, tilde (~), and previous directory (-).
 * @param {string} cwd - Current working directory.
 * @param {string} target - User supplied target path.
 * @param {string|null} prevCwd - Previous working directory for 'cd -'.
 * @returns {string|null} Resolved normalized path or null if OLDPWD is not set.
 */
export function resolvePath(cwd, target, prevCwd = null) {
  if (!target || target === "~") return "/home/guest";
  if (target === "-") return prevCwd || null;

  if (target.startsWith("~/")) {
    return normalizePath("/home/guest/" + target.slice(2));
  }

  if (target.startsWith("/")) {
    return normalizePath(target);
  }

  return normalizePath(cwd + "/" + target);
}

/**
 * Retrieves a node from the virtual filesystem for a given absolute normalized path.
 * @param {Object} fs - Virtual filesystem root.
 * @param {string} pathStr - Absolute normalized path.
 * @returns {Object|null} Node object or null if not found.
 */
export function getNode(fs, pathStr) {
  const normalized = normalizePath(pathStr);
  if (normalized === "/") return fs["/"];

  const parts = normalized.split("/").filter(Boolean);
  let current = fs["/"];

  for (const part of parts) {
    if (!current || current.type !== "dir" || !current.children || !current.children[part]) {
      return null;
    }
    current = current.children[part];
  }

  return current;
}

/**
 * Executes a simulated 'cd' command.
 * @param {string[]} args - Command arguments.
 * @param {string} cwd - Current working directory.
 * @param {string|null} prevCwd - Previous working directory.
 * @param {Object} fs - Virtual filesystem tree.
 * @returns {Object} Result payload.
 */
export function executeCd(args, cwd, prevCwd, fs) {
  const targetRaw = args.length > 0 ? args[0] : "~";

  if (targetRaw === "-" && !prevCwd) {
    return {
      type: "error",
      data: {
        message: "bash: cd: OLDPWD not set",
      },
    };
  }

  const resolved = resolvePath(cwd, targetRaw, prevCwd);
  if (!resolved) {
    return {
      type: "error",
      data: {
        message: `bash: cd: ${targetRaw}: No such file or directory`,
      },
    };
  }

  const node = getNode(fs, resolved);
  if (!node) {
    return {
      type: "error",
      data: {
        message: `bash: cd: ${targetRaw}: No such file or directory`,
      },
    };
  }

  if (node.type !== "dir") {
    return {
      type: "error",
      data: {
        message: `bash: cd: ${targetRaw}: Not a directory`,
      },
    };
  }

  return {
    type: "cd_success",
    newCwd: resolved,
    newPrevCwd: cwd,
    message: targetRaw === "-" ? resolved : null,
  };
}

/**
 * Executes a simulated 'ls' command.
 * Supports -a, -l, -la, -al and directory/file path arguments.
 * @param {string[]} args - Command arguments.
 * @param {string} cwd - Current working directory.
 * @param {Object} fs - Virtual filesystem tree.
 * @returns {Object} Result payload.
 */
export function executeLs(args, cwd, fs) {
  let showAll = false;
  let longFormat = false;
  let targetArg = null;

  for (const arg of args) {
    if (arg.startsWith("-") && arg.length > 1) {
      // Parse flag characters
      for (let i = 1; i < arg.length; i++) {
        const char = arg[i];
        if (char === "a") {
          showAll = true;
        } else if (char === "l") {
          longFormat = true;
        } else {
          return {
            type: "error",
            data: {
              message: `ls: invalid option -- '${char}'\nUsage: ls [-a] [-l] [-la] [path]`,
            },
          };
        }
      }
    } else if (!targetArg) {
      targetArg = arg;
    }
  }

  const resolvedPath = targetArg ? resolvePath(cwd, targetArg) : cwd;
  const node = getNode(fs, resolvedPath);

  if (!node) {
    return {
      type: "error",
      data: {
        message: `ls: cannot access '${targetArg}': No such file or directory`,
      },
    };
  }

  // Listing a single file
  if (node.type === "file") {
    if (longFormat) {
      return {
        type: "ls_long",
        data: {
          total: 1,
          entries: [
            {
              permissions: "-rw-r--r--",
              links: 1,
              user: "guest",
              group: "guest",
              size: node.size || 512,
              date: "Oct 29 08:00",
              name: node.name,
              isDir: false,
            },
          ],
        },
      };
    }
    return {
      type: "ls_short",
      data: {
        entries: [{ name: node.name, isDir: false }],
      },
    };
  }

  // Listing directory contents
  const entries = [];

  if (showAll) {
    entries.push({ name: ".", isDir: true, size: 4096 });
    entries.push({ name: "..", isDir: true, size: 4096 });
  }

  const childKeys = Object.keys(node.children || {}).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

  for (const name of childKeys) {
    const isHidden = name.startsWith(".");
    if (isHidden && !showAll) continue;

    const child = node.children[name];
    entries.push({
      name,
      isDir: child.type === "dir",
      size: child.size || (child.type === "dir" ? 4096 : 512),
    });
  }

  if (longFormat) {
    const totalBlocks = Math.max(1, Math.round(entries.reduce((acc, e) => acc + (e.size || 512), 0) / 512));
    const longEntries = entries.map((e) => ({
      permissions: e.isDir ? "drwxr-xr-x" : "-rw-r--r--",
      links: e.isDir ? 2 : 1,
      user: "guest",
      group: "guest",
      size: e.size,
      date: "Oct 29 08:00",
      name: e.name,
      isDir: e.isDir,
    }));

    return {
      type: "ls_long",
      data: {
        total: totalBlocks,
        entries: longEntries,
      },
    };
  }

  return {
    type: "ls_short",
    data: {
      entries: entries.map((e) => ({ name: e.name, isDir: e.isDir })),
    },
  };
}

/**
 * Executes a simulated 'tree' command on the virtual filesystem.
 * Supports -a (all files including hidden), -L <level> (recursion depth limit),
 * combined flags (-aL, -La), and path resolution.
 * @param {string[]} args - Command line arguments.
 * @param {string} cwd - Current working directory.
 * @param {Object} fs - Virtual filesystem tree.
 * @param {string} language - Current UI language ("en" or "es").
 * @returns {Object} Result payload { type: "tree" | "error" | "text", data }.
 */
export function executeTree(args, cwd, fs, language = "en") {
  let showAll = false;
  let maxDepth = Infinity;
  let targetArg = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help") {
      return {
        type: "text",
        data: {
          text: "usage: tree [-a] [-L level] [path]",
        },
      };
    }

    if (arg.startsWith("-") && arg.length > 1) {
      let j = 1;
      while (j < arg.length) {
        const char = arg[j];
        if (char === "a") {
          showAll = true;
          j++;
        } else if (char === "L") {
          let levelStr = arg.slice(j + 1);
          if (levelStr.length > 0) {
            j = arg.length;
          } else {
            if (i + 1 >= args.length) {
              return {
                type: "error",
                data: {
                  message: "tree: -L: option requires an argument\nusage: tree [-a] [-L level] [path]",
                },
              };
            }
            i++;
            levelStr = args[i];
            j = arg.length;
          }

          const parsedLevel = parseInt(levelStr, 10);
          if (isNaN(parsedLevel) || parsedLevel <= 0 || String(parsedLevel) !== levelStr.trim()) {
            return {
              type: "error",
              data: {
                message: "tree: Invalid level, must be greater than 0.",
              },
            };
          }
          maxDepth = parsedLevel;
        } else {
          return {
            type: "error",
            data: {
              message: `tree: invalid option -- '${char}'\nusage: tree [-a] [-L level] [path]`,
            },
          };
        }
      }
    } else if (!targetArg) {
      targetArg = arg;
    } else {
      return {
        type: "error",
        data: {
          message: `tree: too many arguments\nusage: tree [-a] [-L level] [path]`,
        },
      };
    }
  }

  const displayTarget = targetArg || ".";
  const resolvedPath = targetArg ? resolvePath(cwd, targetArg) : cwd;

  if (!resolvedPath) {
    return {
      type: "error",
      data: {
        message: `tree: [error opening dir] ${displayTarget}: No such file or directory`,
      },
    };
  }

  const node = getNode(fs, resolvedPath);
  if (!node) {
    return {
      type: "error",
      data: {
        message: `tree: [error opening dir] ${displayTarget}: No such file or directory`,
      },
    };
  }

  if (node.type !== "dir") {
    return {
      type: "error",
      data: {
        message: `tree: [error opening dir] ${displayTarget}: Not a directory`,
      },
    };
  }

  const treeLines = [{ prefix: "", name: displayTarget, isDir: true }];
  let dirCount = 0;
  let fileCount = 0;

  function traverse(currentNode, prefix, currentDepth) {
    const childKeys = Object.keys(currentNode.children || {}).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    const filteredKeys = childKeys.filter((k) => showAll || !k.startsWith("."));

    filteredKeys.forEach((key, index) => {
      const isLast = index === filteredKeys.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const childNode = currentNode.children[key];
      const isDir = childNode.type === "dir";

      treeLines.push({
        prefix: prefix + connector,
        name: key,
        isDir,
      });

      if (isDir) {
        dirCount++;
        if (currentDepth < maxDepth) {
          const nextPrefix = prefix + (isLast ? "    " : "│   ");
          traverse(childNode, nextPrefix, currentDepth + 1);
        }
      } else {
        fileCount++;
      }
    });
  }

  traverse(node, "", 1);

  const isEs = language === "es";
  const dirLabel = isEs
    ? dirCount === 1 ? "directorio" : "directorios"
    : dirCount === 1 ? "directory" : "directories";
  const fileLabel = isEs
    ? fileCount === 1 ? "archivo" : "archivos"
    : fileCount === 1 ? "file" : "files";
  const summary = `${dirCount} ${dirLabel}, ${fileCount} ${fileLabel}`;

  return {
    type: "tree",
    data: {
      lines: treeLines,
      summary,
    },
  };
}
