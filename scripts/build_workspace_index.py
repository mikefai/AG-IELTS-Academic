#!/usr/bin/env python3
"""
Workspace Index & Portal Builder
Scans the entire workspace for educational markdown files and interactive HTML simulators,
then generates WORKSPACE_INDEX.md and updates the root index.html dashboard.
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime

# Ensure UTF-8 stdout on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
DOMAINS = ["ESL", "IELTS", "SAT", "YDT"]
EXCLUDED_MD = {"README.md", "AGENTS.md", "GEMINI.md", "WORKSPACE_INDEX.md", "routing.md"}


def extract_frontmatter(content: str):
    if not content.startswith("---"):
        return {}
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}
    metadata = {}
    for line in parts[1].strip().split("\n"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" in line:
            k, v = line.split(":", 1)
            metadata[k.strip()] = v.strip().strip('"').strip("'")
    return metadata


def scan_workspace():
    items = []
    
    # 1. Scan Markdown content
    for domain in DOMAINS:
        domain_dir = WORKSPACE_ROOT / domain
        if not domain_dir.exists():
            continue
        for md_file in domain_dir.rglob("*.md"):
            if md_file.name in EXCLUDED_MD:
                continue
            try:
                content = md_file.read_text(encoding="utf-8")
                meta = extract_frontmatter(content)
                title_match = re.search(r"^#\s+(.+)$", content, re.M)
                title = title_match.group(1).strip() if title_match else md_file.stem.replace("_", " ").title()
                # Clean markdown formatting from title
                title = re.sub(r"^[^\w\s]+", "", title).strip()

                rel_path = md_file.relative_to(WORKSPACE_ROOT).as_posix()
                items.append({
                    "title": title or md_file.stem,
                    "domain": meta.get("domain", domain),
                    "target_level": meta.get("target_level", "All Levels"),
                    "topic": meta.get("topic", md_file.stem.replace("_", " ").title()),
                    "date_created": meta.get("date_created", "2026"),
                    "content_type": meta.get("content_type", "Document"),
                    "path": rel_path,
                    "is_interactive": False,
                    "file_type": "Markdown"
                })
            except Exception as e:
                print(f"Error reading {md_file}: {e}")

    # 2. Scan Interactive HTML simulators
    for html_file in WORKSPACE_ROOT.rglob("*.html"):
        if html_file.name in {"index.html"} and html_file.parent == WORKSPACE_ROOT:
            continue
        # Skip node_modules or hidden folders if any
        if any(part.startswith(".") for part in html_file.parts):
            continue
        try:
            content = html_file.read_text(encoding="utf-8")
            title_match = re.search(r"<title>(.*?)</title>", content, re.I | re.S)
            title = title_match.group(1).strip() if title_match else html_file.stem.replace("_", " ").title()
            
            # Determine domain from path
            domain = "General"
            for d in DOMAINS:
                if d in html_file.parts:
                    domain = d
                    break

            rel_path = html_file.relative_to(WORKSPACE_ROOT).as_posix()
            items.append({
                "title": title,
                "domain": domain,
                "target_level": "Interactive Webapp",
                "topic": html_file.stem.replace("_", " ").title(),
                "date_created": "2026",
                "content_type": "Interactive Simulator",
                "path": rel_path,
                "is_interactive": True,
                "file_type": "HTML Simulator"
            })
        except Exception as e:
            print(f"Error reading {html_file}: {e}")

    return items


def generate_markdown_index(items):
    out = [
        "# 📚 Master Workspace Educational Content Catalog",
        "",
        f"> *Auto-generated on {datetime.now().strftime('%Y-%m-%d %H:%M')} via `scripts/build_workspace_index.py`*",
        "",
        "This catalog indexes all structured lesson plans, test prep modules, question banks, and interactive simulators across the workspace.",
        "",
        "---",
        ""
    ]

    for domain in DOMAINS:
        domain_items = [it for it in items if it["domain"].upper() == domain]
        out.append(f"## 🌐 {domain} Modules & Resources ({len(domain_items)} Total)")
        out.append("")
        if not domain_items:
            out.append(f"*No content files currently created in `{domain}/`.*")
            out.append("")
            continue

        out.append("| Type | Title / Topic | Target Level | Format | Direct Link |")
        out.append("| :--- | :--- | :--- | :--- | :--- |")
        for it in sorted(domain_items, key=lambda x: (x["content_type"], x["title"])):
            fmt = "🚀 **Interactive App**" if it["is_interactive"] else "📄 Markdown"
            out.append(f"| {it['content_type']} | {it['topic']} | `{it['target_level']}` | {fmt} | [{it['title']}]({it['path']}) |")
        out.append("")

    return "\n".join(out)


def generate_root_portal_html(items):
    items_json = json.dumps(items, ensure_ascii=False, indent=2)
    return f"""<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AG Teaching Portal | Educational Content & Exam Simulators</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg: #f8fafc;
      --surface: #ffffff;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --primary-light: #eff6ff;
      --border: #e2e8f0;
      --tag-ielts: #ef4444;
      --tag-sat: #8b5cf6;
      --tag-ydt: #f59e0b;
      --tag-esl: #10b981;
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
      --radius: 12px;
      --font: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }}

    [data-theme="dark"] {{
      --bg: #0b0f19;
      --surface: #131b2e;
      --card-bg: #1e293b;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --primary: #60a5fa;
      --primary-hover: #3b82f6;
      --primary-light: #1e293b;
      --border: #334155;
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3);
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: var(--font);
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding-bottom: 60px;
    }}

    header {{
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow);
    }}

    .header-content {{
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}

    .brand {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .brand-icon {{
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      font-weight: 800;
      padding: 8px 14px;
      border-radius: 10px;
      font-size: 1.2rem;
    }}

    .brand h1 {{
      font-size: 1.25rem;
      font-weight: 700;
    }}

    .brand p {{
      font-size: 0.85rem;
      color: var(--text-muted);
    }}

    .theme-toggle {{
      background: var(--primary-light);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }}

    main {{
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }}

    .hero-banner {{
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08));
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      margin-bottom: 2rem;
      text-align: center;
    }}

    .hero-banner h2 {{
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }}

    .hero-banner p {{
      color: var(--text-muted);
      max-width: 650px;
      margin: 0 auto 1.5rem auto;
    }}

    .stats-row {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }}

    .stat-card {{
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 1.25rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      text-align: center;
    }}

    .stat-number {{
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--primary);
    }}

    .stat-label {{
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }}

    .filter-bar {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 2rem;
      align-items: center;
    }}

    .filter-btn {{
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }}

    .filter-btn.active {{
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }}

    .search-input {{
      flex: 1;
      min-width: 250px;
      padding: 10px 16px;
      border-radius: 20px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-family: inherit;
    }}

    .card-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1.5rem;
    }}

    .content-card {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }}

    .content-card:hover {{
      transform: translateY(-3px);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    }}

    .card-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }}

    .domain-badge {{
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      text-transform: uppercase;
    }}

    .domain-IELTS {{ background: #fee2e2; color: #dc2626; }}
    .domain-SAT {{ background: #ede9fe; color: #7c3aed; }}
    .domain-YDT {{ background: #fef3c7; color: #d97706; }}
    .domain-ESL {{ background: #dcfce7; color: #16a34a; }}
    .domain-General {{ background: #e2e8f0; color: #475569; }}

    .level-badge {{
      font-size: 0.75rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }}

    .card-title {{
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }}

    .card-meta {{
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1.25rem;
    }}

    .card-actions {{
      display: flex;
      gap: 10px;
    }}

    .btn-launch {{
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 16px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      background: var(--primary);
      color: white;
      transition: background 0.2s;
    }}

    .btn-launch:hover {{
      background: var(--primary-hover);
    }}

    .btn-interactive {{
      background: linear-gradient(135deg, #10b981, #059669);
    }}

    .btn-interactive:hover {{
      background: linear-gradient(135deg, #059669, #047857);
    }}
  </style>
</head>
<body>

  <header>
    <div class="header-content">
      <div class="brand">
        <div class="brand-icon">AG</div>
        <div>
          <h1>AG Teaching & Exam Prep Hub</h1>
          <p>ESL • IELTS Academic • Digital SAT • YDT</p>
        </div>
      </div>
      <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()">🌓 Theme</button>
    </div>
  </header>

  <main>
    <div class="hero-banner">
      <h2>Curriculum & Interactive Practice Center</h2>
      <p>Seamlessly navigate verified pedagogical lesson plans, high-yield discrete drills, and client-side exam simulators.</p>
    </div>

    <div class="stats-row" id="statsContainer">
      <!-- Injected by JS -->
    </div>

    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterDomain('ALL')">All Modules</button>
      <button class="filter-btn" onclick="filterDomain('IELTS')">IELTS Academic</button>
      <button class="filter-btn" onclick="filterDomain('SAT')">Digital SAT</button>
      <button class="filter-btn" onclick="filterDomain('YDT')">YDT İngilizce</button>
      <button class="filter-btn" onclick="filterDomain('ESL')">ESL</button>
      <button class="filter-btn" onclick="filterInteractive()">🚀 Interactive Simulators</button>
      <input type="text" class="search-input" id="searchBox" placeholder="🔍 Search topics, skills, or titles..." oninput="handleSearch()">
    </div>

    <div class="card-grid" id="contentGrid">
      <!-- Injected by JS -->
    </div>
  </main>

  <script>
    const items = {items_json};

    let activeFilter = 'ALL';
    let onlyInteractive = false;
    let searchQuery = '';

    function toggleTheme() {{
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ag_theme', next);
    }}

    const savedTheme = localStorage.getItem('ag_theme');
    if (savedTheme) {{
      document.documentElement.setAttribute('data-theme', savedTheme);
    }}

    function renderStats() {{
      const total = items.length;
      const interactive = items.filter(i => i.is_interactive).length;
      const ielts = items.filter(i => i.domain === 'IELTS').length;
      const sat = items.filter(i => i.domain === 'SAT').length;
      const ydt = items.filter(i => i.domain === 'YDT').length;
      const esl = items.filter(i => i.domain === 'ESL').length;

      document.getElementById('statsContainer').innerHTML = `
        <div class="stat-card">
          <div class="stat-number">${{total}}</div>
          <div class="stat-label">Total Resources</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #10b981;">${{interactive}}</div>
          <div class="stat-label">Interactive Apps</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #ef4444;">${{ielts}}</div>
          <div class="stat-label">IELTS Academic</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #8b5cf6;">${{sat}}</div>
          <div class="stat-label">SAT Modules</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" style="color: #f59e0b;">${{ydt}}</div>
          <div class="stat-label">YDT Modules</div>
        </div>
      `;
    }}

    function renderGrid() {{
      const grid = document.getElementById('contentGrid');
      const filtered = items.filter(item => {{
        if (onlyInteractive && !item.is_interactive) return false;
        if (activeFilter !== 'ALL' && item.domain !== activeFilter) return false;
        if (searchQuery) {{
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchTopic = item.topic.toLowerCase().includes(q);
          const matchLevel = item.target_level.toLowerCase().includes(q);
          if (!matchTitle && !matchTopic && !matchLevel) return false;
        }}
        return true;
      }});

      if (filtered.length === 0) {{
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No matching resources found.</div>';
        return;
      }}

      grid.innerHTML = filtered.map(item => `
        <div class="content-card">
          <div>
            <div class="card-header">
              <span class="domain-badge domain-${{item.domain}}">${{item.domain}}</span>
              <span class="level-badge">${{item.target_level}}</span>
            </div>
            <h3 class="card-title">${{item.title}}</h3>
            <p class="card-meta">
              <strong>Type:</strong> ${{item.content_type}}<br>
              <strong>Topic:</strong> ${{item.topic}}
            </p>
          </div>
          <div class="card-actions">
            <a href="${{item.path}}" class="btn-launch ${{item.is_interactive ? 'btn-interactive' : ''}}">
              ${{item.is_interactive ? '🚀 Launch Simulator' : '📄 Open Document'}}
            </a>
          </div>
        </div>
      `).join('');
    }}

    function filterDomain(dom) {{
      activeFilter = dom;
      onlyInteractive = false;
      updateFilterButtons();
      renderGrid();
    }}

    function filterInteractive() {{
      onlyInteractive = !onlyInteractive;
      updateFilterButtons();
      renderGrid();
    }}

    function updateFilterButtons() {{
      document.querySelectorAll('.filter-btn').forEach(btn => {{
        btn.classList.remove('active');
        if (!onlyInteractive && btn.innerText.includes(activeFilter)) {{
          btn.classList.add('active');
        }} else if (onlyInteractive && btn.innerText.includes('Interactive')) {{
          btn.classList.add('active');
        }} else if (!onlyInteractive && activeFilter === 'ALL' && btn.innerText.includes('All')) {{
          btn.classList.add('active');
        }}
      }});
    }}

    function handleSearch() {{
      searchQuery = document.getElementById('searchBox').value.trim();
      renderGrid();
    }}

    renderStats();
    renderGrid();
  </script>
</body>
</html>
"""


def main():
    print("Scanning workspace items...")
    items = scan_workspace()
    print(f"Found {len(items)} content items ({sum(1 for i in items if i['is_interactive'])} interactive).")

    # Generate Markdown Index
    md_index = generate_markdown_index(items)
    (WORKSPACE_ROOT / "WORKSPACE_INDEX.md").write_text(md_index, encoding="utf-8")
    print("Updated WORKSPACE_INDEX.md")

    # Generate Root Portal HTML
    portal_html = generate_root_portal_html(items)
    (WORKSPACE_ROOT / "index.html").write_text(portal_html, encoding="utf-8")
    print("Updated index.html portal.")


if __name__ == "__main__":
    main()
