import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Flame, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function DevoteeAuth({ isRegister = false }) {
  const [mode, setMode] = useState(isRegister ? 'register' : 'login');
  const [form, setForm] = useState({ name: '', mobile: '', email: '', gotram: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await api.post('/auth/devotee/register', form);
        login(res.data.token, res.data.devotee, 'devotee');
      } else {
        const res = await api.post('/auth/devotee/login', { mobile: form.mobile, password: form.password });
        login(res.data.token, res.data.devotee, 'devotee');
      }
      navigate('/sevas');
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full h-12 px-4 bg-white border border-[#E6DCCA] rounded-lg focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 outline-none transition-all text-[#2D1B0E]";

  return (
    <div className="min-h-screen bg-[#FFFCF5] flex flex-col">
      <div className="temple-gradient py-6 text-center text-white">
        <Link to="/" className="inline-flex items-center gap-2 text-[#FFE0B2] hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <div className="flex items-center justify-center gap-2 mb-1">
          <Flame className="h-5 w-5 text-[#D4AF37]" />
          <span className="font-english-heading text-sm tracking-wide">SPJR Devasthanams</span>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white border border-[#E6DCCA] rounded-xl p-8 shadow-sm">
            <h1 className="font-english-heading text-xl text-[#621B00] text-center mb-1" data-testid="auth-title">
              {mode === 'register' ? 'Devotee Registration' : 'Devotee Login'}
            </h1>
            <p className="font-telugu-heading text-lg text-[#8D6E63] text-center mb-6">
              {mode === 'register' ? 'భక్తుల నమోదు' : 'భక్తుల లాగిన్'}
            </p>

            {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4" data-testid="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#5D4037] mb-1">
                      Name / <span className="font-telugu-body">పేరు</span>
                    </label>
                    <input className={inputCls} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required data-testid="input-name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5D4037] mb-1">
                      Email / <span className="font-telugu-body">ఇమెయిల్</span>
                    </label>
                    <input className={inputCls} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} data-testid="input-email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5D4037] mb-1">
                      గోత్రం / Gotram
                    </label>
                    <input className={inputCls} value={form.gotram} onChange={e => setForm({...form, gotram: e.target.value})} data-testid="input-gotram" />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-[#5D4037] mb-1">
                  Mobile / <span className="font-telugu-body">మొబైల్</span>
                </label>
                <input className={inputCls} value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} required placeholder="9XXXXXXXXX" data-testid="input-mobile" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5D4037] mb-1">
                  Password / <span className="font-telugu-body">పాస్‌వర్డ్</span>
                </label>
                <div className="relative">
                  <input className={inputCls} type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} required data-testid="input-password" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63]">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#E65100] text-white font-english-heading tracking-wide uppercase rounded-full hover:bg-[#E65100]/90 transition-all shadow-lg disabled:opacity-50"
                data-testid="auth-submit-btn"
              >
                {loading ? 'Please wait...' : mode === 'register' ? 'Register' : 'Login'}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-[#5D4037]">
              {mode === 'login' ? (
                <p>New devotee? <button onClick={() => setMode('register')} className="text-[#E65100] font-medium hover:underline" data-testid="switch-to-register">Register here</button></p>
              ) : (
                <p>Already registered? <button onClick={() => setMode('login')} className="text-[#E65100] font-medium hover:underline" data-testid="switch-to-login">Login here</button></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
