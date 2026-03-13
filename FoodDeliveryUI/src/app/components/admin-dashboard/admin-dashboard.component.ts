import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FoodService } from '../../services/food.service';
import { Order, OrderStatus } from '../../models/order';
import { FoodItem } from '../../models/food-item';
import { MenuManagementComponent } from '../menu-management/menu-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MenuManagementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  orders: Order[] = [];
  activeTab: 'orders' | 'menu' = 'orders';
  statusOptions = Object.keys(OrderStatus).filter(k => isNaN(Number(k)));

  constructor(
    private orderService: OrderService,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders.reverse();
    });
  }

  updateStatus(orderId: number, statusStr: string): void {
    const status = (OrderStatus as any)[statusStr];
    this.orderService.updateOrderStatus(orderId, status).subscribe(() => {
      this.loadOrders();
    });
  }

  getStatusName(status: number): string {
    return OrderStatus[status];
  }

  getDashboardMetrics() {
    return {
      totalOrders: this.orders.length,
      revenue: this.orders.reduce((acc, o) => acc + o.totalAmount, 0),
      pending: this.orders.filter(o => o.status === OrderStatus.Pending).length
    };
  }
}
