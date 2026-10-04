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
  const { language } = useLanguage();
  return <ChatContent key={language} />;
}

function ChatContent() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(() => [
      {
        id: 'welcome',
        sender: 'bot',
        text: t(
          '안녕하세요. 아래 질문에서 궁금한 내용을 선택해 주세요.',
          'Choose a question below to learn more about the work.'
        )
      }
    ]);

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
      text: t('어떤 일을 해왔나요?', 'What work have you done?'),
      response: t(
        '개발·마케팅 관련 업무와 프리랜서 디자인을 경험했고, 기획하고 만든 프로젝트를 포트폴리오에 정리했습니다.',
        'I have experience in development- and marketing-related work, freelance design, and projects I planned and built.'
      ),
      followUps: ['projects', 'communities']
    },
    communities: {
      id: 'communities',
      text: t('이전 사업은 어떤 일이었나요?', 'What were your previous businesses?'),
      response: t(
        '사업 운영과 팀 리딩 경험이 있으며, 이후 운영을 다른 사람에게 넘겼습니다.',
        'I have experience in business operations and team leadership, and later handed operations over.'
      ),
      followUps: ['projects', 'contact']
    },
    projects: {
      id: 'projects',
      text: t('주요 프로젝트 성과가 궁금해요.', 'What are your main project achievements?'),
      response: t(
        '대표적인 론칭 및 참여 서비스는 다음과 같습니다.\n\n• Design Pick: 비주얼 영감을 제공하는 디자인 큐레이션 웹 플랫폼 (designs.kro.kr)\n• Planor: 일정 조율 효율성을 제공하는 스마트 협업 캘린더 (planor.kro.kr)\n• 나랏말싸미: 한글 창제 결합 원리를 타이핑 연습에 녹인 에듀테크 서비스 (훈민정음.kro.kr)',
        'My representative launches and projects are:\n\n• Design Pick: A visual design curation web platform (designs.kro.kr)\n• Planor: A planning calendar web app (planor.kro.kr)\n• Korean typing practice: An interactive Hangeul typing service (훈민정음.kro.kr)'
      ),
      followUps: ['who', 'contact']
    },
    contact: {
      id: 'contact',
      text: t('협업이나 연락은 어떻게 하나요?', 'How do I contact you or collaborate?'),
      response: t(
        '문의는 포트폴리오의 문의 페이지에서 확인해 주세요.',
        'Please use the contact page for inquiries.'
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
    <div className="relative min-h-screen bg-[#0f151c] flex items-center justify-center pt-36 sm:pt-40 pb-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Messenger frame */}
      <div className="w-full max-w-xl bg-[var(--toss-bg-card)] border border-[var(--toss-border)] rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col h-[68vh] sm:h-[72vh] relative overflow-hidden">
        
        {/* Chat Room Header */}
        <div className="px-6 py-4.5 border-b border-[var(--toss-border)] flex items-center bg-[var(--toss-bg-card)] sticky top-0 z-10">
          <div className="w-8 h-8 rounded-xl bg-[var(--toss-blue)] flex items-center justify-center text-white font-bold text-xs font-display select-none">
            S
          </div>
          <div className="ml-3">
            <h3 className="text-xs font-bold text-white font-mono">WORK ARCHIVE</h3>
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
                  <div className="w-6.5 h-6.5 rounded-lg bg-[var(--toss-blue)] flex items-center justify-center text-white font-bold text-[9px] font-display shrink-0 select-none">
                    S
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] px-4.5 py-3 rounded-2xl text-[11px] sm:text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[var(--toss-blue)] text-white rounded-tr-none font-semibold'
                      : 'bg-[#222a35] text-[#f4f4f5] rounded-tl-none font-normal'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6.5 h-6.5 rounded-lg bg-[#2c3542] flex items-center justify-center text-zinc-400 shrink-0 select-none">
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
                <div className="w-6.5 h-6.5 rounded-lg bg-[var(--toss-blue)] flex items-center justify-center text-white font-bold text-[9px] font-display shrink-0 select-none">
                  S
                </div>
                <div className="bg-[#222a35] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 bg-zinc-550 rounded-full inline-block"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Question Buttons Footer */}
        <div className="p-4 border-t border-[var(--toss-border)] bg-[var(--toss-bg-card)] sticky bottom-0 z-10">
          <span className="block text-[8.5px] font-bold text-zinc-550 uppercase tracking-widest mb-3 select-none text-center font-mono">
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
                        scale: 1.01,
                        backgroundColor: '#222a35',
                      }
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    onClick={() => handleOptionClick(optId)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1f262e] text-zinc-300 hover:text-white text-xs font-semibold text-left flex items-center justify-between group shadow-sm transition-all select-none cursor-pointer relative overflow-hidden"
                  >
                    <span className="relative z-10">{opt.text}</span>
                    <ArrowRight size={12} className="text-zinc-550 group-hover:text-white group-hover:translate-x-0.5 transition-all relative z-10" />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Simulated Input Area */}
          <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center gap-3">
            <div className="flex-1 bg-[#1f262e] rounded-full px-4.5 py-2.5 flex items-center justify-between text-zinc-500 text-[11px] font-medium select-none">
              <span>{t('질문을 입력하세요...', 'Enter a question...')}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[var(--toss-blue)] flex items-center justify-center text-white shrink-0 select-none opacity-80 hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current transform -rotate-45 translate-x-0.5">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
