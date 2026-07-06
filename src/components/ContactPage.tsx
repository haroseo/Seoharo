import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Mail, MessageSquare, MapPin, Copy, Check, Send } from 'lucide-react';
import { useLanguage } from './LanguageContext';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ContactPage() {
  const { language, t } = useLanguage();
  const data = portfolioData[language];

  // 3D Business Card Mouse Spring variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Card Flip state
  const [isFlipped, setIsFlipped] = useState(false);

  // Copy state
  const [copiedText, setCopiedText] = useState<'email' | 'discord' | 'github' | null>(null);

  // Form state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return; // Disable tilt during flipped state to make reading easy
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopy = (type: 'email' | 'discord' | 'github', text: string) => {
    navigator.clipboard.writeText(text);
    copiedText === null && setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setFormStatus('sending');

    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("VITE_DISCORD_WEBHOOK_URL is not defined in environment variables. Simulating success.");
      setTimeout(() => {
        setFormStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [
            {
              title: '📬 포트폴리오 사이트 새로운 문의 접수',
              color: 0x000000,
              fields: [
                {
                  name: '👤 이름 / 닉네임',
                  value: formState.name,
                  inline: true,
                },
                {
                  name: '📧 이메일 주소',
                  value: formState.email,
                  inline: true,
                },
                {
                  name: '💬 문의 내용',
                  value: formState.message,
                },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        throw new Error('Webhook transmission failed');
      }
    } catch (error) {
      console.error('Error sending webhook:', error);
      setFormStatus('idle');
      alert(
        t(
          '메시지 전송에 실패했습니다. 상단의 이메일이나 디스코드를 통해 연락 부탁드립니다.',
          'Failed to send message. Please contact me directly via Email or Discord.'
        )
      );
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black text-white min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          
          {/* Card Showcase Side */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
            <div className="space-y-4">
              <p className="section-overline">{t('연락처', 'CONTACT')}</p>
              <h2 className="section-title font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent font-bold">
                {t('생산적인 아이디어를 함께 실현합니다', 'Let’s shape your next story.')}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-400 font-light">
                {t('디자인, 마케팅, 프로그래밍을 통해 문제를 해결하며, 사용자 중심의 결과물을 만듭니다. 명함을 클릭해 뒤집어보세요.', 'Solving problems through design, marketing, and programming, delivering user-centered outcomes. Click the card to flip.')}
              </p>
            </div>

            {/* Interactive Card */}
            <div 
              style={{ perspective: 1500 }}
              className="relative cursor-pointer select-none"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  rotateX: isFlipped ? 0 : rotateX,
                  rotateY: isFlipped ? 180 : rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-[340px] sm:w-[440px] h-[220px] sm:h-[260px] rounded-3xl shadow-2xl bg-zinc-950 border border-zinc-900 transition-all duration-300"
              >
                {/* Tech grain texture */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                  }}
                />

                {/* FRONT OF THE CARD */}
                <div 
                  className="absolute inset-0 p-8 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden", transform: "translateZ(40px)" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-tight text-white font-display" style={{ transform: "translateZ(20px)" }}>SEOHARO</h3>
                      <p className="text-[9px] font-mono tracking-widest text-zinc-500 mt-2 uppercase" style={{ transform: "translateZ(15px)" }}>
                        Brand Designer, Marketer, & Developer
                      </p>
                    </div>
                    <div 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-extrabold text-lg shadow-lg font-display"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      S
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-wider" style={{ transform: "translateZ(25px)" }}>
                    <MapPin size={12} className="text-zinc-650" />
                    {data.contact.location}
                  </div>
                </div>

                {/* BACK OF THE CARD */}
                <div 
                  className="absolute inset-0 p-8 flex flex-col justify-between"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg) translateZ(40px)" 
                  }}
                >
                  <div className="space-y-4">
                    <span className="text-[8.5px] font-mono uppercase tracking-widest text-zinc-500">{t('연락망', 'Contact Node')}</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs font-mono text-zinc-350">{data.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <GithubIcon className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs font-mono text-zinc-350">{data.contact.github.replace('https://', '')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs font-mono text-zinc-350">{data.contact.discord}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[8.5px] text-zinc-500 font-mono tracking-wider uppercase flex justify-between items-center border-t border-zinc-900 pt-4">
                    <span>seoharo.kro.kr</span>
                    <span className="text-zinc-400 font-bold">{t('돌아가기', 'Flip back')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Quick Contact Form & Copy Badges */}
          <div className="space-y-8">
            {/* Copy Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { type: 'email', label: t('이메일 복사', 'Copy Email'), value: data.contact.email, icon: Mail },
                { type: 'discord', label: t('디스코드 복사', 'Copy Discord'), value: data.contact.discord, icon: MessageSquare },
                { type: 'github', label: t('깃허브 복사', 'Copy GitHub'), value: data.contact.github, icon: GithubIcon }
              ].map(badge => (
                <motion.button
                  key={badge.type}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(badge.type as any, badge.value);
                  }}
                  whileHover={{ scale: 1.025, borderColor: 'rgba(255, 255, 255, 0.15)', boxShadow: '0 0 12px rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 hover:border-white/10 transition-all select-none"
                >
                  <div className="flex items-center gap-2">
                    <badge.icon className="w-4 h-4 text-zinc-450" />
                    <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">{badge.label}</span>
                  </div>
                  {copiedText === badge.type ? (
                    <Check className="w-4 h-4 text-zinc-300" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-650" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="apple-widget p-8 md:p-10"
            >
              <h3 className="text-lg font-bold tracking-tight text-white mb-6 font-display">{t('빠른 메시지 전송', 'Send a Quick Message')}</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="toss-input-group">
                  <label htmlFor="name" className="block text-[8px] font-mono font-bold text-zinc-550 uppercase tracking-widest mb-1">{t('이름', 'Name')}</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t('이름을 입력해 주세요.', 'Enter your name.')}
                    className="w-full py-2.5 text-white text-xs outline-none bg-transparent font-light transition-all placeholder:text-zinc-600"
                  />
                  <div className="toss-input-line" />
                  <div className="toss-input-focus-line" />
                </div>

                <div className="toss-input-group">
                  <label htmlFor="email" className="block text-[8px] font-mono font-bold text-zinc-550 uppercase tracking-widest mb-1">{t('이메일 주소', 'Email Address')}</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="example@email.com"
                    className="w-full py-2.5 text-white text-xs outline-none bg-transparent font-light transition-all placeholder:text-zinc-600"
                  />
                  <div className="toss-input-line" />
                  <div className="toss-input-focus-line" />
                </div>

                <div className="toss-input-group">
                  <label htmlFor="message" className="block text-[8px] font-mono font-bold text-zinc-550 uppercase tracking-widest mb-1">{t('내용', 'Message')}</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t('프로젝트 의뢰 내용이나 협업 아이디어를 자유롭게 공유해 주세요.', 'Please share your project details or collaboration ideas.')}
                    className="w-full py-2.5 text-white text-xs outline-none bg-transparent font-light resize-none transition-all placeholder:text-zinc-600"
                  />
                  <div className="toss-input-line" />
                  <div className="toss-input-focus-line" />
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  whileHover={{ scale: 1.012 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 rounded-xl bg-[var(--toss-blue)] hover:bg-[var(--toss-blue-hover)] text-white font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all disabled:bg-zinc-800 disabled:text-zinc-650 disabled:cursor-not-allowed"
                >
                  {formStatus === 'idle' && (
                    <>
                      {t('메시지 보내기', 'Send Message')}
                      <Send size={12} />
                    </>
                  )}
                  {formStatus === 'sending' && t('보내는 중...', 'Sending...')}
                  {formStatus === 'success' && t('메시지가 성공적으로 전송되었습니다!', 'Message Sent Successfully!')}
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
