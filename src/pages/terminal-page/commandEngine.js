/**
 * @file src/pages/terminal-page/commandEngine.js
 * @description Safe, pure frontend command execution engine for the simulated Bash shell.
 * Integrates quote-aware tokenizer, virtual filesystem navigation (ls, cd, pwd),
 * and an explicit command allowlist.
 * Strictly adheres to security boundaries: no eval, no network, no OS execution.
 * @responsibility Tokenize user input, validate commands against allowlist, and return structured output objects.
 */

import { projects } from "../../constants";
import { createVirtualFs, executeLs, executeCd } from "./virtualFs";

export const ALLOWED_COMMANDS = [
  "help",
  "pwd",
  "whoami",
  "echo",
  "clear",
  "history",
  "ls",
  "cd",
  "about",
  "projects",
  "skills",
  "contact",
];

export const INITIAL_SHELL_STATE = {
  user: "guest",
  hostname: "jsondev.uk",
  cwd: "/home/guest",
  prevCwd: null,
};

/**
 * Singleton virtual filesystem instance for session queries.
 */
export const virtualFs = createVirtualFs();

/**
 * Formats a working directory path to Bash tilde notation when within home.
 * @param {string} cwd - Absolute working directory path.
 * @param {string} home - Home directory path.
 * @returns {string} Formatted display path (e.g. "~").
 */
export function formatPromptPath(cwd, home = "/home/guest") {
  if (cwd === home) return "~";
  if (cwd.startsWith(home + "/")) return "~" + cwd.slice(home.length);
  return cwd;
}

/**
 * Generates the full Bash prompt label.
 * @param {string} user - Simulated username.
 * @param {string} hostname - Simulated hostname.
 * @param {string} cwd - Current working directory.
 * @returns {string} Prompt string, e.g. "guest@jsondev.uk:~$".
 */
export function formatPromptString(user, hostname, cwd) {
  const displayPath = formatPromptPath(cwd);
  return `${user}@${hostname}:${displayPath}$`;
}

/**
 * Safe, quote-aware tokenizer for command inputs.
 * Supports whitespace separation, single quotes ('...'), and double quotes ("...").
 * Treats all contents as literal data (no parameter expansion or command substitution).
 * @param {string} input - Raw input command line.
 * @returns {string[]} Array of string tokens.
 */
export function tokenize(input) {
  if (!input || typeof input !== "string") return [];

  const tokens = [];
  let current = "";
  let inDouble = false;
  let inSingle = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
    } else if (char === "'" && !inDouble) {
      inSingle = !inSingle;
    } else if (/\s/.test(char) && !inDouble && !inSingle) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}

/**
 * Safely parses and executes a command string against the simulated Bash shell.
 * @param {string} rawInput - Raw input from the user prompt.
 * @param {Object} context - Execution context { t, language, cmdHistory, shellState, fs }
 * @returns {Object|null} Structured result object or null for empty input.
 */
