import { describe, it, expect } from "vitest";
import {
  createVirtualFs,
  normalizePath,
  resolvePath,
  getNode,
  executeCd,
  executeLs,
  executeTree,
} from "./virtualFs";

describe("virtualFs — Path normalization and resolution", () => {
  it("normalizes root and simple absolute paths", () => {
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("/home/guest")).toBe("/home/guest");
    expect(normalizePath("/home/guest/")).toBe("/home/guest");
    expect(normalizePath("///home///guest///")).toBe("/home/guest");
  });

  it("safely handles current (.) and parent (..) directory segments", () => {
    expect(normalizePath("/home/guest/./projects")).toBe("/home/guest/projects");
    expect(normalizePath("/home/guest/projects/..")).toBe("/home/guest");
    expect(normalizePath("/home/guest/projects/../../etc")).toBe("/home/etc");
    expect(normalizePath("/home/guest/projects/../../../etc")).toBe("/etc");
  });

  it("strictly enforces the root boundary and never escapes root", () => {
    expect(normalizePath("/..")).toBe("/");
    expect(normalizePath("/../../../..")).toBe("/");
    expect(normalizePath("/home/../../../../../../")).toBe("/");
  });

  it("resolves tilde (~) to the guest home directory", () => {
    expect(resolvePath("/var/log", "~")).toBe("/home/guest");
    expect(resolvePath("/var/log", "")).toBe("/home/guest");
    expect(resolvePath("/var/log", "~/projects")).toBe("/home/guest/projects");
    expect(resolvePath("/var/log", "~/skills/languages.txt")).toBe("/home/guest/skills/languages.txt");
  });

  it("resolves relative paths against the current working directory", () => {
    expect(resolvePath("/home/guest", "projects")).toBe("/home/guest/projects");
    expect(resolvePath("/home/guest/projects", "..")).toBe("/home/guest");
    expect(resolvePath("/home/guest/projects", "../skills")).toBe("/home/guest/skills");
    expect(resolvePath("/home/guest", "./about/bio.txt")).toBe("/home/guest/about/bio.txt");
  });

  it("resolves absolute paths directly regardless of current working directory", () => {
    expect(resolvePath("/home/guest/skills", "/etc/hostname")).toBe("/etc/hostname");
    expect(resolvePath("/home/guest/skills", "/bin")).toBe("/bin");
  });

  it("resolves previous working directory with '-'", () => {
    expect(resolvePath("/home/guest", "-", "/etc")).toBe("/etc");
    expect(resolvePath("/home/guest", "-", null)).toBeNull();
  });
});

describe("virtualFs — Node lookup (getNode)", () => {
  const fs = createVirtualFs();

  it("locates the root node", () => {
    const root = getNode(fs, "/");
    expect(root).not.toBeNull();
    expect(root.type).toBe("dir");
    expect(root.children).toHaveProperty("home");
    expect(root.children).toHaveProperty("etc");
    expect(root.children).toHaveProperty("bin");
  });

  it("locates nested directory nodes", () => {
    const guestHome = getNode(fs, "/home/guest");
    expect(guestHome).not.toBeNull();
    expect(guestHome.type).toBe("dir");
    expect(guestHome.children).toHaveProperty("projects");
    expect(guestHome.children).toHaveProperty("skills");
    expect(guestHome.children).toHaveProperty("about");
    expect(guestHome.children).toHaveProperty("contact");
  });

  it("locates individual file nodes", () => {
    const readme = getNode(fs, "/home/guest/README.md");
    expect(readme).not.toBeNull();
    expect(readme.type).toBe("file");
    expect(readme.name).toBe("README.md");

    const hostname = getNode(fs, "/etc/hostname");
    expect(hostname).not.toBeNull();
    expect(hostname.type).toBe("file");
  });

  it("returns null for non-existent paths", () => {
    expect(getNode(fs, "/nonexistent")).toBeNull();
    expect(getNode(fs, "/home/guest/missing_file.txt")).toBeNull();
    expect(getNode(fs, "/etc/passwd")).toBeNull();
  });

  it("returns null when attempting to traverse through a file as a directory", () => {
    expect(getNode(fs, "/home/guest/README.md/subpath")).toBeNull();
  });
});

