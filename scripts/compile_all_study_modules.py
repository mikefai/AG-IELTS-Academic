#!/usr/bin/env python3
"""
Universal Study Module Webpage Compiler
Compiles every markdown study module in IELTS, SAT, ESL, and YDT into a standalone,
offline-capable, responsive interactive HTML study webpage with domain themes,
interactive practice tools, dark mode, font scaling, and print support.
"""

import os
import sys
import re
import json
from pathlib import Path
import html

# Ensure UTF-8 stdout
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent

DOMAIN_THEMES = {
    "IELTS": {
        "primary": "#ef4444",
        "primary_dark": "#dc2626",
        "primary_light": "rgba(239, 68, 68, 0.08)",
        "icon": "🎯",
        "title": "IELTS Academic Portal"
    },
    "SAT": {
        "primary": "#8b5cf6",
        "primary_dark": "#7c3aed",
        "primary_light": "rgba(139, 92, 246, 0.08)",
        "icon": "🏛️",
        "title": "Digital SAT Portal"
    },
    "ESL": {
        "primary": "#10b981",
        "primary_dark": "#059669",
        "primary_light": "rgba(16, 185, 129, 0.08)",
        "icon": "🌍",
        "title": "ESL Learning Portal"
    },
    "YDT": {
        "primary": "#f59e0b",
        "primary_dark": "#d97706",
        "primary_light": "rgba(245, 158, 11, 0.08)",
        "icon": "🇹🇷",
        "title": "YDT İngilizce Portal"
    }
}


def parse_frontmatter_and_markdown(md_text: str):
    """Extracts frontmatter metadata and body markdown."""
    metadata = {}
    body = md_text

    if md_text.startswith("---"):
        parts = md_text.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1].strip()
            for line in fm_text.split("\n"):
                if ":" in line:
                    k, v = line.split(":", 1)
                    metadata[k.strip()] = v.strip().strip('"').strip("'")
            body = parts[2].strip()

    title_match = re.search(r"^#\s+(.+)$", body, re.M)
    title = title_match.group(1).strip() if title_match else metadata.get("topic", "Study Module")
    # Clean emoji from title for clean display if desired
    clean_title = re.sub(r"^[^\w\s]+", "", title).strip()

    return metadata, clean_title, body


