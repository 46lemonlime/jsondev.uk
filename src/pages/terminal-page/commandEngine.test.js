import { describe, it, expect } from "vitest";
import {
  tokenize,
  formatPromptPath,
  formatPromptString,
  executeCommand,
  ALLOWED_COMMANDS,
  INITIAL_SHELL_STATE,
} from "./commandEngine";

// Lightweight translation mock supporting standard terminal keys
const mockT = (key, options = {}) => {
  if (options.defaultValue) return options.defaultValue;
  if (options.slug) return `Project not found: ${options.slug}`;
  return key;
};

describe("commandEngine — Tokenizer (tokenize)", () => {
  it("returns empty array for empty or whitespace-only inputs", () => {
    expect(tokenize("")).toEqual([]);
    expect(tokenize("   ")).toEqual([]);
    expect(tokenize(null)).toEqual([]);
    expect(tokenize(undefined)).toEqual([]);
  });

  it("splits unquoted whitespace-separated words", () => {
    expect(tokenize("ls -la projects")).toEqual(["ls", "-la", "projects"]);
    expect(tokenize("echo   hello    world  ")).toEqual(["echo", "hello", "world"]);
  });

  it("preserves phrases within double quotes as a single token", () => {
    expect(tokenize('echo "Hello World" foo')).toEqual(["echo", "Hello World", "foo"]);
    expect(tokenize('projects "Portfolio Website"')).toEqual(["projects", "Portfolio Website"]);
  });

  it("preserves phrases within single quotes as a single token", () => {
    expect(tokenize("echo 'Hello Virtual Shell' bar")).toEqual(["echo", "Hello Virtual Shell", "bar"]);
  });

  it("handles mixed quotes and escaped quotes accurately", () => {
    expect(tokenize('echo "It\'s a sunny day"')).toEqual(["echo", "It's a sunny day"]);
    expect(tokenize("echo 'He said \"Hello\"'")).toEqual(["echo", 'He said "Hello"']);
  });
});

describe("commandEngine — Prompt formatters", () => {
  it("formats home directory as tilde (~)", () => {
    expect(formatPromptPath("/home/guest")).toBe("~");
    expect(formatPromptPath("/home/guest/projects")).toBe("~/projects");
    expect(formatPromptPath("/etc")).toBe("/etc");
    expect(formatPromptPath("/")).toBe("/");
  });

  it("generates full prompt string accurately", () => {
    expect(formatPromptString("guest", "jsondev.uk", "/home/guest")).toBe("guest@jsondev.uk:~$");
    expect(formatPromptString("guest", "jsondev.uk", "/home/guest/skills")).toBe("guest@jsondev.uk:~/skills$");
    expect(formatPromptString("guest", "jsondev.uk", "/bin")).toBe("guest@jsondev.uk:/bin$");
  });
});

