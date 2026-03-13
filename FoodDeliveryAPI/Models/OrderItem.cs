using System.ComponentModel.DataAnnotations;

namespace FoodDeliveryAPI.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        
        [Required]
        public int OrderId { get; set; }
        
        [Required]
        public int FoodItemId { get; set; }
        public FoodItem? FoodItem { get; set; }
        
        public int Quantity { get; set; }
        
        public decimal Price { get; set; }
    }
}
