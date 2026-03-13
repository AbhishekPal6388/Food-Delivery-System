import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order, OrderStatus } from '../../models/order';
import { MenuManagementComponent } from '../menu-management/menu-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MenuManagementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  activeTab: 'orders' | 'menu' = 'orders';
  statusOptions = Object.keys(OrderStatus).filter(k => isNaN(Number(k)));
  private refreshInterval: any;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { 
    this.loadOrders(); 
    this.refreshInterval = setInterval(() => this.loadOrders(), 3000); // Auto refresh every 3 seconds
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) { clearInterval(this.refreshInterval); }
  }

  loadOrders(): void { 
    this.orderService.getOrders().subscribe({
      next: o => {
        try {
          this.orders = o.reverse();
          this.cdr.detectChanges();
          console.log('Admin orders set, length:', this.orders.length);
        } catch (e) {
          console.error('Error in reverse:', e);
        }
      },
      error: e => console.error('Subscription error:', e)
    });
  }
  
  refresh(): void { this.loadOrders(); }

  updateStatus(orderId: number, statusStr: string): void {
    this.orderService.updateOrderStatus(orderId, (OrderStatus as any)[statusStr]).subscribe(() => this.loadOrders());
  }

  getStatusName(s: number): string { return OrderStatus[s] || 'Unknown'; }

  get metrics() {
    return {
      total: this.orders.length,
      revenue: this.orders.reduce((a, o) => a + o.totalAmount, 0).toFixed(2),
      pending: this.orders.filter(o => o.status === OrderStatus.Pending).length
    };
  }
}
