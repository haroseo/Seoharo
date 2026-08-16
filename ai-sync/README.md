# AI Sync

이 디렉터리는 여러 AI가 공유하는 **정본 컨텍스트와 동기화 에이전트**다. 원본은 `context/MASTER_CONTEXT.md`, 변경 입력은 `sources/INBOX.md`다. `generated/` 아래 파일은 자동 생성되며 Claude·Codex·Antigravity가 각자 읽기 쉬운 진입점이다.

## 기본 동기화

새로운 사실이나 결정을 `sources/INBOX.md`에 추가한 뒤 아래 명령을 실행한다. 기본 동작은 생성·검증·민감정보 검사·allowlist 기반 Git commit·`origin/main` push까지다.

```bash
python3 ai-sync/bin/sync_context.py
```

검증만 하거나 Git 반영을 막으려면 다음처럼 실행한다.

```bash
python3 ai-sync/bin/sync_context.py --check
python3 ai-sync/bin/sync_context.py --no-publish
```

기존 작업트리의 다른 파일은 자동으로 커밋하지 않는다. 오직 정본·생성 브리프·AI 진입 문서만 allowlist로 추가하며, staged diff에서 키·토큰·비밀번호 형태가 발견되면 commit/push를 중단한다.

## Notion·Google Drive 가져오기

외부 문서 원문은 Git에 저장하지 않는다. Notion 또는 Drive에서 **사용자가 로컬로 내려받은 Markdown/TXT export**를 임시 경로에 둔 뒤 다음처럼 실행한다. 스크립트는 메모리에서 이메일·Bearer 토큰·키·비밀번호·긴 토큰·인증 URL을 제거하고, 정제된 짧은 발췌만 `INBOX.md`에 기록한다. 원문 파일은 읽은 뒤 자동 삭제하지 않으므로, 사용자가 만든 임시 디렉터리는 작업 완료 후 직접 삭제한다.

```bash
python3 ai-sync/bin/external_sync.py \
  --notion-export /tmp/notion-note.md \
  --drive-export /tmp/drive-doc.txt
python3 ai-sync/bin/sync_context.py
rm -rf /tmp/notion-note.md /tmp/drive-doc.txt
```

처음에는 `--dry-run`으로 정제 결과만 확인하는 것을 권장한다.

```bash
python3 ai-sync/bin/external_sync.py --notion-export /tmp/note.md --dry-run
```

Google Drive CLI를 사용할 경우 Google 인증은 로컬에서만 설정한다. 이 저장소에는 OAuth JSON, 토큰 파일, 다운로드 원문을 넣지 않는다. Notion도 동일하게 원문 export를 로컬 임시 경계로 넣고, API 키나 개인 토큰은 정본에 기록하지 않는다.

## 운영 규칙

모든 AI는 작업 시작 전에 `generated/AI_BRIEF.md`를 읽는다. 새 사실이나 결정은 `sources/INBOX.md`에 기록하고 동기화를 다시 실행한다. 정본을 직접 여러 곳에 복사해 관리하지 않는다. 브랜드별 데이터는 명시적 승인 없이는 섞지 않는다.

외부 문서는 자동으로 사실 확정하지 않고 `Approval: pending`으로 들어온다. 승인된 내용만 사람이 `MASTER_CONTEXT.md`에 반영한다. 민감정보가 포함된 원문은 정제 단계에서 버리고, 감지 실패를 가정하지 않기 때문에 외부 파일 자체도 Git 경로 밖에서만 관리한다.
