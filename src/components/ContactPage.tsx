import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Mail, MessageSquare, MapPin, Copy, Check, Send } from 'lucide-react';

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
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          
          {/* Card Showcase Side */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
            <div className="space-y-4">
              <p className="section-overline">Interactive Card</p>
              <h2 className="section-title text-slate-950 font-bold">
                Let’s shape your next story.
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 font-light">
                명확한 비주얼, 데이터 기반 마케팅, 그리고 신뢰받는 웹 설계를 지향합니다. 카드를 터치하여 정보를 뒤집어보세요.
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
                className="relative w-[340px] sm:w-[440px] h-[220px] sm:h-[260px] rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] bg-[#fdfbf7] border border-slate-200/80 transition-all duration-300 hover:shadow-[0_30px_70px_-15px_rgba(15,23,42,0.22)]"
              >
                {/* Paper texture */}
                <div 
                  className="absolute inset-0 rounded-2xl mix-blend-multiply opacity-40 pointer-events-none"
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
                      <h3 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ transform: "translateZ(20px)" }}>SEOHARO</h3>
                      <p className="text-[10px] font-bold tracking-widest text-slate-500 mt-2 uppercase" style={{ transform: "translateZ(15px)" }}>
                        Brand Designer, Marketer, & CEO
                      </p>
                    </div>
                    <div 
                      className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      S
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider" style={{ transform: "translateZ(25px)" }}>
                    <MapPin size={14} className="text-slate-400" />
                    {portfolioData.contact.location}
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
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Contact Node</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">{portfolioData.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <GithubIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">github.com/haroseo</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-slate-400" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">{portfolioData.contact.discord}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase flex justify-between items-center border-t border-slate-200/60 pt-4">
                    <span>seoharo.kro.kr</span>
                    <span className="text-slate-500 font-bold">Flip back</span>
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
                { type: 'email', label: 'Copy Email', value: portfolioData.contact.email, icon: Mail },
                { type: 'discord', label: 'Copy Discord', value: portfolioData.contact.discord, icon: MessageSquare },
                { type: 'github', label: 'Copy GitHub', value: portfolioData.contact.github, icon: GithubIcon }
              ].map(badge => (
                <button
                  key={badge.type}
                  onClick={() => handleCopy(badge.type as any, badge.value)}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 shadow-sm cursor-pointer hover:bg-slate-50 transition-all select-none"
                >
                  <div className="flex items-center gap-2">
                    <badge.icon className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{badge.label}</span>
                  </div>
                  {copiedText === badge.type ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.06)]"
            >
              <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-6">Send a Quick Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950/20 text-slate-800 text-sm font-medium outline-none bg-slate-50/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950/20 text-slate-800 text-sm font-medium outline-none bg-slate-50/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="프로젝트 의뢰 내용 및 아이디어를 보내주세요."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950/20 text-slate-800 text-sm font-medium outline-none bg-slate-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  className="w-full py-4 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-950/15 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {formStatus === 'idle' && (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                  {formStatus === 'sending' && 'Sending...'}
                  {formStatus === 'success' && 'Message Sent Successfully!'}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
