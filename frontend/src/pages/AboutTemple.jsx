import TopStrip from '@/components/TopStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';

export default function AboutTemple() {
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <TopStrip />
      <Navbar />

      {/* Hero */}
      <div className="temple-gradient text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-telugu-heading text-xl text-[#D4AF37] mb-2">శ్రీ చెరువుగట్టు క్షేత్ర చరిత్ర</p>
          <h1 className="font-english-heading text-2xl md:text-4xl mb-2" data-testid="about-title">About the Temple</h1>
          <p className="text-[#FFE0B2]/70 text-sm">Sri Parvathi Jadala Ramalingeshwara Swamy Devasthanams</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* History */}
        <section>
          <h2 className="font-english-heading text-xl text-[#621B00] mb-1">Temple History</h2>
          <p className="font-telugu-heading text-base text-[#8D6E63] mb-4">ఆలయ చరిత్ర</p>
          <div className="text-sm text-[#5D4037] leading-relaxed space-y-3">
            <p>Sri Parvathi Jadala Ramalingeshwara Swamy temple at Cheruvugattu, Nalgonda district, is one of the most revered Shiva temples in Telangana. The temple is dedicated to Lord Shiva in the form of Ramalingeshwara and Goddess Parvathi.</p>
            <p>The hill of Cheruvugattu is considered sacred, and the temple atop it draws thousands of devotees, especially during the annual Maha Shivaratri Brahmotsavams. The festival is celebrated with great fervor and devotion, featuring special pujas, abhishekams, and cultural events spanning multiple days.</p>
            <p>The temple is known for its unique tradition of "Jadala" (matted hair) associated with Lord Shiva's cosmic dance. The presiding deity, Sri Ramalingeshwara Swamy, is believed to be self-manifested (Swayambhu), adding to the spiritual significance of this ancient shrine.</p>
          </div>
        </section>

        {/* Significance */}
        <section className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl p-6">
          <h2 className="font-english-heading text-xl text-[#621B00] mb-1">Spiritual Significance</h2>
          <p className="font-telugu-heading text-base text-[#8D6E63] mb-4">ఆధ్యాత్మిక ప్రాముఖ్యత</p>
          <div className="text-sm text-[#5D4037] leading-relaxed space-y-3">
            <p>Cheruvugattu is considered equivalent to Srisailam in spiritual merit. Devotees believe that worshipping at this temple bestows the same divine blessings as visiting the great Jyotirlinga shrines.</p>
            <p>The temple complex houses multiple shrines and mandapams, each with historical and mythological significance. The sacred hill provides a serene atmosphere conducive to meditation and prayer.</p>
          </div>
        </section>

        {/* Festivals */}
        <section>
          <h2 className="font-english-heading text-xl text-[#621B00] mb-1">Major Festivals</h2>
          <p className="font-telugu-heading text-base text-[#8D6E63] mb-4">ప్రధాన పండుగలు</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Maha Shivaratri Brahmotsavams', nameTe: 'మహా శివరాత్రి బ్రహ్మోత్సవాలు', desc: 'The grandest festival spanning 10+ days with special sevas, cultural programs, and lakhs of devotees.' },
              { name: 'Karthika Masam', nameTe: 'కార్తీక మాసం', desc: 'Sacred month of Lord Shiva with daily special pujas and deepotsavam.' },
              { name: 'Maha Pradosham', nameTe: 'మహా ప్రదోషం', desc: 'Bi-monthly observance with special Shiva puja during twilight hours.' },
              { name: 'Pournami & Amavasya', nameTe: 'పౌర్ణమి & అమావాస్య', desc: 'Full moon and new moon days with special abhishekams and archanas.' },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-[#E6DCCA] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-[#E65100]" />
                  <h3 className="font-medium text-[#2D1B0E] text-sm">{f.name}</h3>
                </div>
                <p className="font-telugu-body text-sm text-[#621B00] mb-1">{f.nameTe}</p>
                <p className="text-xs text-[#8D6E63]">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Reach */}
        <section className="bg-white border border-[#E6DCCA] rounded-xl p-6">
          <h2 className="font-english-heading text-xl text-[#621B00] mb-1">How to Reach</h2>
          <p className="font-telugu-heading text-base text-[#8D6E63] mb-4">ఎలా చేరుకోవాలి</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-[#5D4037]">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2D1B0E]">Location</p>
                  <p>Cheruvugattu, Nalgonda District, Telangana, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2D1B0E]">Temple Timings</p>
                  <p>Morning: 6:00 AM - 12:00 PM</p>
                  <p>Evening: 4:00 PM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#2D1B0E]">Administration</p>
                  <p>Telangana Endowments Department</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-[#5D4037] space-y-2">
              <p><strong>By Road:</strong> Well-connected to Nalgonda (approx. 20 km) and Hyderabad (approx. 150 km) via national highways.</p>
              <p><strong>By Rail:</strong> Nearest railway station is Nalgonda. Auto-rickshaws and buses available from the station.</p>
              <p><strong>By Air:</strong> Nearest airport is Rajiv Gandhi International Airport, Hyderabad (approx. 150 km).</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
