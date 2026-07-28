import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3D2817] border-t-4 border-[#8B4513] text-[#E8D5BC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center border-2 border-[#D2691E]">
                <span className="text-[#E8D5BC] font-['Cinzel'] font-bold text-xl">LC</span>
              </div>
              <h3 className="font-['Cinzel'] text-2xl font-bold">
                La Case de TOM
              </h3>
            </div>
            <p className="text-[#E8D5BC]/80 leading-relaxed">
              Pizzeria artisanale à Palavas-les-Flots. Pains à pizza et pains à burger pétris et façonnés à la main chaque jour sur place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#D2691E]">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+33670188137"
                className="flex items-center gap-3 text-[#E8D5BC]/90 hover:text-[#D2691E] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>06 70 18 81 37</span>
              </a>
              <a
                href="mailto:info@lacasethom.fr"
                className="flex items-center gap-3 text-[#E8D5BC]/90 hover:text-[#D2691E] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@lacasethom.fr</span>
              </a>
              <div className="flex items-center gap-3 text-[#E8D5BC]/90">
                <MapPin className="w-5 h-5" />
                <span>Palavas-les-Flots</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#D2691E]">Horaires</h4>
            <div className="space-y-2 text-[#E8D5BC]/90">
              <p className="font-semibold text-[#E8D5BC]">Ouvert à l'année</p>
              <p>Midi : 11h - 14h</p>
              <p>Soir : 18h - 22h30</p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-[#8B4513] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#E8D5BC]/60 text-sm">
              © {new Date().getFullYear()} La Case de TOM. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-[#E8D5BC]/60">
              <a href="#menu" className="hover:text-[#D2691E] transition-colors">Menu</a>
              <a href="#" className="hover:text-[#D2691E] transition-colors">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
