/**
 * @file src/pages/terminal-page/components/TerminalView.jsx
 * @description Interactive terminal shell component rendering window chrome,
 * simulated Bash prompt, initial ASCII-art welcome screen, virtual directory navigation,
 * and responsive command input.
 * @responsibility Render interactive terminal view, handle keyboard input, and manage virtual shell session.
 */

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TerminalOutput from "./TerminalOutput";
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
              <div className="pl-4 sm:pl-6">
                <TerminalOutput result={item.result} />
              </div>
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
