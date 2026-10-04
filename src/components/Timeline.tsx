import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { aboutGrowth } from '../data/aboutContent';
import AboutReveal from './AboutReveal';
import { Link } from './router';
import { useOffscreenReveal } from './useOffscreenReveal';
import type { HTMLMotionProps } from 'framer-motion';

function GrowthItem(props: HTMLMotionProps<'li'>) {
  const { ref, reveal, reducedMotion } = useOffscreenReveal<HTMLLIElement>();
  return <motion.li {...props} ref={ref} initial={false}
    animate={reveal ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-64px' }}
    transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }} />;
}

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 26 });

  return (
    <section id="about-growth" tabIndex={-1} className="about-original-section relative overflow-hidden border-b border-zinc-900 bg-black px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="about-growth-heading">
      <div className="relative z-10 mx-auto max-w-5xl">
        <AboutReveal className="mb-16 text-center">
          <p className="section-overline">JOURNEY</p>
          <h2 id="about-growth-heading" className="section-title mb-6 mt-4 font-bold">{t('성장 여정', 'Growth journey')}</h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
            {t('처음 만들기 시작한 순간부터, 생각을 직접 실행하는 지금까지. 해온 일과 그 과정에서 얻은 것을 함께 정리했습니다.', 'From my first steps in making to the work I do now. What I tried, and what I took forward from each experience.')}
          </p>
        </AboutReveal>

        <div ref={timelineRef} className="growth-timeline__track relative mt-16">
          <div className="growth-timeline__rail" aria-hidden="true" />
          <motion.div className="growth-timeline__progress" style={{ scaleY: reduceMotion ? 1 : lineProgress }} aria-hidden="true" />
          <ol className="growth-timeline__list" role="list">
            {aboutGrowth.map((step, index) => (
              <GrowthItem
                key={step.id}
                id={step.anchorId}
                tabIndex={-1}
                role="listitem"
                className={'growth-timeline__item group scroll-mt-24 ' + (index % 2 === 0 ? 'growth-timeline__item--right' : 'growth-timeline__item--left') + (step.current ? ' growth-timeline__item--current' : '')}
              >
                <div className="growth-timeline__spacer" aria-hidden="true" />
                <span className="growth-timeline__node" aria-hidden="true" />
                <div className="growth-timeline__content">
                  <div className="growth-timeline__meta">
                    <span className="growth-timeline__phase">{step.phase[language]}</span>
                    {step.current && <span className="growth-timeline__now">{t('지금', 'Now')}</span>}
                    <span className="growth-timeline__meta-rule" aria-hidden="true" />
                    <ul className="growth-timeline__tags" aria-label={t('단계 키워드', 'Phase keywords')}>
                      {step.tags.map((tag) => <li key={tag.ko}>{tag[language]}</li>)}
                    </ul>
                  </div>
                  <h3 className="growth-timeline__title">{step.title[language]}</h3>
                  <div className="growth-timeline__card apple-widget">
                    <p>{step.body[language]}</p>
                    <dl className="growth-timeline__learning">
                      <dt>{t('얻은 것', 'What I took forward')}</dt>
                      <dd>{step.learning[language]}</dd>
                    </dl>
                    {step.workLink && <Link to={step.workLink.href} className="growth-timeline__work-link">
                      {step.workLink.label[language]} <ArrowRight size={15} aria-hidden="true" />
                    </Link>}
                  </div>
                </div>
              </GrowthItem>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
