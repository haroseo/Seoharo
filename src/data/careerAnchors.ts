export function getContributionAnchor(slug: string, index: number) {
  return `contribution-${slug}-${index}`;
}

export function getVentureAnchor(name: string) {
  return `venture-${name.toLocaleLowerCase().replace(/\s+/g, '-')}`;
}
