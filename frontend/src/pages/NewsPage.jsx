import { useState, useEffect } from 'react';
import TopStrip from '@/components/TopStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { Newspaper, AlertCircle } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news').then(r => setNews(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <TopStrip />
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-english-heading text-2xl md:text-4xl text-[#621B00] mb-1" data-testid="news-title">Temple News</h1>
          <p className="font-telugu-heading text-xl text-[#8D6E63]">ఆలయ వార్తలు</p>
        </div>
        {loading ? <p className="text-center text-[#8D6E63]">Loading...</p> : news.length === 0 ? (
          <p className="text-center py-12 text-[#8D6E63]">No news at the moment.</p>
        ) : (
          <div className="space-y-4">
            {news.map(n => (
              <div key={n.id} className={`bg-white border rounded-xl p-6 ${n.is_important ? 'border-[#E65100]/30 bg-[#E65100]/5' : 'border-[#E6DCCA]'}`} data-testid={`news-item-${n.id}`}>
                <div className="flex items-start gap-3">
                  {n.is_important ? <AlertCircle className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" /> : <Newspaper className="h-5 w-5 text-[#8D6E63] shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-medium text-[#2D1B0E]">{n.title}</h2>
                      {n.is_important && <span className="px-2 py-0.5 bg-[#E65100] text-white text-xs rounded-full">Important</span>}
                    </div>
                    {n.title_telugu && <p className="font-telugu-heading text-base text-[#621B00] mb-2">{n.title_telugu}</p>}
                    <p className="text-sm text-[#5D4037] leading-relaxed mb-2">{n.content}</p>
                    {n.content_telugu && <p className="font-telugu-body text-sm text-[#8D6E63] leading-relaxed">{n.content_telugu}</p>}
                    <p className="text-xs text-[#8D6E63] mt-3">{new Date(n.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
