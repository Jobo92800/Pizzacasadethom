import { Truck, Clock, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function WhyUs() {
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    {
      icon: Truck,
      title: "Livraison rapide",
      description: "Commandez et récupérez rapidement"
    },
    {
      icon: Clock,
      title: "Ouvert 24/7",
      description: "À votre service à tout moment"
    },
    {
      icon: ShieldCheck,
      title: "Qualité garantie",
      description: "Produits frais et sélectionnés"
    }
  ];

  return (
    <section className="py-20 bg-[#3D2817] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D2817] via-[#2D1F12] to-[#3D2817]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-['Cinzel'] text-4xl sm:text-5xl font-bold text-[#E8D5BC] mb-4">
            Nos Pains Artisanaux
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D2691E] to-transparent mx-auto mb-6"></div>
          <p className="text-[#E8D5BC]/80 max-w-2xl mx-auto text-lg">
            Tous nos pains à pizza et pains à burger sont pétris et façonnés à la main chaque jour dans notre laboratoire. Un savoir-faire artisanal au service de votre gourmandise !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-[#5D4037] to-[#3D2817] rounded-2xl p-8 border-2 border-[#8B4513] hover:border-[#D2691E] transition-all duration-500 hover:shadow-2xl hover:shadow-[#D2691E]/20 hover:-translate-y-2 text-center"
            >
              <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 border-2 border-[#E8D5BC]">
                <feature.icon className="w-8 h-8 text-[#E8D5BC]" />
              </div>
              <h3 className="text-xl font-bold text-[#E8D5BC] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#E8D5BC]/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#menu"
            className="inline-block bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-[#E8D5BC] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#8B4513]/40 transition-all duration-300 hover:scale-105 border-2 border-[#D2691E]"
          >
            Découvrir notre carte
          </a>
        </div>
      </div>
    </section>
  );
}
