# Shared Agent Instructions

작업 시작 전에 `ai-sync/generated/AI_BRIEF.md`를 읽는다. 원본은 `ai-sync/context/MASTER_CONTEXT.md`이며, 변경 입력은 `ai-sync/sources/INBOX.md`에 기록한다. 정본과 생성 파일의 민감정보를 외부로 보내지 않는다. 작업 종료 시 변경 파일, 검증 결과, 남은 리스크, 다음 액션을 보고한다.

```bash
python3 ai-sync/bin/sync_context.py
```
