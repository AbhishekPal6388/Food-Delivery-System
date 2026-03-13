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
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void { this.refreshCart(); }

  refreshCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeItem(id: number): void { this.cartService.removeFromCart(id); this.refreshCart(); }
  updateQty(id: number, qty: number): void { this.cartService.updateQuantity(id, qty); this.refreshCart(); }
  clearCart(): void { this.cartService.clearCart(); this.refreshCart(); }
}
