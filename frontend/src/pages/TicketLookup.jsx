import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopStrip from '@/components/TopStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { Search, Printer, Eye, Ticket } from 'lucide-react';

export default function TicketLookup() {
  const [searchType, setSearchType] = useState('booking_number');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const params = searchType === 'booking_number' ? `booking_number=${query}` : `mobile=${query}`;
      const res = await api.get(`/bookings/lookup/ticket?${params}`);
      setResults(res.data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = { Confirmed: 'bg-green-100 text-green-800', Completed: 'bg-blue-100 text-blue-800', Cancelled: 'bg-red-100 text-red-800', Pending: 'bg-yellow-100 text-yellow-800' };
  const inputCls = "w-full h-12 px-4 bg-white border border-[#E6DCCA] rounded-lg focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 outline-none transition-all text-[#2D1B0E]";

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <TopStrip />
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
            <Ticket className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <h1 className="font-english-heading text-2xl md:text-3xl text-[#621B00] mb-1" data-testid="ticket-lookup-title">Print a Ticket</h1>
          <p className="font-telugu-heading text-lg text-[#8D6E63]">టికెట్ ప్రింట్ చేయండి</p>
          <p className="text-sm text-[#5D4037] mt-2">Look up and reprint your seva booking ticket</p>
        </div>

        <div className="bg-white border border-[#E6DCCA] rounded-xl p-6 shadow-sm" data-testid="ticket-lookup-form">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <button type="button" onClick={() => setSearchType('booking_number')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${searchType === 'booking_number' ? 'bg-[#E65100] text-white' : 'bg-[#FDFBF7] text-[#5D4037] border border-[#E6DCCA]'}`} data-testid="search-by-booking">
                By Booking Number
              </button>
              <button type="button" onClick={() => setSearchType('mobile')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${searchType === 'mobile' ? 'bg-[#E65100] text-white' : 'bg-[#FDFBF7] text-[#5D4037] border border-[#E6DCCA]'}`} data-testid="search-by-mobile">
                By Mobile Number
              </button>
            </div>
            <div className="flex gap-2">
              <input className={inputCls} placeholder={searchType === 'booking_number' ? 'Enter booking number (e.g., SPJR-...)' : 'Enter mobile number'} value={query} onChange={e => setQuery(e.target.value)} required data-testid="input-ticket-search" />
              <button type="submit" disabled={loading} className="px-6 bg-[#E65100] text-white rounded-lg hover:bg-[#E65100]/90 transition-all disabled:opacity-50" data-testid="search-ticket-btn">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {loading && <p className="text-center py-8 text-[#8D6E63]">Searching...</p>}

        {searched && !loading && results.length === 0 && (
          <p className="text-center py-8 text-[#8D6E63]" data-testid="no-results">No tickets found. Check your booking number or mobile.</p>
        )}

        {results.length > 0 && (
          <div className="mt-6 space-y-3" data-testid="ticket-results">
            <p className="text-sm text-[#8D6E63]">{results.length} ticket(s) found</p>
            {results.map(b => (
              <div key={b.id} className="bg-white border border-[#E6DCCA] rounded-xl p-5 hover:border-[#D4AF37]/50 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-[#621B00] font-bold mb-1">{b.booking_number}</p>
                    <p className="text-sm font-medium text-[#2D1B0E]">{b.seva_name_english} <span className="font-telugu-heading text-[#8D6E63]">{b.seva_name_telugu}</span></p>
                    <p className="text-xs text-[#8D6E63]">{b.for_date} | {b.slot_start_time}-{b.slot_end_time} | {b.devotee_name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[b.status] || 'bg-gray-100'}`}>{b.status}</span>
                    <Link to={`/ticket/${b.id}`} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#621B00] text-white text-xs rounded-full hover:bg-[#621B00]/90">
                      <Printer className="h-3 w-3" /> Print
                    </Link>
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
