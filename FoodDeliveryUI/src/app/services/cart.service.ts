import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodItem } from '../models/food-item';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: OrderItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  getCartItems(): OrderItem[] {
    return this.cartItems;
  }

  addToCart(foodItem: FoodItem): void {
    const existingItem = this.cartItems.find(i => i.foodItemId === foodItem.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: 0,
        orderId: 0,
        foodItemId: foodItem.id,
        foodItem: foodItem,
        quantity: 1,
        price: foodItem.price
      });
    }
    this.saveCart();
  }

  removeFromCart(foodItemId: number): void {
    this.cartItems = this.cartItems.filter(i => i.foodItemId !== foodItemId);
    this.saveCart();
  }

  updateQuantity(foodItemId: number, quantity: number): void {
    const item = this.cartItems.find(i => i.foodItemId === foodItemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(foodItemId);
      } else {
        this.saveCart();
      }
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartCountSubject.next(this.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartCountSubject.next(this.cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }
  }
}
