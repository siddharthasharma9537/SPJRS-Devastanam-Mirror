import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import TopStrip from '@/components/TopStrip';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { Zap, Flame, IndianRupee, ChevronRight, Clock } from 'lucide-react';

export default function QuickBooking() {
  const [sevas, setSevas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/sevas').then(r => setSevas(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFCF5] flex flex-col">
      <TopStrip />
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <h1 className="font-english-heading text-2xl md:text-3xl text-[#621B00] mb-1" data-testid="quick-booking-title">Quick Booking</h1>
          <p className="font-telugu-heading text-lg text-[#8D6E63]">త్వరిత బుకింగ్</p>
          <p className="text-sm text-[#5D4037] mt-2">Select a seva below to quickly book your slot</p>
        </div>
        {!user && (
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-[#621B00]">Please <Link to="/login" className="text-[#E65100] font-medium underline">sign in</Link> first to book a seva.</p>
          </div>
        )}
        {loading ? <p className="text-center text-[#8D6E63]">Loading sevas...</p> : (
          <div className="space-y-3">
            {sevas.map(seva => (
              <div key={seva.id} className="bg-white border border-[#E6DCCA] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#D4AF37]/50 transition-all" data-testid={`quick-seva-${seva.id}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#E65100]/10 rounded-full flex items-center justify-center shrink-0">
                    <Flame className="h-5 w-5 text-[#E65100]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2D1B0E] text-sm">{seva.name_english}</h3>
                    <p className="font-telugu-heading text-base text-[#621B00]">{seva.name_telugu}</p>
                    <div className="flex items-center gap-3 text-xs text-[#8D6E63] mt-1">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {seva.duration_minutes} min</span>
                      <span>Max {seva.max_persons_per_ticket} persons</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-0.5 text-lg font-bold text-[#E65100]"><IndianRupee className="h-4 w-4" />{seva.base_price}</span>
                  {user && userType === 'devotee' ? (
                    <Link to={`/book/${seva.id}`} className="inline-flex items-center gap-1 px-5 py-2 bg-[#E65100] text-white text-sm rounded-full hover:bg-[#E65100]/90 transition-all" data-testid={`quick-book-${seva.id}`}>
                      Book <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link to="/login" className="inline-flex items-center gap-1 px-5 py-2 border-2 border-[#E65100] text-[#E65100] text-sm rounded-full">Sign In</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
