import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

export default function FloatingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="tel:+33670188137"
      aria-label="Commander par téléphone"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-[#E8D5BC] pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-[#8B4513]/40 hover:shadow-[#8B4513]/60 transition-all duration-500 border-2 border-[#D2691E] ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2691E] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D2691E]"></span>
      </span>
      <Phone className="w-5 h-5" />
      <span className="font-semibold whitespace-nowrap">06 70 18 81 37</span>
    </a>
  );
}
