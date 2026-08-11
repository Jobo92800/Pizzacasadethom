import { Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1F110C]">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://video.wixstatic.com/video/87a2c5_81a4ed7b568947428bdc6db55d40bc51/1080p/mp4/file.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F110C]/40 via-[#1F110C]/20 to-[#1F110C]/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="relative animate-fade-in">
            <img
              src="/Design_sans_titre_(10).png"
              alt="La Case de Thom - Pizzeria Burger Palavas-les-Flots"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+33670188137"
              className="group bg-gradient-to-r from-[#9C5B21] to-[#AA632D] text-[#F7E8C7] px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#9C5B21]/40 transition-all duration-300 hover:scale-105 border-2 border-[#D5A14C]"
            >
              <Phone className="w-5 h-5" />
              Appelez maintenant
            </a>
            <a
              href="#menu"
              className="bg-transparent border-2 border-[#F7E8C7] text-[#F7E8C7] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#F7E8C7] hover:text-[#1F110C] transition-all duration-300 text-center"
            >
              Voir la carte
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1F110C] border-2 border-[#D5A14C] rounded-lg flex items-center justify-center">
                <span className="text-[#D5A14C] font-bold">✓</span>
              </div>
              <span className="text-[#F7E8C7] text-sm font-medium drop-shadow-md">Pains faits main</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1F110C] border-2 border-[#D5A14C] rounded-lg flex items-center justify-center">
                <span className="text-[#D5A14C] font-bold">✓</span>
              </div>
              <span className="text-[#F7E8C7] text-sm font-medium drop-shadow-md">Produits frais</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-[#F7E8C7]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