describe("virtualFs — Directory Navigation (executeCd)", () => {
  const fs = createVirtualFs();

  it("navigates to home directory when called with no arguments or '~'", () => {
    const res = executeCd([], "/etc", null, fs);
    expect(res.type).toBe("cd_success");
    expect(res.newCwd).toBe("/home/guest");
    expect(res.newPrevCwd).toBe("/etc");

    const resTilde = executeCd(["~"], "/bin", "/etc", fs);
    expect(resTilde.type).toBe("cd_success");
    expect(resTilde.newCwd).toBe("/home/guest");
    expect(resTilde.newPrevCwd).toBe("/bin");
  });

  it("navigates into child directories and supports relative navigation", () => {
    const res = executeCd(["projects"], "/home/guest", null, fs);
    expect(res.type).toBe("cd_success");
    expect(res.newCwd).toBe("/home/guest/projects");
    expect(res.newPrevCwd).toBe("/home/guest");

    const resParent = executeCd([".."], "/home/guest/projects", "/home/guest", fs);
    expect(resParent.type).toBe("cd_success");
    expect(resParent.newCwd).toBe("/home/guest");
  });

  it("supports 'cd -' to toggle back to the previous directory", () => {
    const res = executeCd(["-"], "/home/guest/projects", "/etc", fs);
    expect(res.type).toBe("cd_success");
    expect(res.newCwd).toBe("/etc");
    expect(res.message).toBe("/etc");
  });

  it("returns error on 'cd -' if OLDPWD (prevCwd) is not set", () => {
    const res = executeCd(["-"], "/home/guest", null, fs);
    expect(res.type).toBe("error");
    expect(res.data.message).toBe("bash: cd: OLDPWD not set");
  });

  it("returns error when target directory does not exist", () => {
    const res = executeCd(["fake_dir"], "/home/guest", null, fs);
    expect(res.type).toBe("error");
    expect(res.data.message).toContain("No such file or directory");
  });

  it("returns error when target is a file instead of a directory", () => {
    const res = executeCd(["README.md"], "/home/guest", null, fs);
    expect(res.type).toBe("error");
    expect(res.data.message).toBe("bash: cd: README.md: Not a directory");
  });
});

describe("virtualFs — Directory Listing (executeLs)", () => {
  const fs = createVirtualFs();

  it("lists directory contents without hidden files by default", () => {
    const res = executeLs([], "/home/guest", fs);
    expect(res.type).toBe("ls_short");
    const names = res.data.entries.map((e) => e.name);
    expect(names).toContain("README.md");
    expect(names).toContain("projects");
    expect(names).toContain("skills");
    expect(names).not.toContain(".bashrc");
    expect(names).not.toContain(".profile");
  });

  it("lists hidden files when -a flag is supplied", () => {
    const res = executeLs(["-a"], "/home/guest", fs);
    expect(res.type).toBe("ls_short");
    const names = res.data.entries.map((e) => e.name);
    expect(names).toContain(".bashrc");
    expect(names).toContain(".profile");
    expect(names).toContain("README.md");
  });

  it("provides detailed formatting with -l flag", () => {
    const res = executeLs(["-l"], "/home/guest", fs);
    expect(res.type).toBe("ls_long");
    expect(res.data).toHaveProperty("total");
    expect(Array.isArray(res.data.entries)).toBe(true);

    const first = res.data.entries[0];
    expect(first).toHaveProperty("permissions");
    expect(first).toHaveProperty("user");
    expect(first).toHaveProperty("group");
    expect(first).toHaveProperty("size");
    expect(first).toHaveProperty("date");
  });

  it("combines flags such as -la or -al", () => {
    const res = executeLs(["-la"], "/home/guest", fs);
    expect(res.type).toBe("ls_long");
    const names = res.data.entries.map((e) => e.name);
    expect(names).toContain(".bashrc");
  });

  it("lists single file details when target is a file", () => {
    const res = executeLs(["README.md"], "/home/guest", fs);
    expect(res.type).toBe("ls_short");
    expect(res.data.entries).toHaveLength(1);
    expect(res.data.entries[0].name).toBe("README.md");
  });

  it("returns error for invalid ls flags", () => {
    const res = executeLs(["-z"], "/home/guest", fs);
    expect(res.type).toBe("error");
    expect(res.data.message).toContain("invalid option -- 'z'");
  });

  it("returns error when target path does not exist", () => {
    const res = executeLs(["nonexistent"], "/home/guest", fs);
    expect(res.type).toBe("error");
    expect(res.data.message).toContain("cannot access 'nonexistent': No such file or directory");
  });
});

describe("virtualFs — Virtual Tree Command (executeTree)", () => {
  const fs = createVirtualFs();

  it("generates a tree visualization for the current directory", () => {
    const res = executeTree([], "/home/guest/skills", fs, "en");
    expect(res.type).toBe("tree");
    expect(Array.isArray(res.data.lines)).toBe(true);
    expect(res.data.lines[0].name).toBe(".");
    expect(res.data.summary).toContain("0 directories, 4 files");
  });

  it("supports -L depth restriction flag", () => {
    const res = executeTree(["-L", "1"], "/home/guest", fs, "en");
    expect(res.type).toBe("tree");
    const names = res.data.lines.map((l) => l.name);
    expect(names).toContain("projects");
    expect(names).toContain("skills");
    // Should not include sub-files of skills because depth is limited to 1
    expect(names).not.toContain("languages.txt");
  });

  it("supports Spanish summary localization", () => {
    const res = executeTree([], "/home/guest/skills", fs, "es");
    expect(res.type).toBe("tree");
    expect(res.data.summary).toContain("0 directorios, 4 archivos");
  });

  it("returns error when target is a file or invalid", () => {
    const resFile = executeTree(["README.md"], "/home/guest", fs, "en");
    expect(resFile.type).toBe("error");
    expect(resFile.data.message).toContain("Not a directory");

    const resMissing = executeTree(["ghost_dir"], "/home/guest", fs, "en");
    expect(resMissing.type).toBe("error");
    expect(resMissing.data.message).toContain("No such file or directory");
  });
});
