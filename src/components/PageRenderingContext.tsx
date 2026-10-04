import { useSyncExternalStore } from 'react';
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
export function usePageRendering() {
  return { hydrated: useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot) };
}
