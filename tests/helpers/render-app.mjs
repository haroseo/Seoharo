import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

export async function withAppRenderer(callback) {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.tsx');
    return await callback(props => renderToString(createElement(App, props)));
  } finally { await server.close(); }
}
