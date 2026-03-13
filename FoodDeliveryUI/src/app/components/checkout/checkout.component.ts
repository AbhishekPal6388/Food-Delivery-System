import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: OrderItem[] = [];
  totalPrice = 0;
  currentUser: any = null;
  loading = false;
  delivery = { address: '', city: '', phone: '' };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      this.currentUser = u;
      if (!u) this.router.navigate(['/login']);
    });
    this.cartItems = this.cartService.getCartItems();
    if (!this.cartItems.length) this.router.navigate(['/']);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  placeOrder(): void {
    if (!this.currentUser) return;
    this.loading = true;
    const order = {
      userId: this.currentUser.id,
      totalAmount: this.totalPrice + 5,
      status: 0,
      orderItems: this.cartItems.map(i => ({ foodItemId: i.foodItemId, quantity: i.quantity, price: i.price }))
    };
    this.orderService.placeOrder(order).subscribe({
      next: () => { 
        alert('Order placed successfully! 🎉');
        this.cartService.clearCart(); 
        this.router.navigate(['/orders']); 
      },
      error: (e: any) => { alert('Order failed. Try again.'); this.loading = false; }
    });
  }
}
