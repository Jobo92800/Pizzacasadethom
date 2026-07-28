/*
# Create menu schema for pizza & burger restaurant

1. New Tables
- `categories`
  - `id` (uuid, primary key)
  - `name` (text, not null) — display name e.g. "Base Tomate", "Base Crème", "Les Roses", "Burgers"
  - `slug` (text, unique, not null) — URL-friendly key e.g. "tomate", "creme", "roses", "burgers"
  - `sort_order` (int, default 0) — controls display order
  - `created_at` (timestamptz, default now())
- `menu_items`
  - `id` (uuid, primary key)
  - `category_id` (uuid, FK → categories, on delete cascade)
  - `name` (text, not null) — e.g. "Marguerite", "Burger Classique"
  - `ingredients` (text, not null) — comma-separated ingredient list
  - `image` (text, not null) — image URL or path
  - `sort_order` (int, default 0) — controls display order within a category
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- This is a no-auth, single-tenant app (no sign-in screen). The frontend uses the anon key
  for its entire lifetime, so policies MUST allow `anon` in addition to `authenticated`.
- All menu data is intentionally public/shared → `USING (true)` is appropriate and documented here.
- 4 separate policies per table (select/insert/update/delete), scoped to `anon, authenticated`.

3. Seed Data
- Inserts the 4 categories (Base Tomate, Base Crème, Les Roses, Burgers).
- Inserts all pizzas (16 tomate + 11 crème + 3 roses) and all 8 burgers as menu_items.
- sort_order is set per row so the app can display items in the intended order.

4. Notes
1. The app reads menu data via the anon key; no sign-in is required.
2. Categories and items are linked by a foreign key with ON DELETE CASCADE,
   so deleting a category automatically removes its items.
3. sort_order allows reordering items without changing code.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  ingredients text NOT NULL,
  image text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_sort_order ON menu_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_menu_items" ON menu_items;
CREATE POLICY "anon_select_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_menu_items" ON menu_items;
CREATE POLICY "anon_insert_menu_items" ON menu_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_menu_items" ON menu_items;
CREATE POLICY "anon_update_menu_items" ON menu_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_menu_items" ON menu_items;
CREATE POLICY "anon_delete_menu_items" ON menu_items FOR DELETE
  TO anon, authenticated USING (true);

-- Seed categories
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Base Tomate', 'tomate', 0),
  ('Base Crème', 'creme', 1),
  ('Les Roses', 'roses', 2),
  ('Burgers', 'burgers', 3)
ON CONFLICT (slug) DO NOTHING;

-- Seed pizzas: Base Tomate
INSERT INTO menu_items (category_id, name, ingredients, image, sort_order)
SELECT c.id, v.name, v.ingredients, v.image, v.sort_order
FROM categories c
JOIN (VALUES
  ('Marguerite', 'tomate, fromage, olives, mozzarella', 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600', 0),
  ('Napolitaine', 'tomate, anchois, fromage, olives', 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', 1),
  ('Reine', 'tomate, jambon, mozzarella, fromage', 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=600', 2),
  ('Espagnole', 'tomate, chorizo, lardons, poivrons, fromage', 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600', 3),
  ('Orientale', 'tomate, merguez, poivrons, fromage', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600', 4),
  ('Pêcheur', 'tomate, fruits de mer, fromage, persillade', 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=600', 5),
  ('4 Fromages', 'tomate, chèvre, roquefort, mozzarella, emmental', 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600', 6),
  ('Cowboy', 'tomate, viande hachée, oignons, œuf, poivrons, fromage', 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=600', 7),
  ('Nénette', 'tomate, mozzarella, pesto, tomates confites, olives', 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600', 8),
  ('Royale', 'tomate, jambon, champignons, fromage', 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', 9),
  ('4 Saisons', 'tomate, artichauts, poivrons, champignons, fromage', 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=600', 10),
  ('L''Italienne', 'tomate, jambon cru, mozzarella, mâche, parmesan', 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600', 11),
  ('Cannibale', 'tomate, bœuf haché, oignons, merguez', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600', 12),
  ('L''Héraultaise', 'tomate, roquefort, chorizo, merguez', 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=600', 13),
  ('La Brazil', 'tomate, oignons, poulet, sauce barbecue', 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600', 14),
  ('Calzone gratinée', 'crème ou tomate + 3 ingrédients au choix', 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=600', 15)
) AS v(name, ingredients, image, sort_order) ON c.slug = 'tomate'
ON CONFLICT DO NOTHING;

-- Seed pizzas: Base Crème
INSERT INTO menu_items (category_id, name, ingredients, image, sort_order)
SELECT c.id, v.name, v.ingredients, v.image, v.sort_order
FROM categories c
JOIN (VALUES
  ('Cévenole', 'oignons, lardons, fromage', 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600', 0),
  ('Lune de miel', 'chèvre, miel', 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', 1),
  ('Norvégienne', 'saumon fumé, citron, basilic', 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=600', 2),
  ('Bianca', 'mozzarella, chèvre, camembert, roquefort', 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600', 3),
  ('Indienne', 'crème, curry, poulet', '/Indienne.PNG', 4),
  ('Savoyarde', 'oignons, lardons, reblochon, pommes de terre', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600', 5),
  ('Campagnarde', 'crème, mozzarella, chèvre, champignons', 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=600', 6),
  ('Forestière', 'crème, mozzarella, champignons', 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600', 7),
  ('Carnivore', 'crème, oignons, kebab, merguez', 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=600', 8),
  ('Kebab', 'poivrons, oignons, viande kebab', 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600', 9),
  ('La Spéciale', 'crème, morilles, chèvre, mâche, parmesan', 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', 10)
) AS v(name, ingredients, image, sort_order) ON c.slug = 'creme'
ON CONFLICT DO NOTHING;

-- Seed pizzas: Les Roses
INSERT INTO menu_items (category_id, name, ingredients, image, sort_order)
SELECT c.id, v.name, v.ingredients, v.image, v.sort_order
FROM categories c
JOIN (VALUES
  ('Soleil de miel', 'sauce tomate et crème fraîche, chèvre, miel, curry', 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600', 0),
  ('La Brooklyn', 'tomate et crème fraîche, cheddar, oignons, mozzarella', 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', 1),
  ('La Burger', 'sauce tomate et crème fraîche, oignons, cheddar, graines de sésame', 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=600', 2)
) AS v(name, ingredients, image, sort_order) ON c.slug = 'roses'
ON CONFLICT DO NOTHING;

-- Seed burgers
INSERT INTO menu_items (category_id, name, ingredients, image, sort_order)
SELECT c.id, v.name, v.ingredients, v.image, v.sort_order
FROM categories c
JOIN (VALUES
  ('Burger Classique', 'Pain maison, steak haché, salade, tomate, oignons, cheddar, sauce burger', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600', 0),
  ('Burger Jojo', 'Pain maison, steak, chèvre, miel, salade, tomate, oignons', 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600', 1),
  ('Burger Case Vegas', 'Pain maison, double steak, bacon, cheddar, salade, sauce barbecue', 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600', 2),
  ('Burger Le Veggie', 'Pain maison, galette végétale, salade, tomate, avocat, oignons rouges', 'https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&w=600', 3),
  ('Burger Le Kebab', 'Pain maison, viande kebab, salade, tomate, oignons, sauce blanche', 'https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600', 4),
  ('Burger Rustique', 'Pain maison, steak, lardons, champignons, fromage, salade', 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg?auto=compress&cs=tinysrgb&w=600', 5),
  ('Burger Alpin', 'Pain maison, steak, reblochon, lardons, oignons caramélisés', 'https://images.pexels.com/photos/552056/pexels-photo-552056.jpeg?auto=compress&cs=tinysrgb&w=600', 6),
  ('Burger Prestige', 'Pain maison, steak premium, foie gras, confit d''oignons, roquette', 'https://images.pexels.com/photos/1631611/pexels-photo-1631611.jpeg?auto=compress&cs=tinysrgb&w=600', 7)
) AS v(name, ingredients, image, sort_order) ON c.slug = 'burgers'
ON CONFLICT DO NOTHING;