export function executeCommand(rawInput, context) {
  if (!rawInput || typeof rawInput !== "string") {
    return null;
  }

  const tokens = tokenize(rawInput);
  if (tokens.length === 0) {
    return null;
  }

  const {
    t,
    language = "en",
    cmdHistory = [],
    shellState = INITIAL_SHELL_STATE,
    fs = virtualFs,
  } = context;

  const rawCommand = tokens[0];
  const command = rawCommand.toLowerCase();
  const args = tokens.slice(1);

  // Command: help
  if (command === "help") {
    return {
      type: "help",
      data: {
        header: t("commands.help.header"),
        items: [
          { cmd: "help", desc: t("commands.help.desc") },
          { cmd: "pwd", desc: t("commands.pwd.desc") },
          { cmd: "whoami", desc: t("commands.whoami.desc") },
          { cmd: "echo [text]", desc: t("commands.echo.desc") },
          { cmd: "ls [-a] [-l] [path]", desc: t("commands.ls.desc") },
          { cmd: "cd [dir]", desc: t("commands.cd.desc") },
          { cmd: "clear", desc: t("commands.clear.desc") },
          { cmd: "history", desc: t("commands.history.desc") },
          { cmd: "about", desc: t("commands.about.desc") },
          { cmd: "projects", desc: t("commands.projects.desc") },
          { cmd: "projects <slug>", desc: t("commands.projects.slugHint") },
          { cmd: "skills", desc: t("commands.skills.desc") },
          { cmd: "contact", desc: t("commands.contact.desc") },
        ],
      },
    };
  }

  // Command: pwd
  if (command === "pwd") {
    return {
      type: "text",
      data: {
        text: shellState.cwd,
      },
    };
  }

  // Command: whoami
  if (command === "whoami") {
    return {
      type: "text",
      data: {
        text: shellState.user,
      },
    };
  }

  // Command: echo
  if (command === "echo") {
    return {
      type: "text",
      data: {
        text: args.join(" "),
      },
    };
  }

  // Command: ls
  if (command === "ls") {
    return executeLs(args, shellState.cwd, fs);
  }

  // Command: cd
  if (command === "cd") {
    return executeCd(args, shellState.cwd, shellState.prevCwd, fs);
  }

  // Command: about
  if (command === "about") {
    return {
      type: "about",
      data: {
        role: t("commands.about.role"),
        location: t("commands.about.location"),
        summary: t("commands.about.summary"),
      },
    };
  }

  // Command: projects [slug]
  if (command === "projects") {
    if (args.length === 0) {
      // List all six projects
      return {
        type: "projects_list",
        data: {
          header: t("commands.projects.header"),
          slugHint: t("commands.projects.slugHint"),
          projects: projects.map((p) => ({
            slug: p.slug,
            name: p.name,
            category: Array.isArray(p.categories)
              ? p.categories[0]
              : p.category || "Project",
          })),
        },
      };
    }

    // projects <slug>
    const targetSlug = args[0].toLowerCase();
    const found = projects.find((p) => p.slug.toLowerCase() === targetSlug);

    if (!found) {
      return {
        type: "error",
        data: {
          message: t("commands.projects.notFound", { slug: args[0] }),
        },
      };
    }

    const detailRoute = language === "es" ? `/es${found.link}` : found.link;

    return {
      type: "project_detail",
      data: {
        name: found.name,
        slug: found.slug,
        category: Array.isArray(found.categories)
          ? found.categories[0]
          : found.category || "Project",
        summary: found.overview || found.content || "",
        stack: Array.isArray(found.stack) ? found.stack : [],
        liveUrl: found.liveUrl || null,
        repoUrl: found.repoUrl || null,
        detailRoute,
      },
    };
  }

  // Command: skills
  if (command === "skills") {
    return {
      type: "skills",
      data: {
        header: t("commands.skills.header"),
        languages: t("commands.skills.languages"),
        frameworks: t("commands.skills.frameworks"),
        foundations: t("commands.skills.foundations"),
        strengths: t("commands.skills.strengths"),
        roadmap: t("commands.skills.roadmap"),
      },
    };
  }

  // Command: contact
  if (command === "contact") {
    const isSpanish = language === "es";
    return {
      type: "contact",
      data: {
        header: t("commands.contact.header"),
        items: [
          {
            label: "LinkedIn",
            value: "https://www.linkedin.com/in/jpplazasanchez/",
          },
          {
            label: "GitHub",
            value: "https://github.com/46lemonlime",
          },
          {
            label: "X (Twitter)",
            value: "https://twitter.com/_jsondev",
          },
          {
            label: isSpanish ? "Formulario de Contacto" : "Message Builder",
            value: isSpanish ? "/es/contact" : "/contact",
          },
        ],
      },
    };
  }

  // Command: history
  if (command === "history") {
    return {
      type: "history",
      data: {
        header: t("commands.history.header"),
        items: cmdHistory,
        emptyMessage: t("commands.history.empty"),
      },
    };
  }

  // Command: clear
  if (command === "clear") {
    return {
      type: "clear",
      data: {},
    };
  }

  // Unknown command: simulated Bash error
  return {
    type: "error",
    data: {
      message: `bash: ${rawCommand}: command not found`,
      hint: t("commands.errors.notFoundHint"),
    },
  };
}
