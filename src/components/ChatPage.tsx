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
      response: '저는 시각적 아름다움(Brand Design), 유저 심리를 분석하는 마케팅(Marketing), 그리고 실제 구현하는 프로그래밍(Programming)을 융합하는 3각 멀티 크리에이터입니다.\n\n디자인 감각과 데이터를 결합하여 단순히 보기 좋은 디자인을 넘어, 비즈니스가 실질적으로 유저 리텐션을 만들 수 있도록 설계합니다.',
      followUps: ['projects', 'communities']
    },
    communities: {
      id: 'communities',
      text: '🏢 현재 운영 중인 서버/커뮤니티는 어떤 곳인가요?',
      response: '현재 누적 1,200명 이상의 유저와 직접 소통하며 두 개의 큰 커뮤니티를 리드하고 있습니다.\n\n• 로폴더 (RoFolder): 청소년 및 청년의 스타트업 창업을 장려하고 아이디어를 데이터로 빌딩하는 스타트업 인큐베이팅 서버 (대표 / CEO)\n• Limited™: 최상급 무료배포 에셋 및 게임 프로젝트 특화 프리미엄 리소스를 배포하는 공간 (설립자 / Founder)',
      followUps: ['projects', 'contact']
    },
    projects: {
      id: 'projects',
      text: '🚀 주요 프로젝트들의 가치와 성과가 궁금해요.',
      response: '대표적인 론칭 서비스와 기획 콘텐츠는 다음과 같습니다:\n\n• Design Pick: 감각적인 디자인을 큐레이션하는 웹 플랫폼 (designs.kro.kr)\n• Planor: 일정 조율 효율성을 극대화하는 스마트 캘린더 (planor.kro.kr)\n• 크티 (ctee.kr/place/seoharo): 고품질 디자인 목업과 창작 콘텐츠를 유통하여 첫 주 스토어 가입률과 15% 이상 높은 구매 전환율을 기록한 비즈니스 스토어.',
      followUps: ['who', 'contact']
    },
    contact: {
      id: 'contact',
      text: '💼 협업이나 외주 연락은 어떻게 하나요?',
      response: '언제나 창의적이고 감각적인 비즈니스 협업을 환영합니다! 가장 빠른 연락망은 아래와 같습니다:\n\n• 이메일: seoharo0111@gmail.com\n• 디스코드: seoharo\n• 깃허브: github.com/haroseo\n\n편하게 노크해 주세요. 제 가치를 담아 최고의 결과물로 보답해 드리겠습니다.',
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
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Dynamic Toss-style mesh background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />

      {/* Main chat window container */}
      <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-[32px] shadow-[0_20px_50px_rgba(15,23,42,0.04)] flex flex-col h-[75vh] relative overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white/70 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">서하루 메이커 챗봇</h3>
              <p className="text-[10px] text-emerald-500 font-semibold tracking-wide flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                정상 가동 중
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Toss UX</span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Sparkles size={13} />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm font-light whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-slate-950 text-white rounded-tr-none font-medium'
                      : 'bg-slate-50 text-slate-800 border border-slate-200/50 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white shrink-0">
                    <User size={13} />
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
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                  <Sparkles size={13} />
                </div>
                <div className="bg-slate-50 border border-slate-200/50 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full inline-block"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Question Buttons Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 backdrop-blur-sm sticky bottom-0">
          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3.5 select-none text-center">
            질문을 선택해보세요
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
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    onClick={() => handleOptionClick(optId)}
                    className="w-full px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 hover:text-slate-950 text-xs font-bold text-left flex items-center justify-between group shadow-sm transition-all select-none cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
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
