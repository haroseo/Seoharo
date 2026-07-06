export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <div className="flex flex-col items-center md:items-start gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest text-center md:text-left">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {currentYear} Seoharo. All rights reserved.</p>
            <p className="font-sans normal-case text-zinc-400">새로운 미래를, 자신의 브랜드를 스토리로.</p>
          </div>
          <p className="text-[7.5px] leading-relaxed text-zinc-600 max-w-4xl tracking-wider font-medium font-mono normal-case">
            All project trademarks, logos, and brand identities (RoFolder, Limited™, HANN LABS™, LUXERET, SIMPLX) are properties of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
