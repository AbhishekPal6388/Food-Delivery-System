using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace FoodDeliveryAPI.Models
{
    public class FoodItem
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public decimal Price { get; set; }
        
        public string ImageUrl { get; set; } = string.Empty;
        
        public string Category { get; set; } = string.Empty;
        
        public bool IsAvailable { get; set; } = true;
    }
}
