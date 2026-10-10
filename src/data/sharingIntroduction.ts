import type { Copy, Locale } from './portfolioContent';

export const sharingGreeting: Copy = {
  ko: '안녕하세요, 서주원입니다.',
  en: 'Hello, I’m Seo Juwon.',
};

export const sharingIntroduction: Record<Locale, readonly string[]> = {
  ko: [
    '떠오른 아이디어를 기획으로 정리하고, 디자인과 개발로 직접 만듭니다. 생각을 오래 붙잡기보다 먼저 시도하고, 만들면서 배우는 편입니다.',
    '글과 말로 방향을 정리하고, 사람들과 함께 결과물까지 이어가는 일을 좋아합니다. 디자인과 마케팅, 개발을 오가며 작업하고 여러 팀을 이끌어 본 경험이 있습니다. 이곳에는 제가 해온 작업과 맡은 역할, 그 과정에서 배운 것들을 담았습니다. 작업을 살펴보시면 제가 어떻게 생각하고 실행하는 사람인지 조금 더 알 수 있을 거예요.',
    '먼저 제 작업을 통해 저를 소개하고, 서로의 생각과 경험을 나눠보고 싶습니다. 읽어보시고 궁금한 점이나 나누고 싶은 이야기가 있다면 편하게 연락 주세요.',
  ],
  en: [
    'I turn ideas into plans, then make them through design and development. I prefer trying things and learning as I build to holding on to an idea for too long.',
    'I enjoy clarifying direction through writing and conversation, and working with others to bring ideas to life. I have worked across design, marketing and development, and led several teams. Here I share my work, my role in each project and what I learned along the way. Exploring these projects will give you a better sense of how I think and take action.',
    'I would like to introduce myself through my work and exchange ideas and experiences. If something makes you curious or you have a story to share, please feel free to get in touch.',
  ],
};
