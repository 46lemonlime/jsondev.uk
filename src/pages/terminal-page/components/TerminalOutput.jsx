/**
 * @file src/pages/terminal-page/components/TerminalOutput.jsx
 * @description Dedicated presentation component for rendering structured terminal command outputs.
 * Supports standard text, long/short directory listings, help grids, project catalogs,
 * detail cards, skill matrices, contact channels, command history, directory trees,
 * autocomplete candidate pills, and simulated Bash error messages.
 * @responsibility Present structured command result payloads declaratively without mutating shell state.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/**
 * @param {Object} props
 * @param {Object|null} props.result - Structured command output object { type, data }.
 */
const TerminalOutput = ({ result }) => {
  const { t } = useTranslation("terminal");

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

export default TerminalOutput;
