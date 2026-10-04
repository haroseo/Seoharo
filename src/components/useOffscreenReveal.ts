import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePageRendering } from './PageRenderingContext';
import { getRevealPolicy } from '../data/renderingPolicy';
export function useOffscreenReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { hydrated } = usePageRendering();
  const reducedMotion = useReducedMotion() ?? false;
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    if (!hydrated || reducedMotion) return;
    const frame = requestAnimationFrame(() => {
      setReveal(getRevealPolicy({ hydrated, reducedMotion, top: ref.current?.getBoundingClientRect().top ?? null, viewportHeight: window.innerHeight }) === 'reveal');
    });
    return () => cancelAnimationFrame(frame);
  }, [hydrated, reducedMotion]);
  return { ref, reveal: reveal && !reducedMotion, reducedMotion };
}
