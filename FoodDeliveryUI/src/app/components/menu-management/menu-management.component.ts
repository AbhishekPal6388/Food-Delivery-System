import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  newItem: FoodItem = this.blank();
  showForm = false;

  constructor(private foodService: FoodService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void { this.foodService.getFoodItems().subscribe(items => { this.foodItems = [...items]; this.cdr.detectChanges(); }); }

  blank(): FoodItem { return { id: 0, name: '', description: '', price: 0, imageUrl: '', category: '', isAvailable: true }; }

  save(): void {
    if (this.editingItem) {
      this.foodService.updateFoodItem(this.newItem).subscribe(() => { this.reset(); this.load(); });
    } else {
      this.foodService.addFoodItem(this.newItem).subscribe(() => { this.reset(); this.load(); });
    }
  }

  edit(item: FoodItem): void { this.editingItem = item; this.newItem = { ...item }; this.showForm = true; }

  delete(id: number): void { if (confirm('Delete this item?')) this.foodService.deleteFoodItem(id).subscribe(() => this.load()); }

  reset(): void { this.editingItem = null; this.newItem = this.blank(); this.showForm = false; }
}
