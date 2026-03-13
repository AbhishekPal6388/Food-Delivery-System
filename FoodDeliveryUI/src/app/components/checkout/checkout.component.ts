import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderItem } from '../../models/order-item';
import { User } from '../../models/user';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: OrderItem[] = [];
  totalPrice: number = 0;
  currentUser: User | null = null;
  loading = false;
  
  deliveryDetails = {
    address: '',
    city: '',
    phone: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/']);
    }
    
    this.totalPrice = this.cartService.getTotalPrice();
  }

  placeOrder(): void {
    if (!this.currentUser) return;

    this.loading = true;
    const order = {
      userId: this.currentUser.id,
      totalAmount: this.totalPrice + 5,
      status: 0, // Pending
      orderItems: this.cartItems.map(i => ({
        foodItemId: i.foodItemId,
        quantity: i.quantity,
        price: i.price
      }))
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Order failed', err);
        this.loading = false;
        alert('Failed to place order. Please try again.');
      }
    });
  }
}
