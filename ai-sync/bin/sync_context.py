#!/usr/bin/env python3
"""Local-only context sync and optional Git publication.

External content is accepted only through the separate external_sync.py importer.
This command generates AI briefs, scans staged text for secrets, and publishes only
an explicit allowlist of context files.
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTEXT = ROOT / "ai-sync" / "context"
SOURCES = ROOT / "ai-sync" / "sources"
GENERATED = ROOT / "ai-sync" / "generated"
ALLOWLIST = [
    ".gitignore", "AGENTS.md", "CLAUDE.md", "GEMINI.md", ".agents/AGENTS.md",
    "ai-sync/README.md", "ai-sync/bin/sync_context.py", "ai-sync/bin/external_sync.py",
    "ai-sync/context/", "ai-sync/generated/", "ai-sync/sources/INBOX.md",
    "ai-sync/sources/EXTERNAL_SOURCES.example.json",
]
SECRET_PATTERNS = ("BEGIN PRIVATE KEY", "api_key=", "api-key:", "authorization: bearer", "password=", "secret=")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8").strip()


def render(master: str, changelog: str, inbox: str, audience: str) -> str:
    return f"""# {audience} 공유 컨텍스트

> 생성일: {date.today().isoformat()} · 이 파일은 자동 생성물이다. 수정은 `ai-sync/context/MASTER_CONTEXT.md` 또는 `ai-sync/sources/INBOX.md`에서 한다.

## 사용 규칙

작업 시작 전에 아래 정본을 읽고, 현재 요청과 충돌하면 사용자의 최신 지시를 우선한다. 브랜드 간 맥락을 임의로 섞지 않는다. 새 사실이나 결정은 `ai-sync/sources/INBOX.md`에 기록하고 동기화를 다시 실행한다. API 키·토큰·비공개 원문은 기록하지 않는다.

## 정본

{master}

## 변경 로그

{changelog}

## 승인 대기 입력

{inbox}

## 작업 완료 보고 형식

결론을 먼저 쓰고, 이어서 변경 파일 또는 실행 결과, 검증 방법, 남은 리스크와 다음 액션을 짧게 정리한다. 추측은 `추정`으로 표시하고 확인이 필요한 항목은 사용자에게 명시한다.
"""


def generate(check: bool) -> list[str]:
    master = read(CONTEXT / "MASTER_CONTEXT.md")
    changelog = read(CONTEXT / "CHANGELOG.md")
    inbox = read(SOURCES / "INBOX.md")
    outputs = {
        "AI_BRIEF.md": render(master, changelog, inbox, "공통 AI 브리프"),
        "CLAUDE_CONTEXT.md": render(master, changelog, inbox, "Claude 작업 컨텍스트"),
        "CODEX_CONTEXT.md": render(master, changelog, inbox, "Codex 작업 컨텍스트"),
        "ANTIGRAVITY_CONTEXT.md": render(master, changelog, inbox, "Antigravity 작업 컨텍스트"),
    }
    GENERATED.mkdir(parents=True, exist_ok=True)
    changed = []
    for name, content in outputs.items():
        target = GENERATED / name
        previous = target.read_text(encoding="utf-8").rstrip() if target.exists() else None
        normalized = content.rstrip()
        if previous != normalized:
            changed.append(name)
            if not check:
                target.write_text(normalized + "\n", encoding="utf-8")
    if check and changed:
        raise RuntimeError("out_of_sync: " + ", ".join(changed))
    return changed


def run_git(*args: str, check: bool = True) -> str:
    result = subprocess.run(["git", *args], cwd=ROOT, text=True, capture_output=True, check=False)
    if check and result.returncode:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip() or f"git {' '.join(args)} failed")
    return result.stdout.strip()


def publish() -> str:
    status = run_git("status", "--porcelain")
    if not status:
        return "no changes; nothing committed"
    run_git("reset", "--", ".")
    for path in ALLOWLIST:
        run_git("add", "--", path)
    staged = run_git("diff", "--cached", "--name-only")
    if not staged:
        return "no allowlisted changes; nothing committed"
    data_files = [
        name for name in staged.splitlines()
        if name.startswith(("ai-sync/context/", "ai-sync/generated/", "ai-sync/sources/"))
    ]
    diff = run_git("diff", "--cached", "--no-ext-diff", "--", *data_files) if data_files else ""
    lowered = diff.lower()
    if any(pattern.lower() in lowered for pattern in SECRET_PATTERNS):
        run_git("reset", "--", ".")
        raise RuntimeError("secret-like content detected in staged diff; commit/push blocked")
    run_git("diff", "--cached", "--check")
    run_git("commit", "-m", f"chore: sync AI context {date.today().isoformat()}")
    run_git("push", "origin", "main")
    return run_git("log", "-1", "--oneline")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate context and optionally commit/push only safe context files")
    parser.add_argument("--check", action="store_true", help="only verify generated files")
    parser.add_argument("--no-publish", action="store_true", help="do not commit or push")
    args = parser.parse_args()
    try:
        changed = generate(args.check)
        print("generated: " + (", ".join(changed) if changed else "no changes"))
        if not args.check and not args.no_publish:
            print("publish: " + publish())
        return 0
    except (OSError, RuntimeError) as exc:
        print(f"sync blocked: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
