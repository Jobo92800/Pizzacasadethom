import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, type Category, type MenuItem, type MenuItemOption } from '../lib/supabase';

export default function PizzaMenu() {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [itemsByCategory, setItemsByCategory] = useState<Record<string, MenuItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    (async () => {
      const { data: cats, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');

      if (catError || !cats || cats.length === 0) {
        setError(true);
        setLoading(false);
        return;
      }

      const { data: items, error: itemError } = await supabase
        .from('menu_items')
        .select('*')
        .order('sort_order');

      if (itemError || !items) {
        setError(true);
        setLoading(false);
        return;
      }

      const { data: options, error: optionsError } = await supabase
        .from('menu_item_options')
        .select('*')
        .order('sort_order');

      if (optionsError || !options) {
        setError(true);
        setLoading(false);
        return;
      }

      const optionsByItem: Record<string, MenuItemOption[]> = {};
      for (const option of options as MenuItemOption[]) {
        if (!optionsByItem[option.menu_item_id]) optionsByItem[option.menu_item_id] = [];
        optionsByItem[option.menu_item_id].push(option);
      }

      const itemsWithOptions = (items as MenuItem[]).map((item) => ({
        ...item,
        options: optionsByItem[item.id] ?? [],
      }));

      const grouped: Record<string, MenuItem[]> = {};
      for (const item of itemsWithOptions) {
        if (!grouped[item.category_id]) grouped[item.category_id] = [];
        grouped[item.category_id].push(item);
      }

      setCategories(cats);
      setItemsByCategory(grouped);
      const firstVisible = cats.find((c) => c.slug !== 'plaques');
      setActiveCategory(firstVisible ? firstVisible.slug : cats[0].slug);
      setLoading(false);
    })();
  }, []);

  const visibleCategories = categories.filter((category) => category.slug !== 'plaques');
  const activeCat = visibleCategories.find(c => c.slug === activeCategory) ?? visibleCategories[0];
  const activeItems = activeCat ? itemsByCategory[activeCat.id] ?? [] : [];

  return (
    <section id="menu" className="py-20 bg-[#F7E8C7] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7E8C7] via-[#C6B28E] to-[#F7E8C7]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-['Cinzel'] text-4xl sm:text-5xl font-bold text-[#1F110C] mb-4">
            Nos Pizzas
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#9C5B21] to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-[#9C5B21] font-semibold">Pains à pizza pétris et façonnés à la main sur place</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#9C5B21] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-[#9C5B21] text-lg font-semibold">Impossible de charger le menu pour le moment.</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.slug
                      ? 'bg-gradient-to-r from-[#9C5B21] to-[#AA632D] text-[#F7E8C7] shadow-lg shadow-[#9C5B21]/30 border-2 border-[#D5A14C]'
                      : 'bg-[#1F110C] text-[#F7E8C7] border-2 border-[#9C5B21] hover:border-[#D5A14C]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-scale-in h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    name={item.name}
                    ingredients={item.ingredients}
                    image={item.image}
                    category={activeCat?.name}
                    options={item.options}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
