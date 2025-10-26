import { useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Search } from 'lucide-react';

export default function HeroCover({ query, setQuery, allSeries }) {
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const seen = new Set();
    const results = [];
    for (const s of allSeries) {
      const hay = (
        s.title + ' ' + s.author + ' ' + s.tags.join(' ') + ' ' + s.genres.join(' ')
      ).toLowerCase();
      if (hay.includes(q)) {
        const key = s.title.toLowerCase();
        if (!seen.has(key)) {
          results.push(s);
          seen.add(key);
        }
      }
      if (results.length >= 6) break;
    }
    return results;
  }, [query, allSeries]);

  return (
    <section className="relative w-full h-[62vh] min-h-[480px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vc19ejtcC5VJjy5v/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-neutral-950/95" />

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Your hub for Manga & Webtoon</h1>
          <p className="mt-3 text-neutral-300 max-w-2xl">Discover new releases, track your reading, and enjoy a seamless, customizable reader in dark or light mode.</p>

          <div className="mt-8">
            <div className="relative">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 p-2 backdrop-blur">
                <Search className="h-5 w-5 text-neutral-400 ml-2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  placeholder="Search titles, authors, tags, or summaries..."
                  className="w-full bg-transparent outline-none text-neutral-100 placeholder:text-neutral-500"
                  aria-label="Search"
                />
                <button className="rounded-lg bg-yellow-400 px-4 py-2 text-black font-medium hover:bg-yellow-300 transition-colors">Search</button>
              </div>

              {focused && suggestions.length > 0 && (
                <div className="absolute mt-2 w-full rounded-xl border border-white/10 bg-neutral-950/95 backdrop-blur shadow-xl overflow-hidden">
                  <ul className="max-h-72 overflow-auto">
                    {suggestions.map((s) => (
                      <li key={s.id}>
                        <button
                          className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3"
                          onMouseDown={() => setQuery(s.title)}
                        >
                          <div className="h-10 w-10 rounded-md bg-gradient-to-br from-yellow-400/20 to-amber-600/20 grid place-items-center text-yellow-300 text-sm font-semibold">
                            {s.title.split(' ').map((w) => w[0]).slice(0,2).join('').toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-neutral-100">{s.title}</p>
                            <p className="text-xs text-neutral-400">{s.author} • {s.genres.join(', ')}</p>
                          </div>
                          <span className="ml-auto text-xs rounded-full border border-white/10 px-2 py-0.5 text-neutral-300">{s.status}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-400">
              <span>Popular tags:</span>
              {['Action','Romance','Fantasy','BL','GL','Comedy','Drama'].map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 text-neutral-200"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
