/*
# Add supplement options for menu items

1. New Tables
- `menu_item_options`
  - `id` (uuid, primary key)
  - `menu_item_id` (uuid, FK → menu_items, on delete cascade)
  - `name` (text, not null) — e.g. "Œuf"
  - `price` (numeric, default 0) — optional supplement price (kept for future use, displayed only if > 0)
  - `sort_order` (int, default 0)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `menu_item_options`.
- No-auth, single-tenant app: policies allow `anon, authenticated` CRUD (data is intentionally public).

3. Seed Data
- Adds one supplement option "Œuf" (price 0) to the "Reine" pizza.
  The Reine is matched by name to avoid hardcoding generated ids.

4. Notes
1. Options are linked to a menu item with ON DELETE CASCADE, so removing a pizza removes its options.
2. The frontend reads options via the anon key; no sign-in required.
3. price defaults to 0 and is only shown in the UI when greater than 0.
*/

CREATE TABLE IF NOT EXISTS menu_item_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_item_options_menu_item_id ON menu_item_options(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_menu_item_options_sort_order ON menu_item_options(sort_order);

ALTER TABLE menu_item_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_menu_item_options" ON menu_item_options;
CREATE POLICY "anon_select_menu_item_options" ON menu_item_options FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_menu_item_options" ON menu_item_options;
CREATE POLICY "anon_insert_menu_item_options" ON menu_item_options FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_menu_item_options" ON menu_item_options;
CREATE POLICY "anon_update_menu_item_options" ON menu_item_options FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_menu_item_options" ON menu_item_options;
CREATE POLICY "anon_delete_menu_item_options" ON menu_item_options FOR DELETE
  TO anon, authenticated USING (true);

-- Seed: "Œuf" supplement for the Reine pizza
INSERT INTO menu_item_options (menu_item_id, name, price, sort_order)
SELECT id, 'Œuf', 0, 0
FROM menu_items
WHERE name = 'Reine'
ON CONFLICT DO NOTHING;
