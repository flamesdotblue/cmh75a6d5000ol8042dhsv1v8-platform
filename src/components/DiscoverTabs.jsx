import { useMemo, useState } from 'react';
import { Flame, Star, CheckCircle2, BookOpen } from 'lucide-react';

const tabs = [
  { key: 'new', label: 'New Releases', icon: BookOpen },
  { key: 'trending', label: 'Trending', icon: Flame },
  { key: 'editors', label: "Editor's Picks", icon: Star },
  { key: 'completed', label: 'Completed', icon: CheckCircle2 },
];

export default function DiscoverTabs({ series }) {
  const [active, setActive] = useState('new');
  const visible = useMemo(() => {
    switch (active) {
      case 'trending':
        return [...series].sort((a, b) => b.popularity - a.popularity).slice(0, 12);
      case 'editors':
        return series.filter((s) => s.editorsPick).slice(0, 12);
      case 'completed':
        return series.filter((s) => s.status === 'Completed').slice(0, 12);
      case 'new':
      default:
        return [...series].sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate)).slice(0, 12);
    }
  }, [active, series]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold">Discover</h2>
        <div className="flex gap-2 overflow-auto p-1 rounded-lg border border-white/10 bg-neutral-900/60">
          {tabs.map((t) => {
            const Icon = t.icon;
            const selected = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors whitespace-nowrap ${selected ? 'bg-yellow-400 text-black' : 'text-neutral-300 hover:bg-white/5'}`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((s) => (
          <SeriesCard key={s.id} series={s} />
        ))}
      </div>
    </div>
  );
}

function SeriesCard({ series }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-neutral-900/50 hover:bg-neutral-900 transition-colors overflow-hidden">
      <div className="relative aspect-[3/4] w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 to-amber-600/15" />
        <div className="absolute inset-0 grid place-items-center text-yellow-300/90 text-5xl font-extrabold">
          {series.title.split(' ').map((w) => w[0]).slice(0,2).join('').toUpperCase()}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold truncate" title={series.title}>{series.title}</h3>
            <p className="text-xs text-neutral-400 truncate">{series.author}</p>
          </div>
          <span className={`shrink-0 text-[10px] rounded-full px-2 py-0.5 border ${series.status === 'Ongoing' ? 'border-emerald-400/30 text-emerald-300' : 'border-neutral-400/30 text-neutral-300'}`}>{series.status}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-neutral-300">
          <span className="rounded bg-white/5 px-2 py-0.5">{series.genres[0]}</span>
          <span className="rounded bg-white/5 px-2 py-0.5">{Math.round(series.rating * 10) / 10}★</span>
          <span className="rounded bg-white/5 px-2 py-0.5">Ch {series.chapters}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-neutral-400">{series.summary}</p>
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 rounded-lg bg-yellow-400 text-black text-sm font-medium px-3 py-2 hover:bg-yellow-300">Read latest</button>
          <button className="rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">Follow</button>
        </div>
      </div>
    </div>
  );
}
