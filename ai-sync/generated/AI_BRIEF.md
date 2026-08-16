# 공통 AI 브리프 공유 컨텍스트

> 생성일: 2026-08-16 · 이 파일은 자동 생성물이다. 수정은 `ai-sync/context/MASTER_CONTEXT.md` 또는 `ai-sync/sources/INBOX.md`에서 한다.

## 사용 규칙

작업 시작 전에 아래 정본을 읽고, 현재 요청과 충돌하면 사용자의 최신 지시를 우선한다. 브랜드 간 맥락을 임의로 섞지 않는다. 새 사실이나 결정은 `ai-sync/sources/INBOX.md`에 기록하고 동기화를 다시 실행한다. API 키·토큰·비공개 원문은 기록하지 않는다.

## 정본

# 서하루 공통 정본

> 모든 AI의 시작점. 최신 사용자 지시가 항상 최우선이며, 이 문서는 공통 맥락만 담는다.

## 주체

서하루는 서울 거주 1인 창업자다. 여러 독립 브랜드와 프로젝트를 병렬 운영하며 Python·Rust, 시스템 자동화, API 통합, 웹 스크래핑, 멀티에이전트 설계를 주로 다룬다.

## 운영 축

| 프로젝트 | 원칙 |
|---|---|
| 로폴더 | 대표 운영 축 |
| Limited™ | 공지 끝에 반드시 `감사합니다.` |
| HannWorks™ | 독립 브랜드·독립 데이터 |
| Nully AI | AI·멀티에이전트 실험 |
| VOIDRA | 독립 브랜드·독립 맥락 |
| Cokform | 상세는 `ai-sync/projects/COKFORM_CONTEXT.md` |
| 하루.zip | 개인 아카이브·콘텐츠 |
| MindWeb | 지식·웹 프로젝트 |
| Return | 상태·다음 액션 명시 |
| Discord 보안 봇 | 권한·토큰·로그 보안, 다른 브랜드와 완전 분리 |

## 작업 규칙

불확실한 내용은 추정으로 표시한다. 미검증 저장소를 블라인드 스크래핑하지 않는다. 브랜드 데이터와 권한을 섞지 않는다. 민감정보·API 키·토큰·쿠키·비공개 원문을 문서·로그·Git·Notion에 기록하지 않는다. 결과는 짧고 구조화된 한국어로, 결론·현재 상태·검증·리스크·다음 액션 순서로 쓴다.

사용자는 명확한 지시 후 자율 실행을 선호하며, 효율·단순화·로컬 안정성·자동 백업을 중시한다. 디자인 기본값은 프로젝트별 미니멀·고대비·플랫·Pretendard 계열이며 글래스모피즘과 과한 장식을 피한다.

## AI 협업

작업 전 이 정본과 생성 브리프를 읽는다. 새 사실·결정·선호·상태는 `ai-sync/sources/INBOX.md`에 기록하고 동기화한다. 상세 프로젝트 문서는 `ai-sync/projects/`에 둔다. 과거 원문 요약은 `ai-sync/archive/`에 보관하며 시작 컨텍스트에 직접 포함하지 않는다.

충돌 우선순위: 최신 사용자 지시 → 이 정본 → 프로젝트 상세 문서 → 승인 대기 INBOX → archive.

## 저장소·상태

`haroseo/Seoharo`는 React + TypeScript + Vite 포트폴리오이며 AI 동기화는 `ai-sync/`에 격리한다. 생성 파일은 직접 수정하지 않고 `python3 ai-sync/bin/sync_context.py`로 재생성한다.

- Last verified: 2026-08-16
- Owner: 서하루
- Privacy: 원문·민감정보·자격증명은 요약에도 저장하지 않음
- Policy: 공통 정본은 짧게, 상세 맥락은 프로젝트별로 분리

## 변경 로그

# Context Changelog

## 2026-08-16

기존 AI 동기화 구조를 만들고 Claude·Codex 요약을 수집했다. 이후 원문 요약은 `ai-sync/archive/2026-08-16/`으로 이동하고, Cokform 교차 보강본은 `ai-sync/projects/COKFORM_CONTEXT.md`로 분리했다. 공통 `MASTER_CONTEXT.md`는 브랜드 공통 규칙과 AI 협업 규칙만 남기도록 압축했으며, 승인 전 Cokform 결정은 `INBOX.md`에 남겼다.

## 승인 대기 입력

# Sync Inbox

> 승인 전 항목만 기록한다. 민감정보·원문·자격증명은 금지.

- [2026-08-16] [ai-sync] 여러 AI가 같은 최신 요약을 읽고 변경사항을 공유하는 구조를 구축함. 출처: 사용자 지시. 승인: approved
- [2026-08-16] [Cokform] Claude·Codex 교차 분석을 Cokform 전용 상세 문서로 정리함. 출처: Claude/Codex 요약. 승인: pending
- [2026-08-16] [Cokform] Supabase·RLS·서버 기준 응답 중복 방지·Cloudflare Pages 방향을 검토 후보로 유지함. 출처: Codex 기록. 승인: pending
- [2026-08-16] [Cokform] 보라·초록·네이비 디자인 토큰과 `C + 체크` 로고 방향을 검토 후보로 유지함. 출처: Claude/Codex 교차 분석. 승인: pending
- [2026-08-16] [context] Claude·Codex 원문 요약은 archive로 이동하고 공통 정본은 압축함. 출처: 사용자 지시. 승인: approved

## 작업 완료 보고 형식

결론을 먼저 쓰고, 이어서 변경 파일 또는 실행 결과, 검증 방법, 남은 리스크와 다음 액션을 짧게 정리한다. 추측은 `추정`으로 표시하고 확인이 필요한 항목은 사용자에게 명시한다.
