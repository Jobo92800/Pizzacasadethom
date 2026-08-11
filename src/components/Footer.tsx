import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1F110C] border-t-4 border-[#9C5B21] text-[#F7E8C7] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9C5B21] to-[#AA632D] rounded-full flex items-center justify-center border-2 border-[#D5A14C]">
                <span className="text-[#F7E8C7] font-['Cinzel'] font-bold text-xl">LC</span>
              </div>
              <h3 className="font-['Cinzel'] text-2xl font-bold">
                La Case de Thom
              </h3>
            </div>
            <p className="text-[#F7E8C7]/80 leading-relaxed">
              Pizzeria artisanale à Palavas-les-Flots. Pains à pizza et pains à burger pétris et façonnés à la main chaque jour sur place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#D5A14C]">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+33670188137"
                className="flex items-center gap-3 text-[#F7E8C7]/90 hover:text-[#D5A14C] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>06 70 18 81 37</span>
              </a>
              <div className="flex items-center gap-3 text-[#F7E8C7]/90">
                <MapPin className="w-5 h-5" />
                <span>Palavas-les-Flots</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#D5A14C]">Horaires</h4>
            <div className="space-y-2 text-[#F7E8C7]/90">
              <p className="font-semibold text-[#F7E8C7]">Ouvert à l'année</p>
              <p>Midi : 11h - 14h</p>
              <p>Soir : 18h - 22h30</p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-[#9C5B21] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F7E8C7]/60 text-sm">
              © {new Date().getFullYear()} La Case de Thom. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-[#F7E8C7]/60">
              <a href="#menu" className="hover:text-[#D5A14C] transition-colors">Menu</a>
              <a href="#" className="hover:text-[#D5A14C] transition-colors">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
