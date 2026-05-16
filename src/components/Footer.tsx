export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Seoharo. All rights reserved.</p>
          <p>Designed & built with clarity, craft, and confidence.</p>
        </div>
      </div>
    </footer>
  );
}
