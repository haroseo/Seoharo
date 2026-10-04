export function getRevealPolicy({ hydrated, reducedMotion, top, viewportHeight }: { hydrated: boolean; reducedMotion: boolean; top: number | null; viewportHeight: number | null }): 'visible' | 'reveal' {
  return hydrated && !reducedMotion && top !== null && viewportHeight !== null && Number.isFinite(top) && Number.isFinite(viewportHeight) && viewportHeight > 0 && top >= viewportHeight ? 'reveal' : 'visible';
}
