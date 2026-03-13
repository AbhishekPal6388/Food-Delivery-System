import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: OrderItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  updateQuantity(foodItemId: number, quantity: number): void {
    this.cartService.updateQuantity(foodItemId, quantity);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  removeItem(foodItemId: number): void {
    this.cartService.removeFromCart(foodItemId);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
