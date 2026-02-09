import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TopStrip from '@/components/TopStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { HandCoins, Heart, IndianRupee, CheckCircle, FileCheck } from 'lucide-react';

export default function Donations() {
  const { type } = useParams();
  const donationType = type === 'annaprasadam' ? 'AnnaPrasadam' : 'e-Hundi';
  const { user, userType } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ donor_name: '', donor_mobile: '', donor_email: '', donor_gotram: '', amount: '', message: '', is_anonymous: false });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [myDonations, setMyDonations] = useState([]);

  useEffect(() => {
    if (user && userType === 'devotee') {
      setForm(f => ({ ...f, donor_name: user.name || '', donor_mobile: user.mobile || '' }));
      api.get('/donations/my').then(r => setMyDonations(r.data)).catch(() => {});
    }
  }, [user, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/donations', { ...form, donation_type: donationType, amount: parseFloat(form.amount) });
      setSuccess(res.data);
      setForm(f => ({ ...f, amount: '', message: '' }));
    } catch (err) {
      alert(err.response?.data?.detail || 'Donation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const presetAmounts = donationType === 'AnnaPrasadam' ? [500, 1000, 2000, 5000, 10000] : [101, 501, 1001, 5001, 10001];
  const inputCls = "w-full h-12 px-4 bg-white border border-[#E6DCCA] rounded-lg focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 outline-none transition-all text-[#2D1B0E]";

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <TopStrip />
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: donationType === 'AnnaPrasadam' ? '#E65100' + '15' : '#D4AF37' + '20'}}>
            {donationType === 'AnnaPrasadam' ? <Heart className="h-8 w-8 text-[#E65100]" /> : <HandCoins className="h-8 w-8 text-[#D4AF37]" />}
          </div>
          <h1 className="font-english-heading text-2xl md:text-3xl text-[#621B00] mb-1" data-testid="donation-title">
            {donationType === 'AnnaPrasadam' ? 'AnnaPrasadam Donation' : 'e-Hundi Online Donation'}
          </h1>
          <p className="font-telugu-heading text-lg text-[#8D6E63]">
            {donationType === 'AnnaPrasadam' ? 'అన్నప్రసాదం దానం' : 'ఈ-హుండి ఆన్‌లైన్ దానం'}
          </p>
          <p className="text-sm text-[#5D4037] mt-2 max-w-lg mx-auto">
            {donationType === 'AnnaPrasadam'
              ? 'Sponsor sacred food offering (Annadanam) at the temple. Your contribution feeds pilgrims and earns divine blessings.'
              : 'e-Hundi allows devotees from across the globe to make donations for the welfare of the sacred temple.'}
          </p>
        </div>

        {success ? (
          <div className="bg-white border border-green-200 rounded-xl p-8 text-center max-w-md mx-auto" data-testid="donation-success">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="font-english-heading text-xl text-[#621B00] mb-2">Donation Received!</h2>
            <p className="font-telugu-heading text-lg text-[#8D6E63] mb-3">మీ దానం స్వీకరించబడింది!</p>
            <p className="text-sm text-[#5D4037] mb-1">Donation #: <span className="font-mono font-bold">{success.donation_number}</span></p>
            <p className="text-lg font-bold text-[#E65100] mb-4">Rs. {success.amount}</p>
            <p className="text-xs text-[#8D6E63] mb-4">Payment Status: Paid (MOCKED)</p>
            <div className="flex flex-col gap-3 items-center">
              <Link to={`/donation-receipt/${success.id}`} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#621B00] text-white rounded-full text-sm hover:bg-[#621B00]/90 transition-all shadow-md" data-testid="view-80g-receipt-btn">
                <FileCheck className="h-4 w-4" /> Download 80G Receipt
              </Link>
              <div className="flex gap-3">
                <button onClick={() => setSuccess(null)} className="px-6 py-2 bg-[#E65100] text-white rounded-full text-sm" data-testid="donate-again-btn">Donate Again</button>
                <Link to="/" className="px-6 py-2 border border-[#E6DCCA] rounded-full text-sm text-[#5D4037]">Home</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white border border-[#E6DCCA] rounded-xl p-6 shadow-sm" data-testid="donation-form">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Preset amounts */}
                  <div>
                    <label className="block text-sm font-medium text-[#5D4037] mb-2">మొత్తం / Amount (Rs.) <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {presetAmounts.map(a => (
                        <button key={a} type="button" onClick={() => setForm({...form, amount: String(a)})}
                          className={`px-4 py-2 rounded-full text-sm border transition-all ${String(form.amount) === String(a) ? 'bg-[#E65100] text-white border-[#E65100]' : 'border-[#E6DCCA] text-[#5D4037] hover:border-[#D4AF37]'}`}
                          data-testid={`amount-${a}`}>
                          Rs. {a.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <input type="number" className={inputCls} placeholder="Or enter custom amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required min="1" data-testid="input-amount" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5D4037] mb-1">పేరు / Name <span className="text-red-500">*</span></label>
                      <input className={inputCls} value={form.donor_name} onChange={e => setForm({...form, donor_name: e.target.value})} required data-testid="input-donor-name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5D4037] mb-1">మొబైల్ / Mobile <span className="text-red-500">*</span></label>
                      <input className={inputCls} value={form.donor_mobile} onChange={e => setForm({...form, donor_mobile: e.target.value})} required data-testid="input-donor-mobile" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5D4037] mb-1">ఇమెయిల్ / Email</label>
                      <input type="email" className={inputCls} value={form.donor_email} onChange={e => setForm({...form, donor_email: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5D4037] mb-1">గోత్రం / Gotram</label>
                      <input className={inputCls} value={form.donor_gotram} onChange={e => setForm({...form, donor_gotram: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5D4037] mb-1">సందేశం / Message</label>
                    <textarea className={`${inputCls} h-20 py-3`} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Optional message or prayer" />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-[#5D4037]">
                    <input type="checkbox" checked={form.is_anonymous} onChange={e => setForm({...form, is_anonymous: e.target.checked})} className="rounded" />
                    అనామక దానం / Anonymous Donation
                  </label>
                  <button type="submit" disabled={submitting} className="w-full h-12 bg-[#E65100] text-white font-english-heading tracking-wide uppercase rounded-full hover:bg-[#E65100]/90 transition-all shadow-lg disabled:opacity-50" data-testid="donate-submit-btn">
                    {submitting ? 'Processing...' : `Donate Rs. ${form.amount || '...'}`}
                  </button>
                </form>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl p-5">
                <h3 className="font-english-heading text-sm text-[#621B00] mb-2">{donationType === 'AnnaPrasadam' ? 'About AnnaPrasadam' : 'About e-Hundi'}</h3>
                <p className="text-xs text-[#5D4037] leading-relaxed">
                  {donationType === 'AnnaPrasadam'
                    ? 'Offering Annadhanam is one of the greatest acts of charity. Your donation helps feed thousands of devotees visiting the temple daily.'
                    : 'The e-Hundi facility enables devotees worldwide to contribute to the temple\'s upkeep, festivals, and charitable activities.'}
                </p>
              </div>
              {myDonations.length > 0 && (
                <div className="bg-white border border-[#E6DCCA] rounded-xl p-5">
                  <h3 className="text-sm font-medium text-[#2D1B0E] mb-3">My Recent Donations</h3>
                  <div className="space-y-2">
                    {myDonations.slice(0, 5).map(d => (
                      <div key={d.id} className="flex items-center justify-between text-xs">
                        <div>
                          <p className="text-[#5D4037]">{d.donation_type}</p>
                          <p className="text-[#8D6E63]">{new Date(d.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-[#E65100]">Rs. {d.amount}</span>
                          <Link to={`/donation-receipt/${d.id}`} className="block text-[#621B00] hover:underline mt-0.5">80G Receipt</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
