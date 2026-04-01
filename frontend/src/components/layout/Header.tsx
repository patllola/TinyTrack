import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-brand-100">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 3 7.5 3 12c0 2.5 1 4.8 2.6 6.4L7 20h10l1.4-1.6C20 16.8 21 14.5 21 12c0-4.5-4-9-9-9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
            TinyTrack
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-brand-600 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/log"
            className="text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 px-4 py-1.5 rounded-xl shadow-sm transition-all"
          >
            + Log Feed
          </Link>
        </nav>
      </div>
    </header>
  );
}
