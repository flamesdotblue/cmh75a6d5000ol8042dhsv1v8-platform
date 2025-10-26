import { useEffect, useMemo, useState } from 'react';
import { Moon, Sun, Star } from 'lucide-react';
import HeroCover from './components/HeroCover';
import DiscoverTabs from './components/DiscoverTabs';
import ReaderPreview from './components/ReaderPreview';
import FooterCTA from './components/FooterCTA';
import { seriesData as baseSeries } from './data/series';

export default function App() {
  const [dark, setDark] = useState(true);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  const filteredSeries = useMemo(() => {
    if (!query.trim()) return baseSeries;
    const q = query.toLowerCase();
    return baseSeries.filter((s) => {
      return (
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.tags.join(' ').toLowerCase().includes(q) ||
        s.genres.join(' ').toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-yellow-400/40 selection:text-yellow-100">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 grid place-items-center">
              <Star className="h-5 w-5 text-black" />
            </div>
            <div>
              <p className="font-semibold tracking-tight">MangaFlow</p>
              <p className="text-xs text-neutral-400">Read. Track. Publish.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-md bg-neutral-800/80 text-neutral-200 border border-white/10 px-2 py-1 text-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </select>
            <button
              onClick={() => setDark((d) => !d)}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-neutral-800/70 px-3 py-2 text-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <HeroCover query={query} setQuery={setQuery} allSeries={baseSeries} />
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <DiscoverTabs series={filteredSeries} />
        </section>
        <section className="border-t border-white/5 bg-neutral-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <ReaderPreview />
          </div>
        </section>
      </main>

      <FooterCTA />
    </div>
  );
}
