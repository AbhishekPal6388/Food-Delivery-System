import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FoodItem } from '../models/food-item';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:5133/api/FoodItems';

  constructor(private http: HttpClient) { }

  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        let arr = Array.isArray(res) ? res : (res?.$values ?? res?.value ?? res?.data ?? []);
        return [...arr];
      })
    );
  }

  getFoodItem(id: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(`${this.apiUrl}/${id}`);
  }

  addFoodItem(foodItem: FoodItem): Observable<FoodItem> {
    return this.http.post<FoodItem>(this.apiUrl, foodItem);
  }

  updateFoodItem(foodItem: FoodItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${foodItem.id}`, foodItem);
  }

  deleteFoodItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
