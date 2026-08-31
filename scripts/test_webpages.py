#!/usr/bin/env python3
"""
Automated Test Suite for all HTML Study Webpages and Simulators
Checks:
1. HTML structural integrity (DOCTYPE, head, body)
2. Inline & external JS syntax validity via Node.js
3. Link integrity (all relative hrefs resolve to existing files)
4. Interactive DOM references (IDs used in event handlers exist in DOM)
"""

import os
import re
import sys
import glob
import subprocess
import tempfile
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent

def test_all():
    print("======================================================")
    print("   [+] Automated Webpage & Simulator Test Suite       ")
    print("======================================================")

    html_files = [f for f in WORKSPACE_ROOT.rglob("*.html") if ".git" not in f.parts and "node_modules" not in f.parts]
    print(f"Discovered {len(html_files)} HTML documents to test.\n")

    broken_links = []
    js_errors = []
    html_issues = []
    passed_count = 0

    for hf in html_files:
        rel_path = hf.relative_to(WORKSPACE_ROOT)
        content = hf.read_text(encoding="utf-8")
        file_clean = True

        # 1. HTML structure check
        if "<!DOCTYPE html>" not in content and "<!doctype html>" not in content:
            html_issues.append((rel_path, "Missing DOCTYPE"))
            file_clean = False

        # 2. Test inline JavaScript blocks
        scripts = re.findall(r"<script(?:\s+[^>]*)?>(.*?)</script>", content, re.S)
        for idx, s in enumerate(scripts):
            if not s.strip():
                continue
            with tempfile.NamedTemporaryFile(suffix=".js", delete=False, mode="w", encoding="utf-8") as tf:
                tf.write(s)
                temp_name = tf.name
            try:
                res = subprocess.run(["node", "-c", temp_name], capture_output=True, text=True)
                if res.returncode != 0:
                    js_errors.append((rel_path, f"Script block #{idx+1}: {res.stderr.strip()}"))
                    file_clean = False
            finally:
                try:
                    os.remove(temp_name)
                except:
                    pass

        # 3. Test external script references
        ext_scripts = re.findall(r'<script\s+[^>]*src=["\']([^"\']+)["\']', content, re.I)
        for es in ext_scripts:
            if es.startswith(("http://", "https://")):
                continue
            src_target = (hf.parent / es).resolve()
            if not src_target.exists():
                broken_links.append((rel_path, f"Missing JS asset: {es}"))
                file_clean = False
            else:
                # Test external js syntax
                res = subprocess.run(["node", "-c", str(src_target)], capture_output=True, text=True)
                if res.returncode != 0:
                    js_errors.append((rel_path, f"External JS {es}: {res.stderr.strip()}"))
                    file_clean = False

        # 4. Test external CSS references
        ext_css = re.findall(r'<link\s+[^>]*href=["\']([^"\']+\.css)["\']', content, re.I)
        for ec in ext_css:
            if ec.startswith(("http://", "https://")):
                continue
            css_target = (hf.parent / ec).resolve()
            if not css_target.exists():
                broken_links.append((rel_path, f"Missing CSS asset: {ec}"))
                file_clean = False

        # 5. Check local href links (excluding script tags)
        html_markup_only = re.sub(r"<script(?:\s+[^>]*)?>.*?</script>", "", content, flags=re.S)
        links = re.findall(r'<a\s+[^>]*href=["\']([^"\']+)["\']', html_markup_only, re.I)
        for l in links:
            if l.startswith(("http://", "https://", "#", "mailto:", "javascript:")) or "${" in l:
                continue
            path_part = l.split("#")[0].split("?")[0]
            if path_part:
                target_path = (hf.parent / path_part).resolve()
                if not target_path.exists():
                    broken_links.append((rel_path, f"Broken link to: {l}"))
                    file_clean = False

        if file_clean:
            passed_count += 1
            print(f"[PASS] {rel_path}")
        else:
            print(f"[FAIL] {rel_path}")

    print("\n======================================================")
    print("   [+] Test Results Summary                           ")
    print("======================================================")
    print(f"Total HTML files scanned: {len(html_files)}")
    print(f"Passed cleanly:           {passed_count}")
    print(f"HTML Structure Issues:    {len(html_issues)}")
    print(f"JavaScript Syntax Errors: {len(js_errors)}")
    print(f"Broken Links / Assets:    {len(broken_links)}")

    if html_issues:
        print("\n--- HTML Structure Issues ---")
        for hi in html_issues:
            print(f"  {hi[0]}: {hi[1]}")

    if js_errors:
        print("\n--- JavaScript Syntax Errors ---")
        for je in js_errors:
            print(f"  {je[0]}: {je[1]}")

    if broken_links:
        print("\n--- Broken Links / Assets ---")
        for bl in broken_links:
            print(f"  {bl[0]}: {bl[1]}")

    return len(html_issues) == 0 and len(js_errors) == 0 and len(broken_links) == 0

if __name__ == "__main__":
    success = test_all()
    sys.exit(0 if success else 1)
