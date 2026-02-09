import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TopStrip from '@/components/TopStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { Clock, IndianRupee, ChevronRight, Globe } from 'lucide-react';

export default function SevaList({ paroksha = false }) {
  const [sevas, setSevas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userType } = useAuth();

  useEffect(() => {
    const url = paroksha ? '/sevas?paroksha=true' : '/sevas';
    api.get(url).then(r => setSevas(r.data)).finally(() => setLoading(false));
  }, [paroksha]);

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <TopStrip />
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-10">
          {paroksha ? (
            <>
              <div className="w-12 h-12 rounded-full bg-[#621B00]/10 flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-[#621B00]" />
              </div>
              <h1 className="font-english-heading text-2xl md:text-4xl text-[#621B00] mb-1" data-testid="sevas-title">Paroksha Seva</h1>
              <p className="font-telugu-heading text-xl text-[#8D6E63]">పరోక్ష సేవ</p>
              <p className="text-sm text-[#5D4037] mt-2 max-w-lg mx-auto">
                Worship Sri Ramalingeshwara Swamy from anywhere in the world. The priest will perform the seva on your behalf and prasadam can be arranged.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-english-heading text-2xl md:text-4xl text-[#621B00] mb-1" data-testid="sevas-title">Pratyaksha Seva</h1>
              <p className="font-telugu-heading text-xl text-[#8D6E63]">ప్రత్యక్ష సేవ</p>
              <p className="text-sm text-[#5D4037] mt-2">In-person seva at the temple. Book your slot online.</p>
            </>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#8D6E63]">Loading sevas...</div>
        ) : sevas.length === 0 ? (
          <div className="text-center py-12 text-[#8D6E63]">No sevas available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sevas.map((seva, i) => (
              <div key={seva.id} className="seva-card bg-white border border-[#E6DCCA] rounded-xl overflow-hidden animate-fade-in-up" style={{animationDelay:`${i*0.08}s`}} data-testid={`seva-card-${seva.id}`}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-english-heading text-base text-[#2D1B0E] tracking-wide">{seva.name_english}</h3>
                      <p className="font-telugu-heading text-lg text-[#621B00]">{seva.name_telugu}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#D4AF37]/10 text-[#8D2800] px-3 py-1 rounded-full text-sm font-medium">
                      <IndianRupee className="h-3.5 w-3.5" />{seva.base_price}
                    </div>
                  </div>
                  <p className="text-sm text-[#5D4037] mb-4 line-clamp-2">{seva.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[#8D6E63] mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {seva.duration_minutes} min</span>
                    <span>Max {seva.max_persons_per_ticket} persons/ticket</span>
                    {paroksha && <span className="px-2 py-0.5 bg-[#621B00]/10 rounded-full text-[#621B00]">Paroksha</span>}
                  </div>
                  {user && userType === 'devotee' ? (
                    <Link to={`/book/${seva.id}${paroksha ? '?paroksha=true' : ''}`} className="flex items-center justify-center gap-2 w-full h-11 bg-[#E65100] text-white font-english-heading text-sm tracking-wide uppercase rounded-full hover:bg-[#E65100]/90 transition-all shadow-md" data-testid={`book-btn-${seva.id}`}>
                      Book Now <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link to="/login" className="flex items-center justify-center gap-2 w-full h-11 border-2 border-[#E65100] text-[#E65100] font-english-heading text-sm tracking-wide uppercase rounded-full hover:bg-[#E65100]/5 transition-all">
                      Login to Book
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