def markdown_to_html_rich(md: str) -> str:
    """Converts standard markdown text to clean, semantic HTML."""
    lines = md.split("\n")
    out = []
    in_code = False
    code_lang = ""
    code_lines = []
    in_table = False
    table_lines = []
    in_list = False

    def close_table(tbl_lines):
        if not tbl_lines:
            return ""
        html_tbl = ['<div class="table-container"><table class="data-table">']
        header_done = False
        for row_str in tbl_lines:
            if re.match(r"^\|\s*[-:]+\s*\|", row_str):
                continue  # separator
            cols = [c.strip() for c in row_str.strip().strip("|").split("|")]
            if not header_done:
                html_tbl.append("<thead><tr>")
                for c in cols:
                    html_tbl.append(f"<th>{process_inline(c)}</th>")
                html_tbl.append("</tr></thead><tbody>")
                header_done = True
            else:
                html_tbl.append("<tr>")
                for c in cols:
                    html_tbl.append(f"<td>{process_inline(c)}</td>")
                html_tbl.append("</tr>")
        if header_done:
            html_tbl.append("</tbody>")
        html_tbl.append("</table></div>")
        return "\n".join(html_tbl)

    def process_inline(text: str) -> str:
        # 1. Pre-protect Markdown links
        links = []
        def save_link(m):
            link_text = m.group(1)
            link_url = m.group(2).strip()
            if "file:///" in link_url:
                link_url = link_url.split("/")[-1]
            links.append((link_text, link_url))
            return f"@@LINK_{len(links)-1}@@"

        # 2. Pre-protect inline code
        codes = []
        def save_code(m):
            code_text = html.escape(m.group(1))
            codes.append(code_text)
            return f"@@CODE_{len(codes)-1}@@"

        text = re.sub(r"\[(.+?)\]\((.+?)\)", save_link, text)
        text = re.sub(r"`(.+?)`", save_code, text)

        # 3. Escape HTML
        text = html.escape(text, quote=False)

        # 4. Bold and Italic formatting
        text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
        text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
        text = re.sub(r"(?<!\w)_(.+?)_(?!\w)", r"<em>\1</em>", text)

        # 5. Restore Code
        for idx, c in enumerate(codes):
            text = text.replace(f"@@CODE_{idx}@@", f"<code>{c}</code>")

        # 6. Restore Links
        for idx, (lt, lu) in enumerate(links):
            text = text.replace(f"@@LINK_{idx}@@", f'<a href="{lu}">{html.escape(lt)}</a>')

        return text

    i = 0
    while i < len(lines):
        line = lines[i]

        # Code block handling
        if line.startswith("```"):
            if not in_code:
                in_code = True
                code_lang = line.strip("`").strip()
                code_lines = []
            else:
                in_code = False
                escaped_code = html.escape("\n".join(code_lines))
                out.append(f'<div class="code-block-wrapper"><div class="code-header"><span>{code_lang or "Code"}</span><button class="btn-copy-code" onclick="copyCode(this)">📋 Copy</button></div><pre><code class="language-{code_lang}">{escaped_code}</code></pre></div>')
            i += 1
            continue

        if in_code:
            code_lines.append(line)
            i += 1
            continue

        # Table handling
        if line.strip().startswith("|") and line.strip().endswith("|"):
            if not in_table:
                in_table = True
                table_lines = [line]
            else:
                table_lines.append(line)
            i += 1
            continue
        elif in_table:
            in_table = False
            out.append(close_table(table_lines))
            table_lines = []

        # List handling
        if re.match(r"^[-*]\s+", line):
            if not in_list:
                in_list = True
                out.append('<ul class="study-list">')
            item_content = re.sub(r"^[-*]\s+", "", line)
            out.append(f"<li>{process_inline(item_content)}</li>")
            i += 1
            continue
        elif in_list:
            in_list = False
            out.append("</ul>")

        # Headings
        h_match = re.match(r"^(#{1,6})\s+(.+)$", line)
        if h_match:
            level = len(h_match.group(1))
            heading_text = h_match.group(2).strip()
            slug = re.sub(r"[^\w\s-]", "", heading_text).strip().replace(" ", "-").lower()
            out.append(f'<h{level} id="{slug}" class="study-heading h{level}">{process_inline(heading_text)}</h{level}>')
            i += 1
            continue

        # Alerts (GitHub Style > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING])
        alert_match = re.match(r"^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]", line, re.I)
        if alert_match:
            alert_type = alert_match.group(1).upper()
            alert_body = []
            i += 1
            while i < len(lines) and lines[i].startswith(">"):
                alert_body.append(re.sub(r"^>\s?", "", lines[i]))
                i += 1
            alert_html = process_inline(" ".join(alert_body))
            out.append(f'<div class="alert alert-{alert_type.lower()}"><div class="alert-title">📌 {alert_type}</div><div class="alert-content">{alert_html}</div></div>')
            continue

        # Standard Blockquote
        if line.startswith(">"):
            bq_lines = []
            while i < len(lines) and lines[i].startswith(">"):
                bq_lines.append(re.sub(r"^>\s?", "", lines[i]))
                i += 1
            bq_html = process_inline(" ".join(bq_lines))
            out.append(f'<blockquote class="study-quote">{bq_html}</blockquote>')
            continue

        # Horizontal Rule
        if re.match(r"^(\*{3,}|-{3,}|_{3,})$", line.strip()):
            out.append('<hr class="study-divider">')
            i += 1
            continue

        # Empty Line
        if not line.strip():
            i += 1
            continue

        # Regular Paragraph
        out.append(f"<p>{process_inline(line)}</p>")
        i += 1

    if in_table:
        out.append(close_table(table_lines))
    if in_list:
        out.append("</ul>")

    return "\n".join(out)


