import { Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#3D2817]">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://video.wixstatic.com/video/87a2c5_81a4ed7b568947428bdc6db55d40bc51/1080p/mp4/file.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D2817]/40 via-[#3D2817]/20 to-[#3D2817]/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="relative animate-fade-in">
            <img
              src="/ChatGPT_Image_28_juil._2026,_11_16_31.png"
              alt="La Case de Thom - Pizzeria Burger Palavas-les-Flots"
              className="w-full h-auto object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+33670188137"
              className="group bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-[#E8D5BC] px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#8B4513]/40 transition-all duration-300 hover:scale-105 border-2 border-[#D2691E]"
            >
              <Phone className="w-5 h-5" />
              Appelez maintenant
            </a>
            <a
              href="#menu"
              className="bg-transparent border-2 border-[#E8D5BC] text-[#E8D5BC] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E8D5BC] hover:text-[#3D2817] transition-all duration-300 text-center"
            >
              Voir la carte
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#3D2817] border-2 border-[#D2691E] rounded-lg flex items-center justify-center">
                <span className="text-[#D2691E] font-bold">✓</span>
              </div>
              <span className="text-[#E8D5BC] text-sm font-medium drop-shadow-md">Pains faits main</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#3D2817] border-2 border-[#D2691E] rounded-lg flex items-center justify-center">
                <span className="text-[#D2691E] font-bold">✓</span>
              </div>
              <span className="text-[#E8D5BC] text-sm font-medium drop-shadow-md">Produits frais</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-[#E8D5BC]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
