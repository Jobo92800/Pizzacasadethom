import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, type MenuItem } from '../lib/supabase';

export default function BurgersMenu() {
  const [burgers, setBurgers] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    (async () => {
      const { data: cat, error: catError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', 'burgers')
        .maybeSingle();

      if (catError || !cat) {
        setError(true);
        setLoading(false);
        return;
      }

      const { data: items, error: itemError } = await supabase
        .from('menu_items')
        .select('*')
        .eq('category_id', cat.id)
        .order('sort_order');

      if (itemError || !items) {
        setError(true);
        setLoading(false);
        return;
      }

      setBurgers(items);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="py-20 bg-[#1F110C] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F110C] via-[#2D1F12] to-[#1F110C]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-['Cinzel'] text-4xl sm:text-5xl font-bold text-[#E8D5BC] mb-4">
            Nos Burgers
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D2691E] to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-[#D2691E] font-semibold">Pains à burger pétris et façonnés à la main sur place</p>
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl border-2 border-[#D2691E]/50 shadow-2xl">
            <img
              src="/burgeur.png"
              alt="Burger maison de La Case de Thom"
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#D2691E] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-[#D2691E] text-lg font-semibold">Impossible de charger les burgers pour le moment.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {burgers.map((burger, index) => (
              <div
                key={burger.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  name={burger.name}
                  ingredients={burger.ingredients}
                  image={burger.image}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
