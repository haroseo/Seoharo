#!/usr/bin/env python3
"""Sanitize local exports from Notion and Google Drive into the local INBOX.

This importer intentionally has no network code. External exports must be supplied as
local files; raw files are read, sanitized in memory, and never copied into Git.
"""
from __future__ import annotations

import argparse
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INBOX = ROOT / "ai-sync" / "sources" / "INBOX.md"
MAX_CHARS = 4500
EMAIL = re.compile(r"\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b")
BEARER = re.compile(r"(?i)\bBearer\s+[A-Za-z0-9._~+/=-]+")
SECRET_ASSIGNMENT = re.compile(r"(?i)\b(api[_-]?key|secret|password|token|private[_-]?key)\s*[:=]\s*[^\s,;]+")
LONG_TOKEN = re.compile(r"\b[A-Za-z0-9_-]{32,}\b")
URL_QUERY_SECRET = re.compile(r"(?i)(https?://[^\s]+?)([?&](?:token|key|secret|auth|password)=[^\s&]+)")
BLOCKED = re.compile(r"(?i)(private key|client secret|oauth|credential|login|cookie|session|password|api[_ -]?key|access token|refresh token)")


def sanitize(text: str) -> str:
    kept = []
    for raw in text.replace("\r", "").splitlines():
        line = raw.strip()
        if not line or BLOCKED.search(line):
            continue
        line = URL_QUERY_SECRET.sub(r"\1[REDACTED]", line)
        line = BEARER.sub("Bearer [REDACTED]", line)
        line = SECRET_ASSIGNMENT.sub(lambda m: f"{m.group(1)}=[REDACTED]", line)
        line = EMAIL.sub("[EMAIL_REDACTED]", line)
        line = LONG_TOKEN.sub("[TOKEN_REDACTED]", line)
        kept.append(line)
    return "\n".join(kept)[:MAX_CHARS].rstrip()


def append_entry(source: str, path: Path, text: str) -> str | None:
    clean = sanitize(text)
    if not clean:
        return None
    title = path.stem[:120]
    indented = clean.replace("\n", "\n  ")
    return f"- [{date.today()}] [external/{source}] `{title}` sanitized extract:\n  {indented}\n  Raw source was local-only and was not copied. Approval: pending"


def main() -> int:
    parser = argparse.ArgumentParser(description="Import sanitized local Notion/Drive exports")
    parser.add_argument("--notion-export", action="append", type=Path, default=[])
    parser.add_argument("--drive-export", action="append", type=Path, default=[])
    parser.add_argument("--dry-run", action="store_true", help="print sanitized entries without writing INBOX")
    args = parser.parse_args()
    try:
        entries = []
        for source, paths in (("notion", args.notion_export), ("drive", args.drive_export)):
            for path in paths:
                if not path.is_file():
                    raise RuntimeError(f"local export not found: {path}")
                entry = append_entry(source, path, path.read_text(encoding="utf-8", errors="replace"))
                if entry:
                    entries.append(entry)
        if not entries:
            print("no sanitized local exports found")
            return 0
        if args.dry_run:
            print("\n\n".join(entries))
            return 0
        current = INBOX.read_text(encoding="utf-8").rstrip() if INBOX.exists() else "# Sync Inbox"
        INBOX.write_text(current + "\n\n" + "\n\n".join(entries) + "\n", encoding="utf-8")
        print(f"appended {len(entries)} sanitized entries to {INBOX}")
        return 0
    except (OSError, RuntimeError) as exc:
        print(f"external sync blocked: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
