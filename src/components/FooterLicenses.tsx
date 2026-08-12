import React from 'react';

export default function FooterLicenses() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 text-xs text-zinc-400">
        <div className="md:flex md:justify-between md:items-start gap-6">
          <div className="space-y-2">
            <div className="font-semibold text-zinc-200">Credits & Licenses</div>
            <div className="text-[13px] leading-snug">
              <div>Pretendard — SIL Open Font License (OFL) 1.1. <a href="https://github.com/orioncactus/pretendard/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline">LICENSE</a></div>
              <div>Manrope — SIL Open Font License (OFL) 1.1. <a href="https://github.com/sharanda/manrope" target="_blank" rel="noopener noreferrer" className="underline">Project</a></div>
              <div>IBM Plex Mono — SIL Open Font License (OFL) 1.1. <a href="https://github.com/IBM/plex" target="_blank" rel="noopener noreferrer" className="underline">Project</a></div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 text-zinc-500">
            <div>© {year} SEOHARO</div>
            <div className="mt-2 max-w-md text-[13px]">본 사이트에 포함된 폰트는 각기 명시된 라이선스에 따라 사용됩니다. 자체 호스팅 시 해당 폰트의 LICENSE 파일을 배포 패키지에 포함하시기 바랍니다.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
