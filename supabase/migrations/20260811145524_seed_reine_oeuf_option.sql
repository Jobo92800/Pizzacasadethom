/*
# Seed the Reine pizza supplement option

1. Data Change
- Adds the public menu option `Œuf` to the pizza named `La Reine`.
- Uses the existing `menu_item_options` table and does not alter or delete menu data.

2. Important Notes
1. The live menu uses the display name `La Reine`, not `Reine`.
2. The insert is guarded so reapplying it will not create duplicate options for the same pizza.
3. The option remains public and readable by the existing no-auth menu frontend.
*/

INSERT INTO menu_item_options (menu_item_id, name, price, sort_order)
SELECT mi.id, 'Œuf', 0, 0
FROM menu_items mi
WHERE mi.name = 'La Reine'
  AND NOT EXISTS (
    SELECT 1
    FROM menu_item_options existing
    WHERE existing.menu_item_id = mi.id
      AND existing.name = 'Œuf'
  );
