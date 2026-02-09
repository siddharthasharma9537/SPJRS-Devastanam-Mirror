import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Tv, Printer, Clock } from 'lucide-react';

export default function TopStrip() {
  const [time, setTime] = useState(new Date());
  const [lang, setLang] = useState('English');

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#2D1B0E] text-[#FFE0B2]/80 text-xs" data-testid="top-strip">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            {' '}
            {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-[#FFE0B2]/80 outline-none text-xs cursor-pointer"
              data-testid="language-selector"
            >
              <option value="English" className="text-[#2D1B0E]">English</option>
              <option value="Telugu" className="text-[#2D1B0E]">తెలుగు</option>
            </select>
          </div>
          <Link to="/media/live-tv" className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors" data-testid="live-tv-link">
            <Tv className="h-3 w-3" />
            <span className="hidden sm:inline">Live TV</span>
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          </Link>
          <Link to="/print-ticket" className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors" data-testid="top-print-ticket">
            <Printer className="h-3 w-3" />
            <span className="hidden sm:inline">Print Ticket</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
