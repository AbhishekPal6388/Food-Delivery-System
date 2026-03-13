import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../services/food.service';
import { CartService } from '../../services/cart.service';
import { FoodItem } from '../../models/food-item';

const DEMO_ITEMS: FoodItem[] = [
  { id: 1, name: 'Margherita Pizza', description: 'Classic Italian pizza with fresh mozzarella, basil and tomato sauce.', price: 14.99, category: 'Pizza', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80' },
  { id: 2, name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce, grilled chicken, caramelised onions and cheddar.', price: 17.99, category: 'Pizza', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80' },
  { id: 3, name: 'Classic Smash Burger', description: 'Double smash patties, American cheese, pickles and secret sauce.', price: 12.99, category: 'Burgers', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
  { id: 4, name: 'Crispy Chicken Burger', description: 'Buttermilk fried chicken, coleslaw and chipotle mayo in a brioche bun.', price: 11.99, category: 'Burgers', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80' },
  { id: 5, name: 'Salmon Nigiri Set', description: 'Eight pieces of premium salmon nigiri with pickled ginger and wasabi.', price: 18.99, category: 'Sushi', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80' },
  { id: 6, name: 'Dragon Roll', description: 'Shrimp tempura inside, avocado and eel on top with eel sauce.', price: 16.99, category: 'Sushi', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80' },
  { id: 7, name: 'Chocolate Lava Cake', description: 'Warm dark chocolate fondant with a molten centre served with vanilla ice cream.', price: 8.99, category: 'Desserts', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80' },
  { id: 8, name: 'New York Cheesecake', description: 'Creamy baked cheesecake on a buttery graham cracker crust with berry coulis.', price: 7.99, category: 'Desserts', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80' },
  { id: 9, name: 'Caesar Salad', description: 'Crispy romaine, parmesan shavings, croutons and homemade Caesar dressing.', price: 9.99, category: 'Salads', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&q=80' },
  { id: 10, name: 'Grilled Chicken Salad', description: 'Herb-marinated grilled chicken over mixed greens, cherry tomatoes and balsamic.', price: 11.99, category: 'Salads', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
];

@Component({
  selector: 'app-food-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-menu.component.html',
  styleUrl: './food-menu.component.css'
})
export class FoodMenuComponent implements OnInit {
  foodItems: FoodItem[] = [];
  filteredItems: FoodItem[] = [];
  categories = ['All', 'Pizza', 'Burgers', 'Sushi', 'Desserts', 'Salads'];
  activeCategory = 'All';
  addedItemId: number | null = null;

  constructor(private foodService: FoodService, private cartService: CartService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.foodService.getFoodItems().subscribe({
      next: (items) => {
        this.foodItems = items.length ? items : DEMO_ITEMS;
        this.filteredItems = [...this.foodItems];
        this.cdr.detectChanges();
      },
      error: () => {
        this.foodItems = DEMO_ITEMS;
        this.filteredItems = [...DEMO_ITEMS];
        this.cdr.detectChanges();
      }
    });
  }

  filterByCategory(cat: string): void {
    this.activeCategory = cat;
    this.filteredItems = cat === 'All' ? this.foodItems : this.foodItems.filter(i => i.category === cat);
  }

  addToCart(item: FoodItem): void {
    this.cartService.addToCart(item);
    this.addedItemId = item.id;
    setTimeout(() => { this.addedItemId = null; }, 1200);
  }
}
