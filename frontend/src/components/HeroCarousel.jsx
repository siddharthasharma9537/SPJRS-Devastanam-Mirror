import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { title: 'Sri Parvathi Jadala Ramalingeshwara Swamy', subtitle: 'శ్రీ పార్వతీ జడల రామలింగేశ్వర స్వామి దేవస్థానం', desc: 'Cheruvugattu, Nalgonda, Telangana', cta: { label: 'Book Seva', to: '/sevas' }, image: 'https://images.unsplash.com/photo-1582560475093-6f09a3dc9739?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Maha Shivaratri Brahmotsavams', subtitle: 'మహా శివరాత్రి బ్రహ్మోత్సవాలు', desc: 'Annual grand festival attracting lakhs of devotees', cta: { label: 'View News', to: '/news' }, image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1600&q=80' },
  { title: 'e-Hundi Online Donation', subtitle: 'ఈ-హుండి ఆన్‌లైన్ దానం', desc: 'Contribute to temple welfare from anywhere in the world', cta: { label: 'Donate Now', to: '/donations' }, image: 'https://images.unsplash.com/photo-1567591370504-82a4d58d4349?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Paroksha Seva', subtitle: 'పరోక్ష సేవ', desc: 'Remote seva - worship without being physically present', cta: { label: 'Book Now', to: '/paroksha-seva' }, image: 'https://images.unsplash.com/photo-1690312021800-9b5991464fd2?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Pilgrim Accommodation', subtitle: 'యాత్రికుల వసతి', desc: 'Comfortable rooms and cottages for visiting devotees', cta: { label: 'Book Room', to: '/accommodation' }, image: 'https://images.unsplash.com/photo-1716047270022-b01edb8022af?auto=format&fit=crop&w=1600&q=80' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden" data-testid="hero-carousel">
      {/* Background */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-3xl animate-fade-in-up" key={current}>
          <p className="font-telugu-heading text-lg md:text-2xl text-[#D4AF37] mb-2">{slide.subtitle}</p>
          <h1 className="font-english-heading text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">{slide.title}</h1>
          <p className="text-[#FFE0B2]/80 text-sm md:text-base mb-6">{slide.desc}</p>
          <Link to={slide.cta.to} className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#2A1800] font-english-heading tracking-wide uppercase text-sm px-6 py-2.5 rounded-full hover:bg-[#e6c44a] transition-all shadow-lg" data-testid="hero-cta">
            {slide.cta.label}
          </Link>
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-all" data-testid="carousel-prev">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-all" data-testid="carousel-next">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-[#D4AF37] w-6' : 'bg-white/40 hover:bg-white/60'}`} data-testid={`carousel-dot-${i}`} />
        ))}
      </div>
    </section>
  );
}