describe("commandEngine — Safe Execution Dispatch (executeCommand)", () => {
  const defaultContext = {
    t: mockT,
    language: "en",
    cmdHistory: ["pwd", "help"],
    shellState: INITIAL_SHELL_STATE,
  };

  it("returns null for empty input", () => {
    expect(executeCommand("", defaultContext)).toBeNull();
    expect(executeCommand("   ", defaultContext)).toBeNull();
    expect(executeCommand(null, defaultContext)).toBeNull();
  });

  it("executes 'pwd' returning the current working directory", () => {
    const res = executeCommand("pwd", defaultContext);
    expect(res).toEqual({
      type: "text",
      data: { text: "/home/guest" },
    });
  });

  it("executes 'whoami' returning the simulated user", () => {
    const res = executeCommand("whoami", defaultContext);
    expect(res).toEqual({
      type: "text",
      data: { text: "guest" },
    });
  });

  it("executes 'echo' printing arguments", () => {
    const res = executeCommand('echo "Hello from Virtual Shell!"', defaultContext);
    expect(res).toEqual({
      type: "text",
      data: { text: "Hello from Virtual Shell!" },
    });
  });

  it("executes 'clear' returning clear signal", () => {
    const res = executeCommand("clear", defaultContext);
    expect(res).toEqual({
      type: "clear",
      data: {},
    });
  });

  it("executes 'history' returning command history", () => {
    const res = executeCommand("history", defaultContext);
    expect(res.type).toBe("history");
    expect(res.data.items).toEqual(["pwd", "help"]);
  });

  it("executes 'help' returning registered commands and descriptions", () => {
    const res = executeCommand("help", defaultContext);
    expect(res.type).toBe("help");
    expect(Array.isArray(res.data.items)).toBe(true);
    const cmds = res.data.items.map((i) => i.cmd.split(" ")[0]);
    expect(cmds).toContain("help");
    expect(cmds).toContain("ls");
    expect(cmds).toContain("cd");
    expect(cmds).toContain("projects");
  });

  it("executes 'about' returning personal summary data", () => {
    const res = executeCommand("about", defaultContext);
    expect(res.type).toBe("about");
    expect(res.data).toHaveProperty("role");
    expect(res.data).toHaveProperty("location");
    expect(res.data).toHaveProperty("summary");
  });

  it("executes 'skills' returning technical pillars", () => {
    const res = executeCommand("skills", defaultContext);
    expect(res.type).toBe("skills");
    expect(res.data).toHaveProperty("languages");
    expect(res.data).toHaveProperty("frameworks");
    expect(res.data).toHaveProperty("roadmap");
  });

  it("executes 'contact' returning verified profile links", () => {
    const resEn = executeCommand("contact", defaultContext);
    expect(resEn.type).toBe("contact");
    const urls = resEn.data.items.map((i) => i.value);
    expect(urls).toContain("https://www.linkedin.com/in/jpplazasanchez/");
    expect(urls).toContain("https://github.com/46lemonlime");
    expect(urls).toContain("/contact");

    const resEs = executeCommand("contact", { ...defaultContext, language: "es" });
    const urlsEs = resEs.data.items.map((i) => i.value);
    expect(urlsEs).toContain("/es/contact");
  });

  it("executes 'projects' with no args to list all verified catalog projects", () => {
    const res = executeCommand("projects", defaultContext);
    expect(res.type).toBe("projects_list");
    expect(Array.isArray(res.data.projects)).toBe(true);
    expect(res.data.projects.length).toBeGreaterThanOrEqual(5);

    const slugs = res.data.projects.map((p) => p.slug);
    expect(slugs).toContain("portfolio-website");
    expect(slugs).toContain("call-progress-tracker");
  });

  it("executes 'projects <slug>' for valid project slug", () => {
    const res = executeCommand("projects portfolio-website", defaultContext);
    expect(res.type).toBe("project_detail");
    expect(res.data.name).toBe("Portfolio Website");
    expect(res.data.detailRoute).toBe("/projects/portfolio-website");
  });

  it("localizes detail route for Spanish context in 'projects <slug>'", () => {
    const res = executeCommand("projects portfolio-website", { ...defaultContext, language: "es" });
    expect(res.type).toBe("project_detail");
    expect(res.data.detailRoute).toBe("/es/projects/portfolio-website");
  });

  it("returns error for 'projects <slug>' when slug does not exist", () => {
    const res = executeCommand("projects ghost-project", defaultContext);
    expect(res.type).toBe("error");
    expect(res.data.message).toContain("ghost-project");
  });

  it("delegates 'ls', 'cd', and 'tree' to virtual filesystem handlers", () => {
    const resLs = executeCommand("ls", defaultContext);
    expect(resLs.type).toBe("ls_short");

    const resCd = executeCommand("cd projects", defaultContext);
    expect(resCd.type).toBe("cd_success");
    expect(resCd.newCwd).toBe("/home/guest/projects");

    const resTree = executeCommand("tree", defaultContext);
    expect(resTree.type).toBe("tree");
  });

  it("returns safe simulated error for unknown commands", () => {
    const res = executeCommand("sudo rm -rf /", defaultContext);
    expect(res.type).toBe("error");
    expect(res.data.message).toBe("bash: sudo: command not found");

    const res2 = executeCommand("curl http://malicious.site", defaultContext);
    expect(res2.type).toBe("error");
    expect(res2.data.message).toBe("bash: curl: command not found");
  });

  it("is case-insensitive for command names", () => {
    const res = executeCommand("PWD", defaultContext);
    expect(res.type).toBe("text");
    expect(res.data.text).toBe("/home/guest");

    const resWho = executeCommand("WhOaMi", defaultContext);
    expect(resWho.type).toBe("text");
    expect(resWho.data.text).toBe("guest");
  });

  it("strictly registers only allowed commands", () => {
    expect(ALLOWED_COMMANDS).toEqual([
      "help",
      "pwd",
      "whoami",
      "echo",
      "clear",
      "history",
      "ls",
      "cd",
      "tree",
      "about",
      "projects",
      "skills",
      "contact",
    ]);
  });
});
