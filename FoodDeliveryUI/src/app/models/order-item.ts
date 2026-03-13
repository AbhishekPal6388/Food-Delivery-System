import { FoodItem } from './food-item';

export interface OrderItem {
  id: number;
  orderId: number;
  foodItemId: number;
  foodItem?: FoodItem;
  quantity: number;
  price: number;
}
