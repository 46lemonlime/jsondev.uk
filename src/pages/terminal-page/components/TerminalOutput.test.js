import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import "../../../i18n";
import TerminalOutput from "./TerminalOutput";

const renderComponent = (result) => {
  return renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      null,
      React.createElement(TerminalOutput, { result })
    )
  );
};

describe("TerminalOutput Presentation Component", () => {
  it("renders nothing when result is null or undefined", () => {
    expect(renderComponent(null)).toBe("");
    expect(renderComponent(undefined)).toBe("");
  });

  it("renders nothing for unknown result types", () => {
    expect(renderComponent({ type: "unknown_type", data: {} })).toBe("");
  });

  it("renders 'text' output with monospace pre-wrap styling", () => {
    const html = renderComponent({
      type: "text",
      data: { text: "Hello terminal world" },
    });
    expect(html).toContain("Hello terminal world");
    expect(html).toContain("whitespace-pre-wrap");
  });

  it("renders 'ls_short' output distinguishing directories with trailing slashes", () => {
    const html = renderComponent({
      type: "ls_short",
      data: {
        entries: [
          { name: "projects", isDir: true },
          { name: "readme.txt", isDir: false },
        ],
      },
    });
    expect(html).toContain("projects/");
    expect(html).toContain("readme.txt");
    expect(html).toContain("text-accent");
    expect(html).toContain("text-textPrimary");
  });

  it("renders 'ls_long' table with file metadata", () => {
    const html = renderComponent({
      type: "ls_long",
      data: {
        total: 42,
        entries: [
          {
            permissions: "drwxr-xr-x",
            links: "2",
            user: "json",
            group: "staff",
            size: "4.0K",
            date: "Oct 28 10:00",
            name: "src",
            isDir: true,
          },
        ],
      },
    });
    expect(html).toContain("total 42");
    expect(html).toContain("drwxr-xr-x");
    expect(html).toContain("json");
    expect(html).toContain("staff");
    expect(html).toContain("4.0K");
    expect(html).toContain("src/");
  });

  it("renders 'help' grid with available commands and header", () => {
    const html = renderComponent({
      type: "help",
      data: {
        header: "Available commands:",
        items: [
          { cmd: "help", desc: "List commands" },
          { cmd: "about", desc: "Display bio" },
        ],
      },
    });
    expect(html).toContain("Available commands:");
    expect(html).toContain("help");
    expect(html).toContain("List commands");
    expect(html).toContain("about");
    expect(html).toContain("Display bio");
  });

  it("renders 'about' output with role, location, and bio", () => {
    const html = renderComponent({
      type: "about",
      data: {
        role: "Software Engineer",
        location: "London, UK",
        summary: "Passionate full stack developer building robust web applications.",
      },
    });
    expect(html).toContain("Software Engineer");
    expect(html).toContain("London, UK");
    expect(html).toContain("Passionate full stack developer");
  });

  it("renders 'projects_list' with featured projects and slug hint", () => {
    const html = renderComponent({
      type: "projects_list",
      data: {
        header: "Portfolio Projects:",
        projects: [
          { slug: "smartorg", name: "SmartOrg", category: "Full-Stack" },
          { slug: "handlab", name: "HandLab", category: "AI / ML" },
        ],
        slugHint: "Type 'project <slug>' for detailed info.",
      },
    });
    expect(html).toContain("Portfolio Projects:");
    expect(html).toContain("smartorg");
    expect(html).toContain("SmartOrg");
    expect(html).toContain("[Full-Stack]");
    expect(html).toContain("handlab");
    expect(html).toContain("HandLab");
    expect(html).toContain("[AI / ML]");
    expect(html).toContain("Type &#x27;project &lt;slug&gt;&#x27; for detailed info.");
  });

  it("renders 'project_detail' with category, tech stack, and internal/external links", () => {
    const html = renderComponent({
      type: "project_detail",
      data: {
        name: "SmartOrg ERP",
        category: "Enterprise",
        summary: "Comprehensive multi-tenant resource management system.",
        stack: ["React", "TypeScript", "Node.js"],
        detailRoute: "/projects/smartorg",
        liveUrl: "https://smartorg.example.com",
        repoUrl: "https://github.com/jsondev/smartorg",
      },
    });
    expect(html).toContain("SmartOrg ERP");
    expect(html).toContain("[Enterprise]");
    expect(html).toContain("Comprehensive multi-tenant resource management system.");
    expect(html).toContain("React");
    expect(html).toContain("TypeScript");
    expect(html).toContain("Node.js");
    expect(html).toContain('href="/projects/smartorg"');
    expect(html).toContain('href="https://smartorg.example.com"');
    expect(html).toContain('href="https://github.com/jsondev/smartorg"');
  });

  it("renders 'skills' breakdown with categories and roadmap external link", () => {
    const html = renderComponent({
      type: "skills",
      data: {
        header: "Technical Capabilities:",
        languages: "JavaScript, TypeScript, Python",
        frameworks: "React, Next.js, Express",
        foundations: "Data Structures, Algorithms",
        strengths: "System Architecture, Clean Code",
        roadmap: "View interactive learning roadmap",
      },
    });
    expect(html).toContain("Technical Capabilities:");
    expect(html).toContain("JavaScript, TypeScript, Python");
    expect(html).toContain("React, Next.js, Express");
    expect(html).toContain("Data Structures, Algorithms");
    expect(html).toContain("System Architecture, Clean Code");
    expect(html).toContain("View interactive learning roadmap");
  });

  it("renders 'contact' channels distinguishing internal router links and external links", () => {
    const html = renderComponent({
      type: "contact",
      data: {
        header: "Get in touch:",
        items: [
          { label: "Email", value: "hello@jsondev.uk" },
          { label: "Contact Form", value: "/contact" },
          { label: "GitHub", value: "https://github.com/jsondev" },
        ],
      },
    });
    expect(html).toContain("Get in touch:");
    expect(html).toContain("Email:");
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="https://github.com/jsondev"');
    expect(html).toContain('target="_blank"');
  });

  it("renders 'history' list with sequential numbers and handles empty state", () => {
    const emptyHtml = renderComponent({
      type: "history",
      data: {
        header: "Command History:",
        emptyMessage: "No commands recorded in this session.",
        items: [],
      },
    });
    expect(emptyHtml).toContain("Command History:");
    expect(emptyHtml).toContain("No commands recorded in this session.");

    const populatedHtml = renderComponent({
      type: "history",
      data: {
        header: "Command History:",
        emptyMessage: "No commands recorded.",
        items: ["ls", "cat readme.txt", "clear"],
      },
    });
    expect(populatedHtml).toContain("1");
    expect(populatedHtml).toContain("ls");
    expect(populatedHtml).toContain("2");
    expect(populatedHtml).toContain("cat readme.txt");
    expect(populatedHtml).toContain("3");
    expect(populatedHtml).toContain("clear");
  });

  it("renders 'tree' directory layout with prefixes and summary", () => {
    const html = renderComponent({
      type: "tree",
      data: {
        lines: [
          { prefix: "├── ", name: "src", isDir: true },
          { prefix: "│   └── ", name: "index.js", isDir: false },
        ],
        summary: "1 directory, 1 file",
      },
    });
    expect(html).toContain("├── ");
    expect(html).toContain("src");
    expect(html).toContain("│   └── ");
    expect(html).toContain("index.js");
    expect(html).toContain("1 directory, 1 file");
  });

  it("renders 'tab_candidates' autocomplete suggestions", () => {
    const html = renderComponent({
      type: "tab_candidates",
      data: {
        candidates: ["about", "contact", "projects/"],
      },
    });
    expect(html).toContain("about");
    expect(html).toContain("contact");
    expect(html).toContain("projects/");
  });

  it("renders 'error' message with optional hint", () => {
    const html = renderComponent({
      type: "error",
      data: {
        message: "bash: foo: command not found",
        hint: "Type 'help' to inspect valid commands.",
      },
    });
    expect(html).toContain("bash: foo: command not found");
    expect(html).toContain("Type &#x27;help&#x27; to inspect valid commands.");
    expect(html).toContain("text-rose-400");
  });
});