def build_module_webpage(md_path: Path) -> Path:
    """Generates an HTML study webpage for a given markdown module."""
    content = md_path.read_text(encoding="utf-8")
    meta, title, body = parse_frontmatter_and_markdown(content)
    domain = meta.get("domain", "General").upper()
    level = meta.get("target_level", "All Levels")
    topic = meta.get("topic", title)
    content_type = meta.get("content_type", "Study Module")
    date_created = meta.get("date_created", "2026")

    theme = DOMAIN_THEMES.get(domain, {
        "primary": "#3b82f6",
        "primary_dark": "#2563eb",
        "primary_light": "rgba(59, 130, 246, 0.08)",
        "icon": "📚",
        "title": "Study Workspace"
    })

    # Render Markdown body to HTML
    rendered_body = markdown_to_html_rich(body)

    # Detect interactive tools needed
    is_writing = "writing" in md_path.as_posix().lower() or "task1" in md_path.as_posix().lower() or "task2" in md_path.as_posix().lower()
    is_speaking = "speaking" in md_path.as_posix().lower()
    target_words = 150 if "task1" in md_path.as_posix().lower() else 250

    # Determine relative path back to domain index.html
    rel_parts_count = len(md_path.relative_to(WORKSPACE_ROOT / (domain if domain != 'GENERAL' else '')).parts) - 1
    portal_href = "../" * rel_parts_count + "index.html" if rel_parts_count > 0 else "index.html"

    # Interactive Writing Arena Widget (if writing module)
    writing_widget_html = ""
    if is_writing:
        writing_widget_html = f"""
        <section class="interactive-tool-card" id="writing-arena">
          <div class="tool-header">
            <div class="tool-title">✍️ Interactive Writing Arena & Live Word Tracker</div>
            <div class="tool-badges">
              <span class="badge">Target: {target_words}+ Words</span>
              <span class="badge" id="timerDisplay">20:00</span>
            </div>
          </div>
          <div class="tool-body">
            <div class="timer-controls">
              <button class="btn-tool" onclick="startWritingTimer({20 if target_words==150 else 40})">▶️ Start Timer ({20 if target_words==150 else 40}m)</button>
              <button class="btn-tool btn-tool-outline" onclick="pauseWritingTimer()">⏸️ Pause</button>
              <button class="btn-tool btn-tool-outline" onclick="resetWritingTimer({20 if target_words==150 else 40})">🔄 Reset</button>
              <button class="btn-tool btn-tool-outline" onclick="clearWritingDraft()">🗑️ Clear</button>
            </div>
            <textarea id="essayEditor" placeholder="Type your response here to practice timed exam conditions..." rows="12" oninput="updateWordStats({target_words})"></textarea>
            <div class="stats-bar">
              <div class="stat-group">
                <span class="stat-label">Word Count:</span>
                <span class="stat-value" id="wordCount">0</span> / {target_words} words
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" id="wordProgressBar" style="width: 0%;"></div>
              </div>
              <div id="wordFeedback" class="word-status-badge">Need {target_words} words</div>
            </div>
          </div>
        </section>
        """

    # Interactive Speaking Practice Timer Widget (if speaking module)
    speaking_widget_html = ""
    if is_speaking:
        speaking_widget_html = """
        <section class="interactive-tool-card" id="speaking-arena">
          <div class="tool-header">
            <div class="tool-title">🎙️ Speaking Exam Timer & Audio Prompter</div>
            <div class="tool-badges">
              <span class="badge" id="speakingPhaseBadge">Ready</span>
              <span class="badge" id="speakingTimerDisplay">01:00</span>
            </div>
          </div>
          <div class="tool-body">
            <div class="speaking-controls">
              <button class="btn-tool" onclick="startSpeakingPrep()">⏱️ 1-Minute Prep</button>
              <button class="btn-tool btn-tool-primary" onclick="startSpeakingTurn()">🎙️ 2-Minute Long Turn</button>
              <button class="btn-tool btn-tool-outline" onclick="stopSpeakingTimer()">⏹️ Stop</button>
              <button class="btn-tool btn-tool-outline" onclick="readPromptAloud()">🔊 Listen to Prompt</button>
            </div>
            <div class="speaking-progress-container">
              <div class="speaking-progress-bar" id="speakingProgressBar" style="width: 0%;"></div>
            </div>
            <div class="speaking-cue-feedback" id="speakingFeedback">Click '1-Minute Prep' to begin your planning time.</div>
          </div>
        </section>
        """

    html_content = f"""<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(title)} | {domain} Academic Study Module</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --primary: {theme['primary']};
      --primary-dark: {theme['primary_dark']};
      --primary-light: {theme['primary_light']};
      --bg: #f8fafc;
      --surface: #ffffff;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
      --radius: 12px;
      --font: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --base-font-size: 16px;
    }}

    [data-theme="dark"] {{
      --bg: #0b0f19;
      --surface: #131b2e;
      --card-bg: #1e293b;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --primary-light: rgba(255, 255, 255, 0.05);
      --border: #334155;
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3);
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    html {{ font-size: var(--base-font-size); }}
    body {{
      font-family: var(--font);
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.7;
      padding-bottom: 80px;
    }}

    header {{
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
      padding: 0.85rem 1.5rem;
    }}

    .header-container {{
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}

    .nav-left {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .btn-back {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 8px;
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }}
    .btn-back:hover {{
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }}

    .domain-tag {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 6px;
      background: {theme['primary_light']};
      color: var(--primary);
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
    }}

    .nav-actions {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .btn-action {{
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.85rem;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }}
    .btn-action:hover {{
      border-color: var(--primary);
      color: var(--primary);
    }}

    main {{
      max-width: 1080px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }}

    .module-hero {{
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2.25rem;
      box-shadow: var(--shadow);
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
    }}

    .module-hero::before {{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary), #3b82f6);
    }}

    .module-meta-pills {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 1rem;
    }}

    .meta-pill {{
      font-size: 0.8rem;
      padding: 4px 12px;
      border-radius: 20px;
      background: var(--bg);
      border: 1px solid var(--border);
      font-weight: 600;
      color: var(--text-muted);
    }}

    .meta-pill.highlight {{
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }}

    .module-title {{
      font-size: 2rem;
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 0.75rem;
      color: var(--text);
    }}

    .module-content-card {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2.5rem;
      box-shadow: var(--shadow);
      margin-bottom: 2rem;
    }}

    /* Typography inside content */
    .study-heading {{
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 800;
      color: var(--text);
      scroll-margin-top: 80px;
    }}
    .study-heading.h1 {{ font-size: 1.8rem; border-bottom: 2px solid var(--border); padding-bottom: 0.5rem; }}
    .study-heading.h2 {{ font-size: 1.45rem; border-left: 4px solid var(--primary); padding-left: 12px; }}
    .study-heading.h3 {{ font-size: 1.2rem; color: var(--primary); }}
    .study-heading.h4 {{ font-size: 1.05rem; font-weight: 700; }}

    p {{
      margin-bottom: 1.25rem;
      color: var(--text);
    }}

    /* Lists */
    .study-list {{
      margin: 1rem 0 1.5rem 1.5rem;
    }}
    .study-list li {{
      margin-bottom: 0.6rem;
    }}

    /* Code blocks */
    .code-block-wrapper {{
      background: #0f172a;
      border-radius: 10px;
      overflow: hidden;
      margin: 1.5rem 0;
      border: 1px solid #334155;
    }}
    .code-header {{
      background: #1e293b;
      padding: 8px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #94a3b8;
      font-size: 0.75rem;
      font-family: var(--font-mono);
      font-weight: 700;
      text-transform: uppercase;
    }}
    .btn-copy-code {{
      background: transparent;
      border: 1px solid #475569;
      color: #cbd5e1;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
    }}
    .btn-copy-code:hover {{
      background: #334155;
      color: #fff;
    }}
    pre {{
      padding: 1.25rem;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      line-height: 1.6;
      color: #e2e8f0;
    }}

    /* Tables */
    .table-container {{
      overflow-x: auto;
      margin: 1.5rem 0;
      border: 1px solid var(--border);
      border-radius: 10px;
    }}
    .data-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
      text-align: left;
    }}
    .data-table th {{
      background: var(--bg);
      padding: 12px 16px;
      border-bottom: 2px solid var(--border);
      font-weight: 700;
      color: var(--text);
    }}
    .data-table td {{
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      color: var(--text);
    }}
    .data-table tr:last-child td {{
      border-bottom: none;
    }}
    .data-table tr:hover td {{
      background: var(--primary-light);
    }}

    /* Alerts */
    .alert {{
      border-radius: 10px;
      padding: 1.25rem;
      margin: 1.5rem 0;
      border-left: 4px solid;
    }}
    .alert-title {{
      font-weight: 800;
      font-size: 0.85rem;
      text-transform: uppercase;
      margin-bottom: 0.4rem;
    }}
    .alert-note {{ background: rgba(59, 130, 246, 0.08); border-color: #3b82f6; color: var(--text); }}
    .alert-tip {{ background: rgba(16, 185, 129, 0.08); border-color: #10b981; color: var(--text); }}
    .alert-important {{ background: rgba(239, 68, 68, 0.08); border-color: #ef4444; color: var(--text); }}
    .alert-warning {{ background: rgba(245, 158, 11, 0.08); border-color: #f59e0b; color: var(--text); }}

    /* Quotes */
    .study-quote {{
      border-left: 4px solid var(--primary);
      padding: 1rem 1.25rem;
      background: var(--bg);
      border-radius: 0 10px 10px 0;
      margin: 1.5rem 0;
      font-style: italic;
      color: var(--text);
    }}

    .study-divider {{
      border: none;
      border-top: 1px solid var(--border);
      margin: 2.5rem 0;
    }}

    /* Interactive Tool Cards */
    .interactive-tool-card {{
      background: var(--surface);
      border: 2px solid var(--primary);
      border-radius: var(--radius);
      padding: 1.75rem;
      margin: 2rem 0;
      box-shadow: var(--shadow);
    }}
    .tool-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
      gap: 10px;
    }}
    .tool-title {{
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--primary);
    }}
    .tool-badges {{
      display: flex;
      gap: 8px;
    }}
    .badge {{
      background: var(--primary);
      color: #fff;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 700;
      font-family: var(--font-mono);
    }}
    .timer-controls, .speaking-controls {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 1rem;
    }}
    .btn-tool {{
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      background: var(--primary);
      color: #fff;
      transition: all 0.2s;
    }}
    .btn-tool:hover {{ opacity: 0.9; }}
    .btn-tool-outline {{
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
    }}
    .btn-tool-outline:hover {{
      border-color: var(--primary);
      color: var(--primary);
    }}
    textarea {{
      width: 100%;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      font-size: 1rem;
      padding: 1rem;
      line-height: 1.6;
      resize: vertical;
      margin-bottom: 1rem;
    }}
    textarea:focus {{
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-light);
    }}
    .stats-bar {{
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
    }}
    .progress-bar-bg, .speaking-progress-container {{
      flex: 1;
      height: 10px;
      background: var(--border);
      border-radius: 5px;
      overflow: hidden;
      min-width: 150px;
    }}
    .progress-bar-fill, .speaking-progress-bar {{
      height: 100%;
      background: #10b981;
      transition: width 0.3s ease;
    }}
    .word-status-badge {{
      font-size: 0.8rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--bg);
      border: 1px solid var(--border);
    }}

    footer {{
      text-align: center;
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.85rem;
    }}

    @media print {{
      header, .interactive-tool-card, footer, .btn-copy-code {{ display: none !important; }}
      body {{ background: #fff; color: #000; }}
      .module-content-card, .module-hero {{ border: none; box-shadow: none; padding: 0; }}
    }}
  </style>
</head>
<body>

  <header>
    <div class="header-container">
      <div class="nav-left">
        <a href="{portal_href}" class="btn-back">← Back to {theme['title']}</a>
        <span class="domain-tag">{theme['icon']} {domain}</span>
      </div>
      <div class="nav-actions">
        <button class="btn-action" onclick="adjustFontSize(-1)" title="Decrease font size">A-</button>
        <button class="btn-action" onclick="adjustFontSize(1)" title="Increase font size">A+</button>
        <button class="btn-action" onclick="window.print()" title="Print / Save PDF">🖨️ PDF</button>
        <button class="btn-action" onclick="toggleTheme()">🌓 Theme</button>
      </div>
    </div>
  </header>

  <main>
    <div class="module-hero">
      <div class="module-meta-pills">
        <span class="meta-pill highlight">{level}</span>
        <span class="meta-pill">{content_type}</span>
        <span class="meta-pill">📅 {date_created}</span>
      </div>
      <h1 class="module-title">{title}</h1>
      <p style="color: var(--text-muted); font-size: 0.95rem;">Interactive Academic Study Module • Pedagogically Scaffolded Curriculum</p>
    </div>

    {writing_widget_html}
    {speaking_widget_html}

    <article class="module-content-card">
      {rendered_body}
    </article>

    <footer>
      <p>{theme['icon']} {domain} Preparation Workspace • Built for Authentic Exam Success</p>
    </footer>
  </main>

  <script>
    // Theme Switcher
    function toggleTheme() {{
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('study_theme', next);
    }}
    (function() {{
      const saved = localStorage.getItem('study_theme');
      if (saved) document.documentElement.setAttribute('data-theme', saved);
    }})();

    // Font Scaling
    let currentScale = 16;
    function adjustFontSize(delta) {{
      currentScale = Math.min(22, Math.max(13, currentScale + delta));
      document.documentElement.style.setProperty('--base-font-size', currentScale + 'px');
      localStorage.setItem('study_font_size', currentScale);
    }}
    (function() {{
      const savedSize = localStorage.getItem('study_font_size');
      if (savedSize) {{
        currentScale = parseInt(savedSize, 10);
        document.documentElement.style.setProperty('--base-font-size', currentScale + 'px');
      }}
    }})();

    // Copy Code Helper
    function copyCode(btn) {{
      const pre = btn.closest('.code-block-wrapper').querySelector('pre code');
      if (pre) {{
        navigator.clipboard.writeText(pre.innerText).then(() => {{
          btn.innerText = '✅ Copied!';
          setTimeout(() => btn.innerText = '📋 Copy', 2000);
        }});
      }}
    }}

    // Writing Arena Logic
    let timerInterval = null;
    let timerSeconds = 1200; // 20m
    function startWritingTimer(mins) {{
      clearInterval(timerInterval);
      timerSeconds = mins * 60;
      updateTimerDisplay();
      timerInterval = setInterval(() => {{
        if (timerSeconds <= 0) {{
          clearInterval(timerInterval);
          alert('⏰ Time is up! Review and edit your response.');
          return;
        }}
        timerSeconds--;
        updateTimerDisplay();
      }}, 1000);
    }}
    function pauseWritingTimer() {{ clearInterval(timerInterval); }}
    function resetWritingTimer(mins) {{
      clearInterval(timerInterval);
      timerSeconds = mins * 60;
      updateTimerDisplay();
    }}
    function updateTimerDisplay() {{
      const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
      const s = (timerSeconds % 60).toString().padStart(2, '0');
      const el = document.getElementById('timerDisplay');
      if (el) el.innerText = `${{m}}:${{s}}`;
    }}
    function updateWordStats(target) {{
      const text = document.getElementById('essayEditor').value.trim();
      const words = text ? text.split(/\\s+/).length : 0;
      const countEl = document.getElementById('wordCount');
      const progEl = document.getElementById('wordProgressBar');
      const fbEl = document.getElementById('wordFeedback');
      if (countEl) countEl.innerText = words;
      const pct = Math.min(100, Math.round((words / target) * 100));
      if (progEl) {{
        progEl.style.width = pct + '%';
        progEl.style.background = words >= target ? '#10b981' : '#f59e0b';
      }}
      if (fbEl) {{
        if (words >= target) {{
          fbEl.innerText = `✅ Met Target (${{words}} words)`;
          fbEl.style.color = '#10b981';
        }} else {{
          fbEl.innerText = `Need ${{target - words}} more words`;
          fbEl.style.color = '#f59e0b';
        }}
      }}
      localStorage.setItem('draft_' + window.location.pathname, text);
    }}
    function clearWritingDraft() {{
      if (confirm('Clear current draft?')) {{
        document.getElementById('essayEditor').value = '';
        updateWordStats({target_words});
      }}
    }}
    (function() {{
      const saved = localStorage.getItem('draft_' + window.location.pathname);
      const editor = document.getElementById('essayEditor');
      if (saved && editor) {{
        editor.value = saved;
        updateWordStats({target_words});
      }}
    }})();

    // Speaking Arena Logic
    let speakingInterval = null;
    let speakingSecs = 60;
    function startSpeakingPrep() {{
      clearInterval(speakingInterval);
      speakingSecs = 60;
      document.getElementById('speakingPhaseBadge').innerText = '1-Min Prep';
      document.getElementById('speakingPhaseBadge').style.background = '#f59e0b';
      document.getElementById('speakingFeedback').innerText = 'Taking notes... Think about Past, Present, Future context.';
      speakingInterval = setInterval(() => {{
        if (speakingSecs <= 0) {{
          clearInterval(speakingInterval);
          alert('⏰ Prep time over! Begin speaking now.');
          startSpeakingTurn();
          return;
        }}
        speakingSecs--;
        updateSpeakingUI(60);
      }}, 1000);
    }}
    function startSpeakingTurn() {{
      clearInterval(speakingInterval);
      speakingSecs = 120;
      document.getElementById('speakingPhaseBadge').innerText = 'Speaking (2m)';
      document.getElementById('speakingPhaseBadge').style.background = '#10b981';
      document.getElementById('speakingFeedback').innerText = '🎙️ Speak continuously. Develop your points fully!';
      speakingInterval = setInterval(() => {{
        if (speakingSecs <= 0) {{
          clearInterval(speakingInterval);
          alert('🏁 2 minutes complete! Excellent practice.');
          document.getElementById('speakingPhaseBadge').innerText = 'Completed';
          return;
        }}
        speakingSecs--;
        updateSpeakingUI(120);
      }}, 1000);
    }}
    function stopSpeakingTimer() {{
      clearInterval(speakingInterval);
      document.getElementById('speakingPhaseBadge').innerText = 'Stopped';
    }}
    function updateSpeakingUI(total) {{
      const m = Math.floor(speakingSecs / 60).toString().padStart(2, '0');
      const s = (speakingSecs % 60).toString().padStart(2, '0');
      document.getElementById('speakingTimerDisplay').innerText = `${{m}}:${{s}}`;
      const elapsed = total - speakingSecs;
      const pct = Math.round((elapsed / total) * 100);
      document.getElementById('speakingProgressBar').style.width = pct + '%';
    }}
    function readPromptAloud() {{
      const title = document.querySelector('.module-title').innerText;
      if ('speechSynthesis' in window) {{
        const utterance = new SpeechSynthesisUtterance(title);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }} else {{
        alert('Text-to-speech not supported in this browser.');
      }}
    }}
  </script>
</body>
</html>
"""
    output_html_path = md_path.with_suffix(".html")
    output_html_path.write_text(html_content, encoding="utf-8")
    return output_html_path


def main():
    print("======================================================")
    print("   [+] Universal Study Module Webpage Compiler        ")
    print("======================================================")

    count = 0
    # Scan all markdown study modules in IELTS, SAT, ESL, YDT
    for domain_folder in ["IELTS", "SAT", "ESL", "YDT"]:
        folder = WORKSPACE_ROOT / domain_folder
        if not folder.exists():
            continue
        for md_path in folder.rglob("*.md"):
            if md_path.name in {"README.md", "WORKSPACE_INDEX.md", "AGENTS.md", "GEMINI.md"}:
                continue
            if "Templates" in md_path.parts:
                continue
            
            out_html = build_module_webpage(md_path)
            print(f"[COMPILED] {md_path.relative_to(WORKSPACE_ROOT)} ➔ {out_html.name}")
            count += 1

    print(f"\nSuccessfully compiled {count} study modules into interactive HTML webpages.")


if __name__ == "__main__":
    main()
