import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { FoodItem } from '../../models/food-item';

@Component({
  selector: 'app-menu-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-management.component.html',
  styleUrl: './menu-management.component.css'
})
export class MenuManagementComponent implements OnInit {
  foodItems: FoodItem[] = [];
  editingItem: FoodItem | null = null;
  newItem: FoodItem = this.getEmptyFoodItem();
  showForm = false;

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.loadFoodItems();
  }

  loadFoodItems(): void {
    this.foodService.getFoodItems().subscribe(items => {
      this.foodItems = items;
    });
  }

  getEmptyFoodItem(): FoodItem {
    return {
      id: 0,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: '',
      isAvailable: true
    };
  }

  saveItem(): void {
    if (this.editingItem) {
      this.foodService.updateFoodItem(this.newItem).subscribe(() => {
        this.resetForm();
        this.loadFoodItems();
      });
    } else {
      this.foodService.addFoodItem(this.newItem).subscribe(() => {
        this.resetForm();
        this.loadFoodItems();
      });
    }
  }

  editItem(item: FoodItem): void {
    this.editingItem = item;
    this.newItem = { ...item };
    this.showForm = true;
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.foodService.deleteFoodItem(id).subscribe(() => {
        this.loadFoodItems();
      });
    }
  }

  resetForm(): void {
    this.editingItem = null;
    this.newItem = this.getEmptyFoodItem();
    this.showForm = false;
  }
}
