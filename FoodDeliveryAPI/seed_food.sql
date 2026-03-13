INSERT INTO "FoodItems" ("Id","Name","Description","Price","ImageUrl","Category","IsAvailable") VALUES
(1,'Margherita Pizza','Classic Italian pizza with fresh mozzarella, basil and tomato sauce.',14.99,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80','Pizza',true),
(2,'BBQ Chicken Pizza','Smoky BBQ sauce, grilled chicken, caramelised onions and cheddar.',17.99,'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80','Pizza',true),
(3,'Classic Smash Burger','Double smash patties, American cheese, pickles and secret sauce.',12.99,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80','Burgers',true),
(4,'Crispy Chicken Burger','Buttermilk fried chicken, coleslaw and chipotle mayo in a brioche bun.',11.99,'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80','Burgers',true),
(5,'Salmon Nigiri Set','Eight pieces of premium salmon nigiri with pickled ginger and wasabi.',18.99,'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80','Sushi',true),
(6,'Dragon Roll','Shrimp tempura inside, avocado and eel on top with eel sauce.',16.99,'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80','Sushi',true),
(7,'Chocolate Lava Cake','Warm dark chocolate fondant with a molten centre served with vanilla ice cream.',8.99,'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80','Desserts',true),
(8,'New York Cheesecake','Creamy baked cheesecake on a buttery graham cracker crust with berry coulis.',7.99,'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80','Desserts',true),
(9,'Caesar Salad','Crispy romaine, parmesan shavings, croutons and homemade Caesar dressing.',9.99,'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&q=80','Salads',true),
(10,'Grilled Chicken Salad','Herb-marinated grilled chicken over mixed greens, cherry tomatoes and balsamic.',11.99,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80','Salads',true)
ON CONFLICT ("Id") DO NOTHING;

-- Reset the sequence so future inserts start after 10
SELECT setval(pg_get_serial_sequence('"FoodItems"', 'Id'), 10);

SELECT "Id", "Name", "Price" FROM "FoodItems" ORDER BY "Id";
