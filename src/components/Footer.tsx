export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <p>© {currentYear} Seoharo. All rights reserved.</p>
          <p className="font-sans normal-case">새로운 미래를, 자신의 브랜드를 스토리로.</p>
        </div>
      </div>
    </footer>
  );
}
