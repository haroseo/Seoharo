// Casual image-save deterrence only, not access control or screenshot protection.
export function preventImageCopy(event: { target: EventTarget | null; preventDefault(): void }): void {
  if (typeof Element !== 'undefined' && event.target instanceof Element && event.target.closest('img')) {
    event.preventDefault();
  }
}
