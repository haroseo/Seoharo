import type { Copy } from './portfolioContent.ts';
import { getImagePreview } from '../lib/imagePreview.ts';

// Bounded derivatives of actual browser captures, not generated UI.
export interface ProjectEvidence {
  slug: string;
  image: string;
  width: number;
  height: number;
  capturedOn: string;
  title: Copy;
  description: Copy;
}

export const projectEvidence: readonly ProjectEvidence[] = [
  {
    slug: 'planor', ...getImagePreview('evidence:planor'), capturedOn: '2026-10-10',
    title: { ko: '월별 캘린더', en: 'Monthly calendar' },
    description: { ko: '월별 날짜와 현재 날짜를 확인하는 캘린더 화면입니다. 왼쪽 메뉴에서 홈, 일정, 학습, 계획으로 이동하는 구성을 볼 수 있습니다.', en: 'A monthly calendar with the current date highlighted. The left navigation connects home, schedules, study and planning.' },
  },
  {
    slug: 'design-pick', ...getImagePreview('evidence:design-pick'), capturedOn: '2026-10-10',
    title: { ko: '컬러 피커와 코드 내보내기', en: 'Color picker and code export' },
    description: { ko: '색상 미리보기와 RGB 채널, HEX 코드, 복사·내보내기 버튼을 함께 보여주는 화면입니다. 연결된 공개 버전에는 RGBdom이라는 이름이 남아 있습니다.', en: 'The interface brings together a color preview, RGB channels, a HEX code, and copy and export controls. The linked public version still displays the name RGBdom.' },
  },
  {
    slug: 'naratmalsami', ...getImagePreview('evidence:naratmalsami'), capturedOn: '2026-10-10',
    title: { ko: '한글 타자 연습', en: 'Hangeul typing practice' },
    description: { ko: '연습 문장에 집중할 수 있게 글을 중앙에 놓고, 타수와 정확도를 아래에 배치한 화면입니다. 캡처의 수치는 입력 전 화면 상태이며 개인 성과가 아닙니다.', en: 'The practice text is centered, with typing speed and accuracy below. The values shown are the interface state before typing, not personal results.' },
  },
];
