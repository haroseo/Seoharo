import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';

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
      text: '안녕하세요. 아래 질문 카드 중 궁금하신 사항을 선택하시면 바로 답변해 드리겠습니다.'
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
      text: '서하루는 어떤 크리에이터인가요?',
      response: '저는 디자인, 마케팅, 개발을 융합하는 크리에이터입니다. 디자인 감각과 개발 지식을 결합하여 단순히 보기 좋은 화면을 넘어, 사용자가 반응하고 오래 머무를 수 있는 유기적인 경험을 기획하고 설계합니다.',
      followUps: ['projects', 'communities']
    },
    communities: {
      id: 'communities',
      text: '운영 중인 커뮤니티는 어떤 곳인가요?',
      response: '현재 누적 1,200명 이상의 유저와 소통하며 두 개의 대표적인 커뮤니티를 총괄하고 있습니다.\n\n• 로폴더 (RoFolder): 청소년 및 청년의 스타트업 창업을 독려하고 지원하는 네트워킹 서버\n• Limited™: 개발 및 가상 환경에 필요한 맞춤형 에셋과 무료 창작 리소스를 공급하는 채널',
      followUps: ['projects', 'contact']
    },
    projects: {
      id: 'projects',
      text: '주요 프로젝트 성과가 궁금해요.',
      response: '대표적인 론칭 및 참여 서비스는 다음과 같습니다.\n\n• Design Pick: 비주얼 영감을 제공하는 디자인 큐레이션 웹 플랫폼 (designs.kro.kr)\n• Planor: 일정 조율 효율성을 제공하는 스마트 협업 캘린더 (planor.kro.kr)\n• 나랏말싸미: 한글 창제 결합 원리를 타이핑 연습에 녹인 에듀테크 서비스 (훈민정음.kro.kr)',
      followUps: ['who', 'contact']
    },
    contact: {
      id: 'contact',
      text: '협업이나 연락은 어떻게 하나요?',
      response: '언제나 생산적이고 가치 있는 협업을 환영합니다. 가장 빠른 연락망은 다음과 같습니다.\n\n• 이메일: seoharo0111@gmail.com\n• 디스코드: seoharo\n• 인스타그램: tooday.zip\n\n편하게 이메일이나 메시지를 주시면 신속하게 확인 후 답장해 드리겠습니다.',
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
    <div className="relative min-h-screen bg-black flex items-center justify-center pt-28 pb-10 px-4 sm:px-6 overflow-hidden">
      
      {/* Sleek, KakaoTalk/Telegram-style dark messenger frame */}
      <div className="w-full max-w-xl bg-zinc-950/80 border border-zinc-900 rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.9)] flex flex-col h-[70vh] relative overflow-hidden backdrop-blur-2xl">
        
        {/* Chat Room Header */}
        <div className="px-6 py-4.5 border-b border-zinc-900/80 flex items-center bg-zinc-950/90 backdrop-blur-md sticky top-0 z-10">
          <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-bold text-sm font-display select-none">
            S
          </div>
          <div className="ml-3">
            <h3 className="text-xs font-bold text-white font-mono">서하루</h3>
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
                  className={`max-w-[75%] px-4.5 py-3 rounded-2xl text-[11px] sm:text-xs leading-relaxed whitespace-pre-line shadow-md font-light ${
                    msg.sender === 'user'
                      ? 'bg-white text-black rounded-tr-none font-semibold'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800/80 rounded-tl-none'
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
          <span className="block text-[8px] font-bold text-zinc-550 uppercase tracking-widest mb-3 select-none text-center font-mono">
            질문을 선택하세요
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
                    whileHover={{ scale: 1.01, borderColor: '#ffffff', backgroundColor: '#18181b' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    onClick={() => handleOptionClick(optId)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 text-zinc-300 hover:text-white text-xs font-semibold text-left flex items-center justify-between group shadow-sm transition-all select-none cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight size={12} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
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
