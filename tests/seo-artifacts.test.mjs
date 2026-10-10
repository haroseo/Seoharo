import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, writeFile, cp, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createServer } from 'vite';
import { getHtmlOutputPath, readPngDimensions, writeSiteArtifacts } from '../scripts/seo-artifacts.mjs';
import { verifySeoBuild } from '../scripts/verify-seo-build.mjs';

test('real public HTML artifacts stay within output and exclude private data', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'seoharo-seo-'));
  const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  try {
    const { renderPage, publicPages } = await server.ssrLoadModule('/src/entry-server.tsx');
    const template = (await readFile('index.html', 'utf8')).replace('/src/main.tsx', '/assets/runtime.js');
    await cp('public/assets', join(directory, 'assets'), { recursive: true });
    await cp('public/licenses', join(directory, 'licenses'), { recursive: true });
    await writeFile(join(directory, 'assets/runtime.js'), '/* Fixture resource; rendering is the real App. */');
    await cp('public/favicon.svg', join(directory, 'favicon.svg'));
    const pages = [...publicPages.map(page => renderPage(page.path)), renderPage('/404')];
    const input = { outputDirectory: directory, template, pages, cname: 'seoharo.kro.kr' };
    assert.deepEqual(await writeSiteArtifacts(input), { pages: 13, aliases: 12, notFound: 1 });
    assert.deepEqual(await verifySeoBuild(directory), { pages: 13, aliases: 12, notFound: 1, sitemapUrls: 13 });
    // Removing a configured search verification tag from the rendered head must fail release validation.
    const home = await readFile(join(directory, 'index.html'), 'utf8');
    const homeHead = home.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)[1];
    for (const tag of [
      '<meta property="og:image:alt" content="서주원·Seoharo 이름과 개인 로고, 생각을 시도하고 현실로 만든다는 소개가 담긴 카드" />',
      '<meta name="twitter:card" content="summary_large_image" />',
    ]) {
      assert.ok(homeHead.includes(tag));
      await writeFile(join(directory, 'index.html'), home.replace(tag, ''));
      await assert.rejects(verifySeoBuild(directory), /Wrong sharing metadata/);
      await writeFile(join(directory, 'index.html'), home.replace(tag, `${tag}${tag}`));
      await assert.rejects(verifySeoBuild(directory), /Wrong sharing metadata/);
      await writeFile(join(directory, 'index.html'), home);
    }
    for (const imageUrl of ['https://evil.example/image.png', 'https://seoharo.kro.kr/assets/../private.png', 'https://seoharo.kro.kr/assets/share/seoharo-ko-v1.png?key=private']) {
      const unsafePages = pages.map((page, index) => index ? page : { ...page, metadata: { ...page.metadata, imageUrl } });
      await assert.rejects(writeSiteArtifacts({ ...input, pages: unsafePages }), /Invalid sharing image/);
    }
    const wrongDimensions = pages.map((page, index) => index ? page : { ...page, metadata: { ...page.metadata, imageWidth: 999 } });
    await assert.rejects(writeSiteArtifacts({ ...input, pages: wrongDimensions }), /Image metadata mismatch/);
    for (const tag of [
      '<meta name="msvalidate.01" content="230AE140E58F75920EDB0EA20EC0FD39" />',
      '<meta name="naver-site-verification" content="239679eef06375e786bdccfc7fad64c1c67d1e7c" />',
    ]) {
      assert.equal(homeHead.split(tag).length - 1, 1, 'Crawler-readable ownership tag must appear once in the head');
      await writeFile(join(directory, 'index.html'), home.replace(tag, ''));
      await assert.rejects(verifySeoBuild(directory), /Missing or duplicate search verification/);
      await writeFile(join(directory, 'index.html'), home);
      await writeFile(join(directory, 'index.html'), home.replace(tag, `${tag}${tag}`));
      await assert.rejects(verifySeoBuild(directory), /Missing or duplicate search verification/);
      await writeFile(join(directory, 'index.html'), home);
    }
    assert.match(await readFile(join(directory, 'contact/index.html'), 'utf8'), /mailto:seoharo0111@gmail.com/);
    const sitemap = await readFile(join(directory, 'sitemap.xml'), 'utf8');
    assert.ok(sitemap.includes('https://seoharo.kro.kr/portfolio/company-work/'));
    assert.ok(!sitemap.includes('/career/group/'));
    for (const path of ['/../../escape', '/%2e%2e/escape', '//evil.example/x', '/x\\y']) assert.throws(() => getHtmlOutputPath(directory, path));
    assert.throws(() => readPngDimensions(Buffer.alloc(24)));
    await assert.rejects(writeSiteArtifacts({ ...input, cname: 'another.example' }));
    await assert.rejects(writeSiteArtifacts({ ...input, pages: [...pages, pages[0]] }));
    const contact = await readFile(join(directory, 'contact/index.html'), 'utf8');
    await writeFile(join(directory, 'contact/index.html'), contact.replace(/<main\b[^>]*>[\s\S]*?<\/main>/, '<main></main>'));
    await assert.rejects(verifySeoBuild(directory));
    await writeFile(join(directory, 'contact/index.html'), contact);
    await writeFile(join(directory, 'contact/index.html'), contact.replace('rel="canonical" href="https://seoharo.kro.kr/contact/"', 'rel="canonical" href="https://seoharo.kro.kr/"'));
    await assert.rejects(verifySeoBuild(directory));
    await writeFile(join(directory, 'contact/index.html'), contact);
    const missing = await readFile(join(directory, '404.html'), 'utf8');
    await writeFile(join(directory, '404.html'), missing.replace('noindex, follow', 'index, follow'));
    await assert.rejects(verifySeoBuild(directory));
    await writeFile(join(directory, '404.html'), missing);
    await mkdir(join(directory, '.well-known'));
    await writeFile(join(directory, '.well-known/discord.txt'), 'PRIVATE_FIXTURE=not-a-challenge');
    await assert.rejects(verifySeoBuild(directory));
    await rm(join(directory, '.well-known/discord.txt'));
    const planor = await readFile(join(directory, 'portfolio/planor/index.html'), 'utf8');
    const aboutMain = (await readFile(join(directory, 'index.html'), 'utf8')).match(/<main\b[^>]*>[\s\S]*?<\/main>/)[0];
    await writeFile(join(directory, 'portfolio/planor/index.html'), planor.replace(/<main\b[^>]*>[\s\S]*?<\/main>/, aboutMain));
    await assert.rejects(verifySeoBuild(directory));
    await writeFile(join(directory, 'portfolio/planor/index.html'), planor);
    await writeFile(join(directory, 'licenses/private.txt'), 'PRIVATE_FIXTURE=not-a-license');
    await assert.rejects(verifySeoBuild(directory), /Unexpected public file: licenses\/private\.txt/);
    await rm(join(directory, 'licenses/private.txt'));
    await writeFile(join(directory, '.env'), 'PRIVATE_FIXTURE=not-a-secret');
    await assert.rejects(verifySeoBuild(directory));
    await rm(join(directory, '.env'));
    await writeFile(join(directory, 'sitemap.xml'), sitemap.replace('</urlset>', '<url><loc>https://seoharo.kro.kr/about/</loc></url></urlset>'));
    await assert.rejects(verifySeoBuild(directory));
  } finally {
    await server.close();
    assert.ok(resolve(directory).startsWith(resolve(tmpdir()) + '\\') || resolve(directory).startsWith(resolve(tmpdir()) + '/'));
    assert.ok(directory.includes('seoharo-seo-'));
    await rm(directory, { recursive: true, force: true });
  }
});
