# AI Sync

이 디렉터리는 여러 AI가 공유하는 **정본 컨텍스트와 동기화 에이전트**다. 원본은 `context/MASTER_CONTEXT.md`, 변경 입력은 `sources/INBOX.md`다. `generated/` 아래 파일은 자동 생성되며, Claude·Codex·Antigravity가 각자 읽기 쉬운 진입점이다.

## 사용법

새로운 사실이나 결정이 생기면 `sources/INBOX.md`에 다음 형식으로 추가한다.

```text
- [YYYY-MM-DD] [brand/project] 사실 또는 결정. 출처: 사용자 지시/파일 경로/회의 메모. 승인: pending|approved
```

그다음 아래 명령을 실행한다.

```bash
python3 ai-sync/bin/sync_context.py
python3 ai-sync/bin/sync_context.py --check
```

생성된 `AI_BRIEF.md`는 모든 AI에 공통으로 제공하고, 특정 AI용 파일은 해당 도구의 프로젝트 지침에 연결한다. `MASTER_CONTEXT.md`를 직접 복사해 여러 곳에서 관리하지 않는 것이 핵심이다.

## 안전 규칙

이 구조는 로컬 파일과 GitHub 저장소 안에서만 동작한다. 외부 AI API로 자동 업로드하지 않으므로 데이터가 임의로 외부 전송되지 않는다. API 키·토큰·개인 대화 원문은 정본과 Git에 넣지 않는다. 실제 외부 서비스 연결은 사용자가 명시적으로 승인한 경우에만 별도 연동한다.

## 운영 흐름

사용자 지시를 받으면 AI는 먼저 `generated/AI_BRIEF.md`를 읽는다. 변경이 필요하면 코드와 함께 `sources/INBOX.md`에 사실·결정을 남긴다. 정본 업데이트가 승인된 뒤 동기화 명령을 실행하고, 변경된 생성 파일을 커밋한다. 다른 AI는 생성 파일만 읽으므로 다음 세션에서도 동일한 요약을 확보한다.
