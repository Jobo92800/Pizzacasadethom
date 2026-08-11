import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { MenuItemOption } from '../lib/supabase';

interface PizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  ingredients: string;
  image: string;
  category?: string;
  options?: MenuItemOption[];
}

export default function PizzaModal({ isOpen, onClose, name, ingredients, image, category, options = [] }: PizzaModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ingredientsList = ingredients.split(',').map(ing => ing.trim());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div
        className="relative bg-gradient-to-br from-[#F5E6D3] to-[#E8D5BC] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-[#8B4513] shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-[#1F110C] text-[#E8D5BC] hover:bg-[#8B4513] transition-all duration-300 flex items-center justify-center border-2 border-[#D2691E] hover:scale-110 cursor-pointer"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F110C]/80 to-transparent z-[5]"></div>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          {category && (
            <div className="absolute top-6 left-6 bg-[#8B4513] text-[#E8D5BC] px-4 py-2 rounded-full text-sm font-semibold z-20 border-2 border-[#D2691E]">
              {category}
            </div>
          )}
          <div className="absolute bottom-6 left-6 z-20">
            <h2 className="font-['Cinzel'] text-4xl font-bold text-[#E8D5BC] drop-shadow-lg">
              {name}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h3 className="font-['Cinzel'] text-2xl font-semibold text-[#1F110C] mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-[#E8D5BC] text-sm">✓</span>
              Ingrédients
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {ingredientsList.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-[#1F110C]/10 rounded-lg px-4 py-3 border-2 border-[#8B4513]/30 hover:border-[#8B4513] transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#D2691E] rounded-full"></span>
                    <span className="text-[#1F110C] font-medium capitalize">{ingredient}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {options.length > 0 && (
            <div className="mb-6 border-t-2 border-[#8B4513]/30 pt-6">
              <h3 className="font-['Cinzel'] text-2xl font-semibold text-[#1F110C] mb-4">Options disponibles</h3>
              <div className="flex flex-wrap gap-3">
                {options.map((option) => (
                  <span key={option.id} className="rounded-full border-2 border-[#D5A14C] bg-[#D5A14C]/10 px-4 py-2 font-semibold text-[#641208]">
                    {option.name}{option.price > 0 ? ` +${option.price.toFixed(2).replace('.', ',')} €` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t-2 border-[#8B4513]/30 pt-6">
            <p className="text-[#5D4037] text-center mb-6 font-semibold">
              Pains à pizza pétris et façonnés à la main sur place
            </p>
            <a
              href="tel:+33670188137"
              className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-[#E8D5BC] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#8B4513]/40 hover:scale-105 border-2 border-[#D2691E] flex items-center justify-center gap-2"
            >
              <span>Commander maintenant</span>
              <span className="text-sm">06 70 18 81 37</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
