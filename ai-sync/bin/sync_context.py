#!/usr/bin/env python3
"""Build synchronized context packs for multiple coding agents.

The script is intentionally local and deterministic: it only reads the repository's
approved context files and never sends project data to an external service.
"""
from __future__ import annotations

import argparse
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTEXT = ROOT / "ai-sync" / "context"
SOURCES = ROOT / "ai-sync" / "sources"
GENERATED = ROOT / "ai-sync" / "generated"


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


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate synchronized AI context files")
    parser.add_argument("--check", action="store_true", help="fail if generated files differ")
    args = parser.parse_args()

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
            if not args.check:
                target.write_text(normalized + "\n", encoding="utf-8")

    if args.check and changed:
        raise SystemExit("out_of_sync: " + ", ".join(changed))
    print("generated: " + (", ".join(changed) if changed else "no changes"))


if __name__ == "__main__":
    main()
