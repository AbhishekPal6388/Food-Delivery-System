import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../services/food.service';
import { CartService } from '../../services/cart.service';
import { FoodItem } from '../../models/food-item';

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
  categories: string[] = ['All'];
  selectedCategory: string = 'All';

  constructor(
    private foodService: FoodService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.foodService.getFoodItems().subscribe(items => {
      this.foodItems = items;
      this.filteredItems = items;
      
      const cats = [...new Set(items.map(i => i.category))];
      this.categories = ['All', ...cats];
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredItems = this.foodItems;
    } else {
      this.filteredItems = this.foodItems.filter(i => i.category === category);
    }
  }

  addToCart(item: FoodItem): void {
    this.cartService.addToCart(item);
  }
}
