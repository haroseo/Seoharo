# Custom Rules

- **Shared Context Rule**:
  - Before any task, read `ai-sync/generated/AI_BRIEF.md`.
  - Record new facts or decisions in `ai-sync/sources/INBOX.md`, then run `python3 ai-sync/bin/sync_context.py`.

- **Post-Implementation Interaction Rule**:
  - Always, after completing any task or implementation, explicitly ask the user:
    1. What to build next ("더 만들 것")
    2. What to modify ("수정할 것")
    3. Examples/suggestions for next steps ("예시/제안 요청")
