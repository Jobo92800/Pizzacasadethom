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
