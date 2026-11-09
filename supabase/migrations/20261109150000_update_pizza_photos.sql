/*
  # Photos réelles des pizzas et burgers

  Remplace les visuels (générés / stock Pexels) par les photos prises
  à la pizzeria, converties en WebP (max 1400 px, qualité 82) et servies
  depuis `public/pizzas/`.

  28 produits concernés. Chaque nom existe 2 fois en base
  (sa catégorie de base + la catégorie « plaques »), les deux sont mis à jour.
*/

UPDATE menu_items AS m
SET image = v.image
FROM (VALUES
  ('4 Fromages', '/pizzas/4-fromages.webp'),
  ('Bianca', '/pizzas/bianca.webp'),
  ('Burger Alpin', '/pizzas/burger-alpin.webp'),
  ('Burger Case Vegas', '/pizzas/burger-case-vegas.webp'),
  ('Burger Prestige', '/pizzas/burger-prestige.webp'),
  ('Burger Rustique', '/pizzas/burger-rustique.webp'),
  ('Calzone gratinée', '/pizzas/calzone-gratinee.webp'),
  ('Campagnarde', '/pizzas/campagnarde.webp'),
  ('Cannibale', '/pizzas/cannibale.webp'),
  ('Carnivore', '/pizzas/carnivore.webp'),
  ('Cowboy', '/pizzas/cowboy.webp'),
  ('Cévenole', '/pizzas/cevenole.webp'),
  ('Forestière', '/pizzas/forestiere.webp'),
  ('Indienne', '/pizzas/indienne.webp'),
  ('Kebab', '/pizzas/kebab.webp'),
  ('L''Héraultaise', '/pizzas/heraultaise.webp'),
  ('La Burger', '/pizzas/la-burger.webp'),
  ('La Reine', '/pizzas/reine.webp'),
  ('La Spéciale', '/pizzas/speciale.webp'),
  ('Lune de miel', '/pizzas/lune-de-miel.webp'),
  ('Napolitaine', '/pizzas/napolitaine.webp'),
  ('Norvégienne', '/pizzas/norvegienne.webp'),
  ('Nénette', '/pizzas/nenette.webp'),
  ('Orientale', '/pizzas/orientale.webp'),
  ('Pêcheur', '/pizzas/pecheur.webp'),
  ('Royale', '/pizzas/royale.webp'),
  ('Savoyarde', '/pizzas/savoyarde.webp'),
  ('Soleil de miel', '/pizzas/soleil-de-miel.webp')
) AS v(name, image)
WHERE m.name = v.name;
