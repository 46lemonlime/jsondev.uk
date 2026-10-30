/**
 * @file src/pages/terminal-page/components/TerminalView.jsx
 * @description Interactive terminal shell component rendering window chrome,
 * simulated Bash prompt, initial ASCII-art welcome screen, virtual directory navigation,
 * and responsive command input.
 * @responsibility Render interactive terminal view, handle keyboard input, and manage virtual shell session.
 */

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  executeCommand,
  INITIAL_SHELL_STATE,
  formatPromptPath,
  ALLOWED_COMMANDS,
  virtualFs,
} from "../commandEngine";
import { getAutocompleteResult } from "../autocomplete";

const TerminalView = () => {
  const { t, i18n } = useTranslation("terminal");
  const [shellState, setShellState] = useState(INITIAL_SHELL_STATE);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const tabStateRef = useRef({ count: 0, lastInput: "" });

  // Focus input on mount without causing any page scroll jump
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const handleFocusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      tabStateRef.current = { count: 0, lastInput: "" };
      e.preventDefault();
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Append command to session history before dispatching so 'history' includes it
      const updatedCmdHistory = [...cmdHistory, trimmed];
      setCmdHistory(updatedCmdHistory);

      // Dispatch command through the safe frontend engine
      const result = executeCommand(trimmed, {
        t,
        language: i18n.language,
        cmdHistory: updatedCmdHistory,
        shellState,
      });

      if (!result) return;

      // Special handling for clear command:
      // Clears visible terminal interactive output without resetting cwd, history, or session state
      if (result.type === "clear") {
        setHistory([]);
        setHistoryIndex(-1);
        setInputVal("");
        return;
      }

      // Handle successful cd navigation
      if (result.type === "cd_success") {
        setShellState((prev) => ({
          ...prev,
          cwd: result.newCwd,
          prevCwd: result.newPrevCwd,
        }));

        // If cd had a message (e.g. cd - echoes the target directory in bash)
        const entry = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          command: trimmed,
          timestamp,
          user: shellState.user,
          hostname: shellState.hostname,
          cwd: shellState.cwd,
          result: result.message
            ? { type: "text", data: { text: result.message } }
            : null,
        };

        setHistory((prev) => [...prev, entry]);
        setHistoryIndex(-1);
        setInputVal("");
        return;
      }

      // Record standard output in visible terminal history
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        command: trimmed,
        timestamp,
        user: shellState.user,
        hostname: shellState.hostname,
        cwd: shellState.cwd,
        result,
      };

      setHistory((prev) => [...prev, entry]);
      setHistoryIndex(-1);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      if (historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const res = getAutocompleteResult(
        inputVal,
        shellState,
        virtualFs,
        ALLOWED_COMMANDS
      );

      if (!res || res.type === "none") {
        tabStateRef.current = { count: 0, lastInput: inputVal };
        return;
      }

      if (res.type === "complete") {
        setInputVal(res.newInput);
        tabStateRef.current = { count: 0, lastInput: "" };
        return;
      }

      if (res.type === "extend") {
        setInputVal(res.newInput);
        tabStateRef.current = { count: 1, lastInput: res.newInput };
        return;
      }

      if (res.type === "multiple") {
        if (
          tabStateRef.current.count >= 1 &&
          tabStateRef.current.lastInput === inputVal
        ) {
          // Consecutive Tab press: display candidates in terminal output
          const timestamp = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          const entry = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            command: inputVal,
            timestamp,
            user: shellState.user,
            hostname: shellState.hostname,
            cwd: shellState.cwd,
            result: {
              type: "tab_candidates",
              data: {
                candidates: res.candidates,
              },
            },
          };

          setHistory((prev) => [...prev, entry]);
          tabStateRef.current = { count: 0, lastInput: inputVal };
        } else {
          tabStateRef.current = { count: 1, lastInput: inputVal };
        }
      }
    } else {
      // Non-Tab keypress resets the consecutive Tab counter
      tabStateRef.current = { count: 0, lastInput: "" };
    }
  };

  /**
   * Renders structured output payloads based on result type.
   */
  const renderOutput = (result) => {
    if (!result) return null;

    const { type, data } = result;

    switch (type) {
      case "text":
        return (
          <div className="text-textSecondary font-mono text-[13px] leading-relaxed whitespace-pre-wrap mt-0.5">
            {data.text}
          </div>
        );

      case "ls_short":
        return (
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[13px] mt-1">
            {data.entries.map((entry, idx) => (
              <span
                key={`ls-${idx}`}
                className={
                  entry.isDir
                    ? "text-accent font-semibold flex items-center"
                    : "text-textPrimary"
                }
              >
                {entry.name}
                {entry.isDir ? "/" : ""}
              </span>
            ))}
          </div>
        );

      case "ls_long":
        return (
          <div className="font-mono text-[12px] sm:text-[13px] space-y-0.5 mt-1 overflow-x-auto">
            <div className="text-textMuted mb-1">total {data.total}</div>
            {data.entries.map((entry, idx) => (
              <div
                key={`lsl-${idx}`}
                className="grid grid-cols-[90px_20px_50px_50px_55px_90px_1fr] gap-x-2 whitespace-pre text-textSecondary"
              >
                <span className="text-textMuted">{entry.permissions}</span>
                <span className="text-right text-textMuted">{entry.links}</span>
                <span className="text-textMuted">{entry.user}</span>
                <span className="text-textMuted">{entry.group}</span>
                <span className="text-right text-textSecondary">{entry.size}</span>
                <span className="text-textMuted">{entry.date}</span>
                <span
                  className={
                    entry.isDir
                      ? "text-accent font-semibold"
                      : "text-textPrimary"
                  }
                >
                  {entry.name}
                  {entry.isDir ? "/" : ""}
                </span>
              </div>
            ))}
          </div>
        );

      case "help":
        return (
          <div className="space-y-2 mt-1">
            <p className="text-accent font-semibold text-[13px]">
              {data.header}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-4 gap-y-1 text-[13px]">
              {data.items.map((item, idx) => (
                <React.Fragment key={`help-${idx}`}>
                  <span className="font-semibold text-accent/90">
                    {item.cmd}
                  </span>
                  <span className="text-textSecondary">{item.desc}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-2 mt-1 text-[13px] leading-relaxed">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-textMuted font-mono">
              <span className="text-accent font-medium">{data.role}</span>
              <span>•</span>
              <span>{data.location}</span>
            </div>
            <p className="text-textSecondary mt-2 max-w-[700px]">
              {data.summary}
            </p>
          </div>
        );

      case "projects_list":
        return (
          <div className="space-y-2.5 mt-1">
            <p className="text-accent font-semibold text-[13px]">
              {data.header}
            </p>
            <div className="space-y-1.5 text-[13px]">
              {data.projects.map((p) => (
                <div
                  key={p.slug}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
                >
                  <span className="font-semibold text-accent/95 w-[210px] shrink-0">
                    {p.slug}
                  </span>
                  <span className="text-textPrimary font-medium">
                    {p.name}
                  </span>
                  <span className="text-textMuted text-[12px]">
                    [{p.category}]
                  </span>
                </div>
              ))}
            </div>
            <p className="text-textMuted text-[12px] pt-1 italic">
              {data.slugHint}
            </p>
          </div>
        );

      case "project_detail":
        return (
          <div className="space-y-2 mt-1 p-3.5 rounded-lg bg-surface/80 border border-borderSubtle text-[13px] leading-relaxed max-w-[720px]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderSubtle pb-2">
              <span className="font-bold text-accent text-[14px]">
                {data.name}
              </span>
              <span className="text-textMuted text-[11px] font-mono">
                [{data.category}]
              </span>
            </div>
            <p className="text-textSecondary pt-1">{data.summary}</p>

            {data.stack.length > 0 && (
              <div className="pt-1.5">
                <span className="text-textMuted text-[12px] block mb-1">
                  {t("commands.projects.fieldTech")}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.stack.map((tech, idx) => (
                    <span
                      key={`tech-${idx}`}
                      className="px-2 py-0.5 rounded text-[11px] bg-surfaceElevated border border-borderSubtle text-textSecondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2 text-[12px] border-t border-borderSubtle/60 mt-2">
              {data.detailRoute && (
                <Link
                  to={data.detailRoute}
                  className="text-accent hover:underline inline-flex items-center gap-1 font-medium"
                >
                  {t("commands.projects.fieldDetail")} ↗
                </Link>
              )}
              {data.liveUrl && (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-accent hover:underline inline-flex items-center gap-1"
                >
                  {t("commands.projects.fieldLive")} ↗
                </a>
              )}
              {data.repoUrl && (
                <a
                  href={data.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-accent hover:underline inline-flex items-center gap-1"
                >
                  {t("commands.projects.fieldRepo")} ↗
                </a>
              )}
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-2 mt-1 text-[13px] leading-relaxed max-w-[720px]">
            <p className="text-accent font-semibold">{data.header}</p>
            <div className="space-y-1 text-textSecondary">
              <p>• {data.languages}</p>
              <p>• {data.frameworks}</p>
              <p>• {data.foundations}</p>
              <p>• {data.strengths}</p>
            </div>
            <div className="pt-1 text-[12px]">
              <a
                href="https://juicy-resolution-f28.notion.site/My-CS-Journey-56da4e6378854b02a0dda599d55d633d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-mono inline-flex items-center gap-1"
              >
                {data.roadmap} ↗
              </a>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-2 mt-1 text-[13px]">
            <p className="text-accent font-semibold">{data.header}</p>
            <div className="space-y-1.5">
              {data.items.map((item, idx) => {
                const isInternal = item.value.startsWith("/");
                return (
                  <div
                    key={`contact-${idx}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
                  >
                    <span className="font-semibold text-textPrimary w-[160px] shrink-0">
                      {item.label}:
                    </span>
                    {isInternal ? (
                      <Link
                        to={item.value}
                        className="text-accent hover:underline font-mono"
                      >
                        {item.value} ↗
                      </Link>
                    ) : (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline font-mono break-all"
                      >
                        {item.value} ↗
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "history":
        return (
          <div className="space-y-2 mt-1 text-[13px]">
            <p className="text-accent font-semibold">{data.header}</p>
            {data.items.length === 0 ? (
              <p className="text-textMuted italic">{data.emptyMessage}</p>
            ) : (
              <div className="space-y-1 font-mono text-textSecondary">
                {data.items.map((cmd, idx) => (
                  <div key={`hist-${idx}`} className="flex items-center gap-3">
                    <span className="text-textMuted w-6 text-right select-none">
                      {idx + 1}
                    </span>
                    <span className="text-textPrimary">{cmd}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "tree":
        return (
          <div className="font-mono text-[12px] sm:text-[13px] leading-relaxed mt-1 overflow-x-auto whitespace-pre select-none">
            {data.lines.map((item, idx) => (
              <div key={`tree-${idx}`}>
                <span className="text-textMuted">{item.prefix}</span>
                <span
                  className={
                    item.isDir ? "text-accent font-semibold" : "text-textPrimary"
                  }
                >
                  {item.name}
                </span>
              </div>
            ))}
            <div className="text-textMuted pt-1.5">{data.summary}</div>
          </div>
        );

      case "tab_candidates":
        return (
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[13px] text-textSecondary mt-1 select-none">
            {data.candidates.map((c, idx) => (
              <span
                key={`tab-c-${idx}`}
                className={
                  c.endsWith("/")
                    ? "text-accent font-semibold"
                    : "text-textPrimary"
                }
              >
                {c}
              </span>
            ))}
          </div>
        );

      case "error":
        return (
          <div className="space-y-0.5 mt-1 font-mono text-[13px]">
            <p className="text-rose-400 font-semibold whitespace-pre-wrap">
              {data.message}
            </p>
            {data.hint && (
              <p className="text-textMuted text-[12px]">{data.hint}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="w-full bg-surfaceElevated border border-borderSubtle rounded-2xl shadow-card overflow-hidden flex flex-col font-mono text-[14px] transition-all duration-200"
      onClick={handleFocusInput}
    >
      {/* Terminal Titlebar Chrome (Clear button removed as required) */}
      <header className="px-4 py-3 bg-surface/80 border-b border-borderSubtle flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          {/* Window control dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 inline-block" />
          </div>

          {/* Session label */}
          <span className="text-textSecondary text-[12px] sm:text-[13px] font-medium tracking-wide">
            {t("windowTitle")}
          </span>
        </div>

        {/* Clean right side telemetry without awkward gap */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-textMuted font-mono">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            <span>{t("sessionStatus")}</span>
          </div>
        </div>
      </header>

      {/* Terminal Body */}
      <div
        role="log"
        aria-live="polite"
        className="flex-1 min-h-[380px] p-4 sm:p-6 space-y-3 cursor-text bg-canvas/40"
      >
        {/* Command & Output History */}
        {history.map((item) => (
          <div key={item.id} className="space-y-1 pt-1">
            <div className="flex items-center gap-2 text-[13px] sm:text-[14px] flex-wrap">
              <span className="text-textMuted text-[11px] select-none">
                [{item.timestamp}]
              </span>
              <div className="flex items-center gap-1 select-none font-mono">
                <span className="text-accent font-semibold">
                  {item.user}@{item.hostname}
                </span>
                <span className="text-textSecondary">:</span>
                <span className="text-emerald-400 font-semibold">
                  {formatPromptPath(item.cwd)}
                </span>
                <span className="text-accent font-bold">$</span>
              </div>
              <span className="text-textPrimary font-medium pl-0.5">
                {item.command}
              </span>
            </div>
            {item.result && (
              <div className="pl-4 sm:pl-6">{renderOutput(item.result)}</div>
            )}
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-2 pt-2 flex-wrap">
          <div className="flex items-center gap-1 select-none font-mono text-[13px] sm:text-[14px] shrink-0">
            <span className="text-accent font-semibold">
              {shellState.user}@{shellState.hostname}
            </span>
            <span className="text-textSecondary">:</span>
            <span className="text-emerald-400 font-semibold">
              {formatPromptPath(shellState.cwd)}
            </span>
            <span className="text-accent font-bold">$</span>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="terminal-input" className="sr-only">
              {t("promptAriaLabel")}
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("inputPlaceholder")}
              aria-label={t("promptAriaLabel")}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="w-full bg-transparent text-textPrimary placeholder:text-textMuted/40 outline-none border-none font-mono text-[13px] sm:text-[14px] caret-accent p-0 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Terminal Status Bar Footer */}
      <footer className="px-4 py-2 border-t border-borderSubtle bg-surface/60 flex items-center justify-between text-[11px] text-textMuted select-none">
        <div className="flex items-center gap-3">
          <span>{t("stats.node")}</span>
          <span className="text-borderSubtle">•</span>
          <span>{t("stats.shell")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">
            {i18n.language === "es" ? "↑↓ Historial" : "↑↓ History"}
          </span>
          <span className="hidden sm:inline text-borderSubtle">•</span>
          <span className="text-accent font-medium uppercase">
            {i18n.language}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default TerminalView;
