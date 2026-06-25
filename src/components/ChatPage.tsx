import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface QuestionOption {
  id: string;
  text: string;
  response: string;
  followUps?: string[];
}

export default function ChatPage() {
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: t(
          '안녕하세요. 아래 질문 카드 중 궁금하신 사항을 선택하시면 바로 답변해 드리겠습니다.',
          'Hello! I am Seoharo\'s portfolio assistant. Select one of the questions below and I will answer you right away.'
        )
      }
    ]);
  }, [language]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const presetQuestions: Record<string, QuestionOption> = {
    who: {
      id: 'who',
      text: t('서하루는 어떤 크리에이터인가요?', 'What kind of creator is Seoharo?'),
      response: t(
        '저는 디자인, 마케팅, 프로그래밍을 하는 크리에이터입니다. 디자인 감각과 개발 지식을 결합하여 단순히 보기 좋은 화면을 넘어, 사용자가 반응하고 오래 머무를 수 있는 조화롭고 멋진 경험을 기획하고 설계합니다.',
        'I am a creator specializing in design, marketing, and programming. Combining design aesthetics with development skills, I plan and design balanced and engaging experiences that go beyond mere visual looks.'
      ),
      followUps: ['projects', 'communities']
    },
    communities: {
      id: 'communities',
      text: t('운영 중인 커뮤니티는 어떤 곳인가요?', 'What communities do you operate?'),
      response: t(
        '현재 누적 1,200명 이상의 유저와 소통하며 대표적인 커뮤니티를 기획하고 운영 중입니다.\n\n• 로폴더 (RoFolder): 청소년 및 청년의 스타트업 창업을 독려하고 지원하는 네트워킹 서버\n• Limited™: 실무 경험과 다양한 시도를 진행하는 그래픽 및 에셋 창작 공간\n• 로블갤러리 (ROGLLAERY): 유저들이 자유롭게 모여 소통하는 투명한 커뮤니티 공간',
        'I currently communicate with over 1,200 users, operating the following communities:\n\n• RoFolder: A Discord server supporting youth startup entrepreneurship\n• Limited™: A graphic & code asset creation space for gaining practical experience and making attempts\n• ROGLLAERY: A transparent community space where users freely gather and communicate'
      ),
      followUps: ['projects', 'contact']
    },
    projects: {
      id: 'projects',
      text: t('주요 프로젝트 성과가 궁금해요.', 'What are your main project achievements?'),
      response: t(
        '대표적인 론칭 및 참여 서비스는 다음과 같습니다.\n\n• Design Pick: 비주얼 영감을 제공하는 디자인 큐레이션 웹 플랫폼 (designs.kro.kr)\n• Planor: 일정 조율 효율성을 제공하는 스마트 협업 캘린더 (planor.kro.kr)\n• 나랏말싸미: 한글 창제 결합 원리를 타이핑 연습에 녹인 에듀테크 서비스 (훈민정음.kro.kr)',
        'My representative launches and projects are:\n\n• Design Pick: A visual design curation web platform (designs.kro.kr)\n• Planor: A smart collaboration calendar optimizing scheduling (planor.kro.kr)\n• Naramarsami: An interactive EdTech typing practice based on Hangeul principles (훈민정음.kro.kr)'
      ),
      followUps: ['who', 'contact']
    },
    contact: {
      id: 'contact',
      text: t('협업이나 연락은 어떻게 하나요?', 'How do I contact you or collaborate?'),
      response: t(
        '언제나 생산적이고 가치 있는 협업을 환영합니다. 가장 빠른 연락망은 다음과 같습니다.\n\n• 이메일: seoharo0111@gmail.com\n• 디스코드: seoharo\n• 인스타그램: tooday.zip\n\n편하게 연락 주시면 신속하게 확인 후 답변해 드리겠습니다.',
        'I welcome valuable collaborations. The fastest ways to reach me are:\n\n• Email: seoharo0111@gmail.com\n• Discord: seoharo\n• Instagram: tooday.zip\n\nFeel free to write and I will get back to you shortly.'
      ),
      followUps: ['who', 'communities']
    }
  };

  const [availableOptions, setAvailableOptions] = useState<string[]>(['who', 'communities', 'projects', 'contact']);

  const handleOptionClick = (optionId: string) => {
    const option = presetQuestions[optionId];
    if (!option) return;

    setMessages((prev) => [...prev, { id: Math.random().toString(), sender: 'user', text: option.text }]);
    setAvailableOptions([]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Math.random().toString(), sender: 'bot', text: option.response }]);

      if (option.followUps) {
        setAvailableOptions(option.followUps);
      } else {
        setAvailableOptions(['who', 'communities', 'projects', 'contact']);
      }
    }, 900);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center pt-36 sm:pt-40 pb-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Messenger frame */}
      <div className="w-full max-w-xl bg-zinc-950/80 border border-zinc-900 rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col h-[68vh] sm:h-[72vh] relative overflow-hidden backdrop-blur-2xl">
        
        {/* Chat Room Header */}
        <div className="px-6 py-4.5 border-b border-zinc-900/80 flex items-center bg-zinc-950/90 backdrop-blur-md sticky top-0 z-10">
          <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-white font-bold text-sm font-display select-none">
            S
          </div>
          <div className="ml-3">
            <h3 className="text-xs font-bold text-white font-mono">SEOHARO</h3>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-[10px] font-display shrink-0 select-none">
                    S
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] px-4.5 py-3 rounded-2xl text-[11px] sm:text-xs leading-relaxed whitespace-pre-line shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-white text-black rounded-tr-none font-semibold'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800/80 rounded-tl-none font-normal'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shrink-0 select-none">
                    <User size={11} />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Bouncy Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-[10px] font-display shrink-0 select-none">
                  S
                </div>
                <div className="bg-zinc-900 border border-zinc-850 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 bg-zinc-500 rounded-full inline-block"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Question Buttons Footer */}
        <div className="p-4 border-t border-zinc-900/80 bg-zinc-950/90 backdrop-blur-sm sticky bottom-0 z-10">
          <span className="block text-[8.5px] font-bold text-zinc-500 uppercase tracking-widest mb-3 select-none text-center font-mono">
            {t('질문을 선택하세요', 'CHOOSE A QUESTION')}
          </span>

          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {availableOptions.map((optId) => {
                const opt = presetQuestions[optId];
                if (!opt) return null;
                return (
                  <motion.button
                    key={optId}
                    layout
                    initial={{ opacity: 0, scale: 0.97, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -4 }}
                    whileHover="hover"
                    variants={{
                      hover: {
                        scale: 1.015,
                        borderColor: '#ffffff',
                        backgroundColor: '#121214',
                        boxShadow: '0 0 12px rgba(255, 255, 255, 0.08)'
                      }
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    onClick={() => handleOptionClick(optId)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0c]/80 border border-zinc-900 text-zinc-300 hover:text-white text-xs font-semibold text-left flex items-center justify-between group shadow-sm transition-all select-none cursor-pointer relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                      variants={{
                        hover: { x: ['-100%', '100%'] }
                      }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                    <span className="relative z-10">{opt.text}</span>
                    <ArrowRight size={12} className="text-zinc-550 group-hover:text-white group-hover:translate-x-0.5 transition-all relative z-10" />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
