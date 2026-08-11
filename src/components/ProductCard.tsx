import { useState } from 'react';
import { Phone } from 'lucide-react';
import PizzaModal from './PizzaModal';

interface ProductCardProps {
  name: string;
  ingredients: string;
  image: string;
  category?: string;
}

export default function ProductCard({ name, ingredients, image, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ingredientsList = ingredients.split(',').map(ing => ing.trim());

  return (
    <>
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8D5BC] rounded-2xl p-6 border-2 border-[#8B4513] hover:border-[#D2691E] transition-all duration-500 hover:shadow-2xl hover:shadow-[#8B4513]/30 hover:-translate-y-2">

          <div className="relative mb-6 overflow-hidden rounded-xl border-2 border-[#1F110C]">
            <div className={`absolute inset-0 bg-gradient-to-br from-[#8B4513]/20 to-transparent z-10 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}></div>
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover rounded-xl transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
            />
            {category && (
              <div className="absolute top-3 left-3 bg-[#8B4513] text-[#E8D5BC] px-3 py-1 rounded-full text-xs font-semibold z-20 border border-[#D2691E]">
                {category}
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="bg-[#1F110C]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D2691E]">
                <span className="text-[#E8D5BC] text-sm font-medium">Voir détails</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#1F110C] font-['Cinzel'] text-xl font-semibold group-hover:text-[#8B4513] transition-colors duration-300">
              {name}
            </h3>

            <div className="flex flex-wrap gap-2">
              {ingredientsList.map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-[#1F110C]/10 text-[#5D4037] px-3 py-1 rounded-full text-xs font-medium border border-[#8B4513]/30 group-hover:border-[#8B4513]/50 transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 bg-[#D2691E] rounded-full"></span>
                  {ingredient}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-[#8B4513]/30">
              <a
                href="tel:+33670188137"
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-[#E8D5BC] px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#8B4513]/30 hover:scale-105 border border-[#D2691E]"
              >
                <Phone size={15} />
                Commander
              </a>
            </div>
          </div>
        </div>
      </div>

      <PizzaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        ingredients={ingredients}
        image={image}
        category={category}
      />
    </>
  );
}
