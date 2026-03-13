import { OrderItem } from './order-item';

export interface Order {
  id: number;
  userId: number;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  orderItems: OrderItem[];
}

export enum OrderStatus {
  Pending = 0,
  Confirmed = 1,
  Preparing = 2,
  Shipped = 3,
  Delivered = 4,
  Cancelled = 5
}
