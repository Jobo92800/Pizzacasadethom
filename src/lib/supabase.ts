import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface MenuItemOption {
  id: string;
  menu_item_id: string;
  name: string;
  price: number;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  ingredients: string;
  image: string;
  sort_order: number;
  options?: MenuItemOption[];
}

// Noms d'options qui représentent un format/taille (= un prix), et non un supplément.
export const FORMAT_LABELS = ['Ø33 cm', 'Ø40 cm', 'Plaque', 'Simple', 'Double', 'Prix'];

// Formate un prix en euros à la française : 12.5 -> "12,50 €"
export function formatEuro(price: number): string {
  return `${price.toFixed(2).replace('.', ',')} €`;
}

// Sépare les options en "formats" (tailles avec prix) et "suppléments".
export function splitOptions(options: MenuItemOption[] = []) {
  const formats = options.filter((o) => FORMAT_LABELS.includes(o.name));
  const supplements = options.filter((o) => !FORMAT_LABELS.includes(o.name));
  return { formats, supplements };
}
