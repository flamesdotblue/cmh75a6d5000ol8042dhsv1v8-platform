import { useMemo, useState } from 'react';
import { Maximize, Minimize, Sun, ZoomIn, ZoomOut, ArrowLeftRight, MousePointer2 } from 'lucide-react';

export default function ReaderPreview() {
  const [mode, setMode] = useState('webtoon'); // 'manga' or 'webtoon'
  const [brightness, setBrightness] = useState(100);
  const [zoom, setZoom] = useState(100);
  const [rtl, setRtl] = useState(true);

  const pageStyle = useMemo(() => ({
    filter: `brightness(${brightness}%)`,
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'center top'
  }), [brightness, zoom]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold">Reader Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('manga')}
            className={`rounded-md px-3 py-2 text-sm border ${mode === 'manga' ? 'bg-yellow-400 text-black border-yellow-400' : 'border-white/10 text-neutral-300 hover:bg-white/5'}`}
          >
            Manga (Paged)
          </button>
          <button
            onClick={() => setMode('webtoon')}
            className={`rounded-md px-3 py-2 text-sm border ${mode === 'webtoon' ? 'bg-yellow-400 text-black border-yellow-400' : 'border-white/10 text-neutral-300 hover:bg-white/5'}`}
          >
            Webtoon (Scroll)
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-neutral-900/50">
        <div className="flex flex-wrap items-center gap-3 p-3 border-b border-white/10 text-sm">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-400" />
            <input type="range" min="60" max="140" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
            <span className="w-10 text-right text-neutral-300">{brightness}%</span>
          </div>
          <div className="flex items-center gap-2">
            <ZoomOut className="h-4 w-4" />
            <input type="range" min="60" max="140" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
            <ZoomIn className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={rtl} onChange={(e) => setRtl(e.target.checked)} />
              <span>Right-to-left</span>
            </label>
          </div>
          <div className="ml-auto flex items-center gap-2 text-neutral-400">
            <MousePointer2 className="h-4 w-4" />
            <span className="hidden sm:inline">Demo controls only — no content required</span>
          </div>
        </div>

        {mode === 'manga' ? (
          <MangaPaged style={pageStyle} rtl={rtl} />
        ) : (
          <WebtoonScroll style={pageStyle} />
        )}
      </div>
    </div>
  );
}

function MangaPaged({ style, rtl }) {
  return (
    <div className={`p-4 ${rtl ? 'direction-rtl' : ''}`.trim()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        <MangaPage number={rtl ? 2 : 1} style={style} />
        <MangaPage number={rtl ? 1 : 2} style={style} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-neutral-400 px-2">
        <button className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 hover:bg-white/5"><Minimize className="h-4 w-4" />Prev page</button>
        <span>Page 1 of 24</span>
        <button className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 hover:bg-white/5">Next page<Maximize className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function MangaPage({ number, style }) {
  return (
    <div className="relative w-full max-w-[520px] aspect-[3/4] rounded-lg bg-neutral-800 overflow-hidden border border-white/10 shadow-inner">
      <div style={style} className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900" />
      </div>
      <span className="absolute bottom-2 right-3 text-xs text-neutral-400">{number}</span>
    </div>
  );
}

function WebtoonScroll({ style }) {
  return (
    <div className="max-h-[420px] overflow-y-auto p-4 space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="relative w-full mx-auto max-w-3xl aspect-[3/2] rounded-lg bg-neutral-800 overflow-hidden border border-white/10 shadow-inner">
          <div style={style} className="absolute inset-0">
            <div className="h-full w-full bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900" />
          </div>
          <span className="absolute bottom-2 right-3 text-xs text-neutral-400">Panel {i + 1}</span>
        </div>
      ))}
    </div>
  );
}
