import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Newsletter from '@/components/Newsletter';
import { MapPin, Phone, Mail, ExternalLink, Users, Eye } from 'lucide-react';

export default function Footer() {
  const [stats, setStats] = useState({ total_visitors: 0, todays_visitors: 0 });

  useEffect(() => {
    api.post('/visitor-stats/track').catch(() => {});
    api.get('/visitor-stats').then(r => setStats(r.data)).catch(() => {});
  }, []);

  const footerLinks = {
    'About': [
      { to: '/about', label: 'History' },
      { to: '/about', label: 'Temple Management' },
      { to: '/about', label: 'Festivals' },
      { to: '/about', label: 'Timings' },
    ],
    'Sevas & Darshanam': [
      { to: '/sevas', label: 'Pratyaksha Seva' },
      { to: '/paroksha-seva', label: 'Paroksha Seva' },
      { to: '/sevas', label: 'Special Sevas' },
      { to: '/sevas', label: 'Festive Sevas' },
    ],
    'Donations': [
      { to: '/donations', label: 'e-Hundi' },
      { to: '/donations/annaprasadam', label: 'Annadanam' },
      { to: '/donations', label: 'General Donation' },
      { to: '/donations', label: 'Endowment Schemes' },
    ],
    'Online Booking': [
      { to: '/booking/quick', label: 'Quick Booking' },
      { to: '/sevas', label: 'Seva Booking' },
      { to: '/accommodation', label: 'Accommodation' },
    ],
    'Media Room': [
      { to: '/news', label: 'News & Events' },
      { to: '/gallery', label: 'Photo Gallery' },
      { to: '/media/gallery/videos', label: 'Video Gallery' },
      { to: '/media/live-tv', label: 'Live TV' },
    ],
    'Support': [
      { to: '/support/contact', label: 'Contact Us' },
      { to: '/support/faq', label: 'FAQ' },
      { to: '/volunteer', label: 'Volunteer' },
    ],
  };

  return (
    <footer className="bg-[#2D1B0E] text-[#FFE0B2]">
      {/* Pre-footer: Newsletter + App Download */}
      <div className="border-b border-[#5D4037]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Newsletter />
          <div className="bg-[#3D1F0A] rounded-xl p-6" data-testid="app-download">
            <h3 className="font-english-heading text-sm tracking-wide mb-2">DOWNLOAD MOBILE APP</h3>
            <p className="text-xs text-[#FFE0B2]/60 mb-4">Get temple updates, book sevas and track your bookings on the go.</p>
            <div className="flex gap-3">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-all" data-testid="google-play-btn">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1 1 0 01-.289-.752V2.566a1 1 0 01.289-.752zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.2-3.2l2.807 1.626a1 1 0 010 1.734l-2.807 1.626L15.206 12l2.493-2.493zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z"/></svg>
                Google Play
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-all" data-testid="app-store-btn">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M11.624 7.222c-.876 0-2.232-.996-3.636-.984-1.872.012-3.6 1.092-4.56 2.772-1.944 3.384-.504 8.4 1.404 11.148.924 1.344 2.028 2.856 3.48 2.808 1.392-.06 1.92-.912 3.612-.912s2.16.912 3.636.876c1.5-.024 2.448-1.368 3.372-2.712 1.056-1.548 1.488-3.048 1.512-3.132-.036-.012-2.904-1.116-2.928-4.428-.024-2.772 2.268-4.104 2.376-4.164-1.296-1.908-3.312-2.124-4.032-2.172-1.86-.144-3.36 1.008-4.236.9z"/></svg>
                App Store
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-english-heading text-xs tracking-widest text-[#D4AF37] mb-3 uppercase">{category}</h4>
              <div className="space-y-1.5">
                {links.map((l, i) => (
                  <Link key={i} to={l.to} className="block text-xs text-[#FFE0B2]/50 hover:text-[#D4AF37] transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact + Visitor Stats */}
        <div className="border-t border-[#5D4037]/30 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-english-heading text-xs tracking-widest text-[#D4AF37] mb-2">TEMPLE ADDRESS</h4>
            <div className="text-xs text-[#FFE0B2]/50 space-y-1">
              <p className="flex items-start gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" /> Sri Parvathi Jadala Ramalingeshwara Swamy Devasthanams, Cheruvugattu, Nalgonda District, Telangana - 508001, India</p>
              <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +91 XXXX-XXXXXX</p>
              <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> info@spjrdevasthanams.org</p>
            </div>
          </div>
          <div>
            <h4 className="font-english-heading text-xs tracking-widest text-[#D4AF37] mb-2">VISITOR STATS</h4>
            <div className="flex gap-4" data-testid="visitor-stats">
              <div className="bg-[#3D1F0A] rounded-lg px-4 py-3 text-center">
                <Users className="h-4 w-4 text-[#D4AF37] mx-auto mb-1" />
                <p className="text-lg font-bold">{stats.total_visitors?.toLocaleString()}</p>
                <p className="text-xs text-[#FFE0B2]/40">Total Visitors</p>
              </div>
              <div className="bg-[#3D1F0A] rounded-lg px-4 py-3 text-center">
                <Eye className="h-4 w-4 text-[#D4AF37] mx-auto mb-1" />
                <p className="text-lg font-bold">{stats.todays_visitors?.toLocaleString()}</p>
                <p className="text-xs text-[#FFE0B2]/40">Today</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-english-heading text-xs tracking-widest text-[#D4AF37] mb-2">FOLLOW US</h4>
            <div className="flex gap-3 mb-3" data-testid="social-icons">
              {[
                { name: 'Facebook', url: '#', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { name: 'Instagram', url: '#', path: 'M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm3 13a3 3 0 01-3 3H8a3 3 0 01-3-3V8a3 3 0 013-3h8a3 3 0 013 3zM12 8a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4zm5-7a1 1 0 100 2 1 1 0 000-2z' },
                { name: 'YouTube', url: '#', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
                { name: 'Twitter', url: '#', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
              ].map((s, i) => (
                <a key={i} href={s.url} className="w-8 h-8 bg-[#3D1F0A] rounded-full flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors" aria-label={s.name}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#FFE0B2]/60" fill="none" stroke="currentColor" strokeWidth="2"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#5D4037]/30 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8D6E63]">
          <p>&copy; {new Date().getFullYear()} Sri Parvathi Jadala Ramalingeshwara Swamy Devasthanams. All rights reserved.</p>
          <div className="flex gap-3 mt-2 sm:mt-0">
            <Link to="/about" className="hover:text-[#D4AF37]">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#D4AF37]">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
