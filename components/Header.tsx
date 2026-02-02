"use client";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 border-b border-gray-100">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🎯</span>
          <span className="font-bold text-xl text-text-primary group-hover:text-linkedin-primary transition-colors">
            PrepEntrevista
          </span>
        </a>
        <span className="text-xs text-gray-500 hidden sm:block">
          Preparação inteligente para entrevistas
        </span>
      </div>
    </header>
  );
}
