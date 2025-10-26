import { Mail, ShieldCheck, UserPlus } from 'lucide-react';

export default function FooterCTA() {
  return (
    <footer className="mt-14 border-t border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Join MangaFlow</h3>
          <p className="mt-2 text-neutral-400">Create an account to follow series, get notifications on new chapter releases, and enjoy an ad-light reading experience.</p>
          <div className="mt-4 flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-black font-medium hover:bg-yellow-300"><UserPlus className="h-4 w-4" />Sign up</button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-neutral-200 hover:bg-white/5">Log in</button>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-neutral-300">Legal & Safety</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />Copyright policy & DMCA</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />Age restrictions & content warnings</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />Data protection & encryption</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-neutral-300">Stay Updated</h4>
          <p className="mt-2 text-neutral-400">Get release alerts for your followed series.</p>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-neutral-400" />
              <input className="w-full bg-transparent outline-none text-sm" placeholder="your@email.com" />
            </div>
            <button className="rounded-lg bg-yellow-400 px-4 py-2 text-black font-medium hover:bg-yellow-300">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} MangaFlow. Built for readers and creators worldwide.</div>
    </footer>
  );
}
