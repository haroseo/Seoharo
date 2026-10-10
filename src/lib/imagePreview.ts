import { imagePreviewAssets } from '../data/imagePreviewAssets.ts';

export function getImagePreview(id: string) {
  const preview = imagePreviewAssets[id];
  if (!preview) throw new Error(`Missing public image preview: ${id}`);
  return preview;
}
