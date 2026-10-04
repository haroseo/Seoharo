export const hiddenPortfolioIds = [
  'xeproject',
  'mindmap',
  'crewcheck',
  'movtier',
  'mapfit',
  'kustudio',
  'luxeret',
] as const;

const hiddenPortfolioIdSet = new Set<string>(hiddenPortfolioIds);

export function visiblePortfolioItems<T extends { id: string }>(items: T[]): T[] {
  return items.filter((item) => !hiddenPortfolioIdSet.has(item.id));
}
