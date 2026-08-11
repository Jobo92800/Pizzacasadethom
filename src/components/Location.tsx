import { MapPin, Phone } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Location() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-[#1F110C] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F110C] via-[#2D1F12] to-[#1F110C]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-['Cinzel'] text-4xl sm:text-5xl font-bold text-[#E8D5BC] mb-4">
            Nous Trouver
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D2691E] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#E8D5BC]">
            <iframe
              src="https://www.google.com/maps?q=D986+parking+carrefour+market+34250+Palavas-les-Flots&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="La Case de Thom - Palavas-les-Flots"
            ></iframe>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#5D4037] to-[#1F110C] rounded-2xl p-8 border-2 border-[#8B4513]">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#E8D5BC]">
                      <MapPin className="w-5 h-5 text-[#E8D5BC]" />
                    </div>
                    <h3 className="font-bold text-lg text-[#E8D5BC]">Adresse</h3>
                  </div>
                  <p className="text-[#E8D5BC]/90 ml-13">D986 parking Carrefour Market</p>
                  <p className="text-[#E8D5BC]/70 text-sm ml-13">34250 Palavas-les-Flots</p>
                </div>

                <div className="border-t-2 border-[#8B4513] pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#E8D5BC]">
                      <Phone className="w-5 h-5 text-[#E8D5BC]" />
                    </div>
                    <h3 className="font-bold text-lg text-[#E8D5BC]">Téléphone</h3>
                  </div>
                  <a
                    href="tel:+33670188137"
                    className="text-[#D2691E] font-bold text-2xl ml-13 hover:text-[#FF8C42] transition-colors"
                  >
                    06 70 18 81 37
                  </a>
                </div>
              </div>
            </div>

            <a
              href="tel:+33670188137"
              className="block w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-[#E8D5BC] text-center px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#8B4513]/40 transition-all duration-300 hover:scale-105 border-2 border-[#D2691E]"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
