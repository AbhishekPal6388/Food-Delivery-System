import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order, OrderStatus } from '../../models/order';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.orderService.getCustomerOrders(user.id).subscribe(o => {
          this.orders = o.reverse();
          this.cdr.detectChanges();
        });
      }
    });
  }

  getStatusName(status: number): string { return OrderStatus[status] || 'Unknown'; }

  getStatusClass(status: number): string {
    const map: any = { 0: 'status-pending', 1: 'status-info', 2: 'status-warning', 3: 'status-info', 4: 'status-success', 5: 'status-danger' };
    return map[status] || '';
  }
}
