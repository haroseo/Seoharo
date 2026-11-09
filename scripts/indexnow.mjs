import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolvePublicPage } from '../src/data/publicPages.ts';
import { SITE_ORIGIN, toCanonicalUrl } from '../src/data/siteUrl.ts';

// IndexNow uses a public file on the verified host.
export const indexNowKey = '4a6cc6016d62930796702a86a2f1fb5c';
export const indexNowKeyFile = `${indexNowKey}.txt`;

async function submitChangedPaths(paths) {
  if (!paths.length) throw new Error('Provide the changed public paths, for example: node scripts/indexnow.mjs / /portfolio/');
  const urlList = [...new Set(paths.map(path => {
    const page = resolvePublicPage(path);
    if (!page?.indexable) throw new Error(`Expected a canonical public path: ${path}`);
    return toCanonicalUrl(page.canonicalPath);
  }))];
  const keyLocation = `${SITE_ORIGIN}/${indexNowKeyFile}`;
  const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(12000) });
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== indexNowKey) {
    throw new Error('The production IndexNow key is not available yet.');
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE_ORIGIN).hostname, key: indexNowKey, keyLocation, urlList }),
    signal: AbortSignal.timeout(15000),
  });
  if (response.status !== 200 && response.status !== 202) throw new Error(`IndexNow returned HTTP ${response.status}`);
  console.log(JSON.stringify({ submitted: urlList.length, status: response.status }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    await submitChangedPaths(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
