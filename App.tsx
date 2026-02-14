import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Users, 
  Star, 
  ChevronRight, 
  Menu, 
  X,
  Zap,
  Shield,
  MessageCircle,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { getFitnessAdvice } from './services/geminiService';

// --- Sub-components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Services', href: '#services' },
    { name: 'Plans', href: '#plans' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-lime-400 w-8 h-8" />
          <span className="text-2xl font-black tracking-tighter">SUREFIT</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-semibold hover:text-lime-400 transition-colors">
              {link.name}
            </a>
          ))}
          <a href="tel:08023609696" className="bg-lime-400 text-black px-6 py-2 rounded-full font-bold hover:bg-lime-500 transition-colors flex items-center gap-2">
            JOIN NOW
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black absolute top-full left-0 w-full p-6 flex flex-col gap-4 animate-fade-in border-b border-lime-400/20">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">
              {link.name}
            </a>
          ))}
          <a href="tel:08023609696" className="bg-lime-400 text-black text-center py-3 rounded-lg font-bold">
            CALL US NOW
          </a>
        </div>
      )}
    </nav>
  );
};

const ServiceCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; img: string }> = ({ title, desc, icon, img }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all">
    <div className="aspect-[4/5] overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-80" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
      <div className="p-3 bg-lime-400 text-black rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </div>
  </div>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Welcome to Surefit! I'm your AI trainer. Need a workout plan or nutrition tip?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getFitnessAdvice(userMsg);
    setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-zinc-900 border border-zinc-800 w-[320px] sm:w-[380px] h-[500px] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-slide-up">
          <div className="bg-lime-400 p-4 text-black flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 fill-current" />
              <span className="font-bold">SUREFIT AI ASSISTANT</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${chat.role === 'user' ? 'bg-lime-400 text-black font-semibold' : 'bg-zinc-800 text-zinc-100'}`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-zinc-400 p-3 rounded-xl text-xs animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a 3-day split..."
              className="flex-1 bg-zinc-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-lime-400 outline-none"
            />
            <button onClick={handleSend} className="bg-lime-400 text-black p-2 rounded-lg"><ArrowUpRight /></button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-lime-400 text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce-slow"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

// --- Sections ---

const Hero: React.FC = () => (
  <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    {/* Video/Image Background Placeholder */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070" 
        className="w-full h-full object-cover opacity-40" 
        alt="Gym Background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
    </div>

    <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
      <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/20 px-4 py-1 rounded-full text-lime-400 text-xs font-bold mb-6 tracking-widest uppercase">
        <TrendingUp className="w-3 h-3" /> The Best Gym in Ikeja
      </div>
      <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter max-w-4xl">
        TRANSFORM YOUR <span className="text-lime-400">BODY</span>. ELEVATE YOUR <span className="text-zinc-500">LIFESTYLE</span>.
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl font-medium">
        A fully equipped fitness and lifestyle centre in the heart of Ikeja. Join the elite community pushing limits every day.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <button className="bg-lime-400 text-black px-10 py-5 rounded-xl font-black text-lg hover:bg-lime-500 transition-all flex items-center justify-center gap-2 group">
          JOIN NOW <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <a href="tel:08023609696" className="border-2 border-zinc-700 bg-white/5 backdrop-blur-sm px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center">
          CALL 0802 360 9696
        </a>
      </div>

      <div className="mt-16 flex flex-wrap gap-8 items-center justify-center md:justify-start text-zinc-500">
        <div className="flex items-center gap-2">
          <Star className="text-lime-400 w-5 h-5 fill-lime-400" />
          <span className="font-bold text-white text-lg">4.2/5</span>
          <span className="text-sm">85+ Reviews</span>
        </div>
        <div className="w-px h-8 bg-zinc-800 hidden md:block"></div>
        <div className="flex items-center gap-2">
          <Award className="text-lime-400 w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Premium Equipment</span>
        </div>
      </div>
    </div>
  </section>
);

const Features: React.FC = () => {
  const features = [
    { icon: <Dumbbell />, title: 'Full Access', desc: 'Unlimited usage of all modern training gear and equipment.' },
    { icon: <Users />, title: 'Pro Instructors', desc: 'Expert guidance for weight loss, muscle gain, and general fitness.' },
    { icon: <Clock />, title: 'Flexible Hours', desc: 'Open Mon–Sat (7am–9pm) to fit your busy Nigerian lifestyle.' },
    { icon: <Shield />, title: 'Safe Parking', desc: 'Spacious and secure free parking area for all our members.' },
  ];

  return (
    <section id="features" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">WHY CHOOSE <span className="text-lime-400">SUREFIT</span>?</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">We don't just provide a space; we provide the results and the culture you need to succeed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800/50 transition-colors group">
              <div className="w-14 h-14 bg-lime-400/10 text-lime-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-lime-400 group-hover:text-black transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => (
  <section id="services" className="py-24 bg-black relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-none">OUR WORLD-CLASS <br /><span className="text-lime-400">FACILITIES</span></h2>
          <p className="text-zinc-500">From professional-grade iron to high-intensity corporate programs, we have everything you need to sculpt the best version of yourself.</p>
        </div>
        <button className="text-lime-400 font-bold flex items-center gap-2 hover:underline">VIEW ALL SERVICES <ArrowUpRight /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard 
          title="Strength Training" 
          desc="Heavy-duty racks, benches, and machines for serious muscle building."
          icon={<Dumbbell />}
          img="https://plus.unsplash.com/premium_photo-1664304106292-ef7e34f74dc0?q=80&w=870&auto=format&fit=crop&q=80&w=800"
        />
        <ServiceCard 
          title="Cardio Blast" 
          desc="Modern treadmills and elliptical gear for endurance and weight loss."
          icon={<Zap />}
          img="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800"
        />
        <ServiceCard 
          title="Personal Coaching" 
          desc="Get 1-on-1 attention from certified Nigerian fitness experts."
          icon={<Users />}
          img="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
        />
      </div>
    </div>
  </section>
);

const Pricing: React.FC = () => {
  const plans = [
    { name: 'Monthly Basic', price: '₦', features: ['Full Gym Access', 'Gym Instructor', 'Standard Hours', 'Free Parking'] },
    { name: 'VIP Yearly', price: '₦', features: ['Unlimited Access', 'Priority Coaching', 'Nutrition Guide', 'Guest Passes'], isPopular: true },
    { name: 'Corporate', price: 'Call', features: ['Group Sessions', 'Employee Tracking', 'Custom Workouts', 'Dedicated Trainer'] },
  ];

  return (
    <section id="plans" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">FLEXIBLE <span className="text-lime-400">PLANS</span></h2>
          <p className="text-zinc-500">No hidden fees. Pure performance. Call us for current seasonal discounts!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`relative p-10 rounded-3xl border ${p.isPopular ? 'border-lime-400 bg-zinc-900' : 'border-zinc-800 bg-black'} transition-transform hover:-translate-y-2`}>
              {p.isPopular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-400 text-black text-xs font-black px-4 py-1 rounded-full">BEST VALUE</span>}
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black">{p.price}</span>
                <span className="text-zinc-500">/period</span>
              </div>
              <ul className="space-y-4 mb-10">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle className="text-lime-400 w-5 h-5 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${p.isPopular ? 'bg-lime-400 text-black hover:bg-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => (
  <section id="contact" className="py-24 bg-black border-t border-zinc-900">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-black mb-8">FIND <span className="text-lime-400">US</span></h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="p-4 bg-zinc-900 rounded-2xl text-lime-400 h-fit"><MapPin /></div>
              <div>
                <h4 className="font-bold text-xl mb-2">Location</h4>
                <p className="text-zinc-500 leading-relaxed">By First Bank Bus Stop, 2 Adewunmi Estate, Kudirat Abiola Way, Opposite The Citadel Church, Oregun, Ikeja, Lagos.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="p-4 bg-zinc-900 rounded-2xl text-lime-400 h-fit"><Phone /></div>
              <div>
                <h4 className="font-bold text-xl mb-2">Contact</h4>
                <p className="text-zinc-500">Phone: 0802 360 9696</p>
                <p className="text-zinc-500">WhatsApp: Available 24/7</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="p-4 bg-zinc-900 rounded-2xl text-lime-400 h-fit"><Clock /></div>
              <div>
                <h4 className="font-bold text-xl mb-2">Working Hours</h4>
                <p className="text-zinc-500">Mon – Sat: 7:00 AM – 9:00 PM</p>
                <p className="text-zinc-500">Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[400px] md:h-full min-h-[400px] rounded-3xl overflow-hidden grayscale contrast-125 border border-zinc-800">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.268711684364!2d3.3644026117381285!3d6.613481221980868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b930d4b1a1c97%3A0x868b8e0c3b0f5b90!2sKudirat%20Abiola%20Way%2C%20Oregun%2C%20Ikeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1714578120349!5m2!1sen!2sng" 
            className="w-full h-full border-none"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Brand Carousel or Trust Section */}
      <div className="bg-lime-400 py-6 overflow-hidden">
        <div className="whitespace-nowrap flex animate-scroll gap-12 font-black text-black text-2xl uppercase tracking-tighter">
          {[1,2,3,4,5,6].map(i => (
            <React.Fragment key={i}>
              <span>Surefit Gym</span>
              <span>•</span>
              <span>Ikeja's Best</span>
              <span>•</span>
              <span>Transform Your Body</span>
              <span>•</span>
              <span>No Pain No Gain</span>
              <span>•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Features />
      
      {/* About Section */}
      <section id="about" className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl z-10 relative" alt="About Surefit" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-lime-400 rounded-3xl -z-0"></div>
          </div>
          <div>
            <h2 className="text-4xl font-black mb-6">YOUR FITNESS JOURNEY STARTS <span className="text-lime-400">HERE</span></h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Surefit Gym and Fitness Centre is a standalone fitness and lifestyle hub dedicated to helping you achieve real results. 
              With modern equipment, certified instructors, and a welcoming environment, we support men and women of all ages on their fitness journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-lime-400" />
                <span className="font-bold">Over 10 Years of Excellence in Ikeja</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-lime-400" />
                <span className="font-bold">Gender Inclusive Training Environment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-lime-400" />
                <span className="font-bold">Corporate Wellness Packages Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Pricing />
      
      {/* Testimonials */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">WHAT OUR <span className="text-lime-400">MEMBERS</span> SAY</h2>
            <div className="flex justify-center items-center gap-1 text-yellow-500 mb-2">
              <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" />
            </div>
            <p className="text-zinc-500">4.2/5 Average Google Rating</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Chidi O.", comment: "Warm staff, great equipment, and a motivating environment. Highly recommended for anyone in Oregun." },
              { name: "Bolu T.", comment: "Spacious, clean, and worth every naira. The trainers actually know what they are doing." },
              { name: "Funmi A.", comment: "Best gym experience in Lagos. Safe parking is a huge plus for me!" }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl italic text-zinc-300">
                "{t.comment}"
                <p className="mt-6 not-italic font-black text-white">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-lime-400">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-8">READY TO GET FIT?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-black text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform">JOIN SUREFIT TODAY</button>
            <a href="tel:08023609696" className="border-4 border-black text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-black hover:text-white transition-all">CALL US NOW</a>
          </div>
        </div>
      </section>

      <Contact />

      <footer className="py-12 bg-zinc-950 border-t border-zinc-900 text-zinc-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-lime-400 w-6 h-6" />
            <span className="text-xl font-black text-white tracking-tighter">SUREFIT</span>
          </div>
          <p>© {new Date().getFullYear()} Surefit Gym And Fitness Centre. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <ChatBot />

      {/* Sticky Call Button for Mobile */}
      <div className="md:hidden fixed bottom-6 left-6 z-50">
        <a href="tel:08023609696" className="bg-white text-black p-4 rounded-full shadow-lg flex items-center justify-center">
          <Phone />
        </a>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
