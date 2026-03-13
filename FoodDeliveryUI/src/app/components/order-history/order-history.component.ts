import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order, OrderStatus } from '../../models/order';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  statusMap = OrderStatus;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.orderService.getCustomerOrders(user.id).subscribe(orders => {
          this.orders = orders.reverse(); // Newest first
        });
      }
    });
  }

  getStatusName(status: number): string {
    return OrderStatus[status] || 'Unknown';
  }

  getStatusClass(status: number): string {
    switch (status) {
      case OrderStatus.Pending: return 'status-pending';
      case OrderStatus.Confirmed: return 'status-info';
      case OrderStatus.Preparing: return 'status-warning';
      case OrderStatus.Shipped: return 'status-info';
      case OrderStatus.Delivered: return 'status-success';
      case OrderStatus.Cancelled: return 'status-danger';
      default: return '';
    }
  }
}
