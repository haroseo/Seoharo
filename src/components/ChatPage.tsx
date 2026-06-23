import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, User } from 'lucide-react';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '안녕하세요! 서하루의 크리에이티브 공간에 오신 것을 환영합니다. 아래의 질문 카드 중 궁금하신 사항을 선택하시면 바로 답해 드릴게요! ✨'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const presetQuestions: Record<string, QuestionOption> = {
    who: {
      id: 'who',
      text: '👤 서하루는 어떤 마케터/디자이너인가요?',
      response: '저는 시각적 아름다움(Brand Design), 유저 심리를 분석하는 마케팅(Marketing), 그리고 실제 구현하는 프로그래밍(Programming)을 결합하여 가치를 만드는 크리에이터입니다.\n\n디자인 감각과 논리적인 개발 지식을 융합하여 단순히 보기 좋은 화면을 넘어, 사용자가 반응하고 리텐션을 형성할 수 있는 구조적 경험을 설계합니다.',
      followUps: ['projects', 'communities']
    },
    communities: {
      id: 'communities',
      text: '🏢 현재 운영 중인 서버/커뮤니티는 어떤 곳인가요?',
      response: '현재 누적 1,200명 이상의 유저와 소통하며 두 개의 큰 커뮤니티를 리드하고 있습니다.\n\n• 로폴더 (RoFolder): 청소년 및 청년의 창업을 독려하고 아이디어를 데이터로 빌딩하는 스타트업 인큐베이팅 서버 (대표 / CEO)\n• Limited™: 최상급 무료배포 에셋 및 게임 프로젝트 특화 프리미엄 리소스를 제공하는 공간 (설립자 / Founder)',
      followUps: ['projects', 'contact']
    },
    projects: {
      id: 'projects',
      text: '🚀 주요 프로젝트들의 가치와 성과가 궁금해요.',
      response: '대표적인 론칭 서비스는 다음과 같습니다:\n\n• Design Pick: 감각적인 디자인 아트워크를 큐레이션하는 웹 플랫폼 (designs.kro.kr)\n• Planor: 일정 조율 효율성을 극대화하는 스마트 통합 캘린더 (planor.kro.kr)\n• 나랏말싸미: 한글 창제 및 결합 원리를 타핑 연습에 적용한 인터랙티브 에듀테크 타자 웹 서비스.',
      followUps: ['who', 'contact']
    },
    contact: {
      id: 'contact',
      text: '💼 협업이나 외주 연락은 어떻게 하나요?',
      response: '언제나 창의적이고 감각적인 비즈니스 협업을 환영합니다! 가장 빠른 연락망은 아래와 같습니다:\n\n• 이메일: seoharo0111@gmail.com\n• 디스코드: seoharo\n• 깃허브: github.com/haroseo\n\n편하게 연락해 주세요. 제 가치를 담아 최선의 결과물로 보답해 드리겠습니다.',
      followUps: ['who', 'communities']
    }
  };

  const [availableOptions, setAvailableOptions] = useState<string[]>(['who', 'communities', 'projects', 'contact']);

  const handleOptionClick = (optionId: string) => {
    const option = presetQuestions[optionId];
    if (!option) return;

    // Add user message
    const userMsgId = Math.random().toString();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: option.text }]);
    setAvailableOptions([]); // Temporarily clear options while typing

    // Bouncy typing effect
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsgId = Math.random().toString();
      setMessages((prev) => [...prev, { id: botMsgId, sender: 'bot', text: option.response }]);

      // Update follow-up options
      if (option.followUps) {
        setAvailableOptions(option.followUps);
      } else {
        setAvailableOptions(['who', 'communities', 'projects', 'contact']);
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center pt-28 pb-10 px-4 sm:px-6 overflow-hidden">
      {/* Tech blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-950/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-950/10 blur-3xl pointer-events-none" />

      {/* Main chat window container */}
      <div className="w-full max-w-2xl bg-zinc-950/60 border border-zinc-900 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col h-[70vh] relative overflow-hidden backdrop-blur-2xl">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white font-mono">SEOHARO BOT</h3>
              <p className="text-[9px] text-emerald-400 font-semibold tracking-wide flex items-center gap-1 mt-0.5 font-mono">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping inline-block" />
                ONLINE
              </p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">INTERACTION HUB</span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                    <Sparkles size={12} />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] px-5 py-3.5 rounded-2xl text-xs leading-relaxed font-light whitespace-pre-line shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-white text-black rounded-tr-none font-medium'
                      : 'bg-zinc-900/60 text-zinc-300 border border-zinc-800/80 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                    <User size={12} />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Bouncy Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                  <Sparkles size={12} />
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1 shadow-md">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -5, 0] }}
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
        <div className="p-5 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-sm sticky bottom-0 z-10">
          <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3.5 select-none text-center font-mono">
            SELECT INQUIRY PATHWAY
          </span>

          <div className="flex flex-col gap-2.5">
            <AnimatePresence mode="popLayout">
              {availableOptions.map((optId) => {
                const opt = presetQuestions[optId];
                if (!opt) return null;
                return (
                  <motion.button
                    key={optId}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -5 }}
                    whileHover={{ scale: 1.02, borderColor: '#ffffff', backgroundColor: '#18181b' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    onClick={() => handleOptionClick(optId)}
                    className="w-full px-5 py-3 rounded-2xl bg-zinc-900/85 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold text-left flex items-center justify-between group shadow-lg transition-all select-none cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight size={13} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
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
