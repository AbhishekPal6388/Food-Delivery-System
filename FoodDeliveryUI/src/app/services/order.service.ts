import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order, OrderStatus } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5133/api/Orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<any>(`${this.apiUrl}?t=${new Date().getTime()}`).pipe(
      map(res => {
        try {
          console.log('API Response:', res);
          if (!res) return [];
          const arr = Array.isArray(res) ? res : (res.$values || res.value || res.data || []);
          console.log('Parsed Array:', arr);
          return Array.isArray(arr) ? [...arr] : [];
        } catch (err) {
          console.error('Error mapping getOrders:', err, res);
          return [];
        }
      })
    );
  }

  getCustomerOrders(userId: number): Observable<Order[]> {
    return this.http.get<any>(`${this.apiUrl}/Customer/${userId}?t=${new Date().getTime()}`).pipe(
      map(res => {
        try {
          console.log('API Customer Response:', res);
          if (!res) return [];
          const arr = Array.isArray(res) ? res : (res.$values || res.value || res.data || []);
          console.log('Parsed Customer Array:', arr);
          return Array.isArray(arr) ? [...arr] : [];
        } catch (err) {
          console.error('Error mapping getCustomerOrders:', err, res);
          return [];
        }
      })
    );
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  placeOrder(order: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/Status`, status);
  }
}
