interface FilterScrollGeometry {
  sectionHeight: number;
  documentHeight: number;
  scrollY: number;
  viewportHeight: number;
}

export function getFilterHeightReserve({ sectionHeight, documentHeight, scrollY, viewportHeight }: FilterScrollGeometry): number {
  // Only reserve the space needed to prevent the document from clamping scrollY.
  const outsideSectionHeight = documentHeight - sectionHeight;
  return Math.max(0, Math.ceil(scrollY + viewportHeight - outsideSectionHeight));
}
