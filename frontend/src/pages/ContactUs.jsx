import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TopStrip from '@/components/TopStrip';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', mobile: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send');
    } finally { setSubmitting(false); }
  };

  const inputCls = "w-full h-12 px-4 bg-white border border-[#E6DCCA] rounded-lg focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 outline-none transition-all text-[#2D1B0E]";

  return (
    <div className="min-h-screen bg-[#FFFCF5] flex flex-col">
      <TopStrip />
      <Navbar />
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-8">
          <h1 className="font-english-heading text-2xl md:text-4xl text-[#621B00] mb-1" data-testid="contact-title">Contact Us</h1>
          <p className="font-telugu-heading text-xl text-[#8D6E63]">సంప్రదించండి</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white border border-[#E6DCCA] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-[#2D1B0E] mb-1">Address</h3>
                  <p className="text-xs text-[#5D4037]">Sri Parvathi Jadala Ramalingeshwara Swamy Devasthanams, Cheruvugattu, Nalgonda District, Telangana - 508001, India</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#E6DCCA] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-[#2D1B0E] mb-1">Phone</h3>
                  <p className="text-xs text-[#5D4037]">+91 XXXX-XXXXXX (Office)</p>
                  <p className="text-xs text-[#5D4037]">+91 XXXX-XXXXXX (Helpdesk)</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#E6DCCA] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-[#2D1B0E] mb-1">Email</h3>
                  <p className="text-xs text-[#5D4037]">info@spjrdevasthanams.org</p>
                  <p className="text-xs text-[#5D4037]">helpdesk@spjrdevasthanams.org</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#E6DCCA] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-[#2D1B0E] mb-1">Office Hours</h3>
                  <p className="text-xs text-[#5D4037]">Mon - Sat: 9:00 AM - 5:00 PM</p>
                  <p className="text-xs text-[#5D4037]">Sunday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="md:col-span-2">
            {success ? (
              <div className="bg-white border border-green-200 rounded-xl p-8 text-center" data-testid="contact-success">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="font-english-heading text-xl text-[#621B00] mb-2">Message Sent!</h2>
                <p className="text-sm text-[#5D4037] mb-4">We will get back to you soon.</p>
                <button onClick={() => setSuccess(false)} className="px-6 py-2 bg-[#E65100] text-white rounded-full text-sm">Send Another</button>
              </div>
            ) : (
              <div className="bg-white border border-[#E6DCCA] rounded-xl p-6" data-testid="contact-form">
                <h2 className="font-english-heading text-lg text-[#621B00] mb-4">Send us a Message</h2>
                {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-medium text-[#5D4037] mb-1">Name *</label><input className={inputCls} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required data-testid="contact-name" /></div>
                    <div><label className="block text-xs font-medium text-[#5D4037] mb-1">Email *</label><input type="email" className={inputCls} value={form.email} onChange={e => setForm({...form, email: e.target.value})} required data-testid="contact-email" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-medium text-[#5D4037] mb-1">Mobile</label><input className={inputCls} value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} /></div>
                    <div><label className="block text-xs font-medium text-[#5D4037] mb-1">Subject *</label><input className={inputCls} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required data-testid="contact-subject" /></div>
                  </div>
                  <div><label className="block text-xs font-medium text-[#5D4037] mb-1">Message *</label><textarea className={`${inputCls} h-28 py-3`} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required data-testid="contact-message" /></div>
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E65100] text-white font-english-heading tracking-wide uppercase text-sm rounded-full hover:bg-[#E65100]/90 transition-all disabled:opacity-50" data-testid="contact-submit">
                    <Send className="h-4 w-4" /> {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
