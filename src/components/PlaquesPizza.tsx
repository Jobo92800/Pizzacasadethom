import { ArrowRight, Phone, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function PlaquesPizza() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="plaques-pizza" className="relative overflow-hidden bg-[#F5E6D3] py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3] via-[#E8D5BC] to-[#D8B995] opacity-80" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mb-14 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#A0522D]">À partager</p>
          <h2 className="mb-4 font-['Cinzel'] text-4xl font-bold text-[#1F110C] sm:text-5xl">
            Plaques Pizza
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-transparent via-[#D2691E] to-transparent" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#5D4037]">
            Une jolie plaque généreuse, dorée et garnie avec soin, à poser au centre de la table pour régaler 4 à 5 personnes.
          </p>
        </div>

        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border-2 border-[#8B4513]/30 bg-[#1F110C] shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[380px] lg:min-h-[460px]">
            <img
              src="/phot_plaque_1_.PNG"
              alt="Grande plaque pizza à partager"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1F110C]/70 lg:bg-gradient-to-r" />
          </div>
          <div className="px-7 py-10 text-[#F5E6D3] sm:px-12 lg:pl-4 lg:pr-14">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D2691E] bg-[#8B4513] text-[#F5E6D3]">
              <Users size={28} />
            </div>
            <h3 className="mb-4 font-['Cinzel'] text-3xl font-semibold sm:text-4xl">Le plaisir de partager</h3>
            <p className="mb-7 text-base leading-relaxed text-[#E8D5BC] sm:text-lg">
              Retrouvez toutes les recettes de la carte en grand format apéro. Une pâte moelleuse, une garniture généreuse et des parts faciles à partager pour vos soirées entre amis ou en famille.
            </p>
            <a
              href="tel:+33670188137"
              className="inline-flex items-center gap-3 rounded-xl border border-[#D2691E] bg-gradient-to-r from-[#D2691E] to-[#A0522D] px-6 py-3 font-semibold text-[#FFF8EE] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D2691E]/30"
            >
              <Phone size={18} />
              Réserver une plaque
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
