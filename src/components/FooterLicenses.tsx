
export default function FooterLicenses() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 text-xs text-zinc-400">
        <div className="md:flex md:justify-between md:items-start gap-6">
          <div className="space-y-2">
            <div className="font-semibold text-zinc-200">Credits & Licenses</div>
            <div className="text-[13px] leading-snug">
              <div>Pretendard ??SIL Open Font License (OFL) 1.1. <a href="https://github.com/orioncactus/pretendard/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline">LICENSE</a></div>
              <div>Manrope ??SIL Open Font License (OFL) 1.1. <a href="https://github.com/sharanda/manrope" target="_blank" rel="noopener noreferrer" className="underline">Project</a></div>
              <div>IBM Plex Mono ??SIL Open Font License (OFL) 1.1. <a href="https://github.com/IBM/plex" target="_blank" rel="noopener noreferrer" className="underline">Project</a></div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 text-zinc-500">
            <div>짤 {year} SEOHARO</div>
            <div className="mt-2 max-w-md text-[13px]">蹂??ъ씠?몄뿉 ?ы븿???고듃??媛곴린 紐낆떆???쇱씠?좎뒪???곕씪 ?ъ슜?⑸땲?? ?먯껜 ?몄뒪?????대떦 ?고듃??LICENSE ?뚯씪??諛고룷 ?⑦궎吏???ы븿?섏떆湲?諛붾엻?덈떎.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
