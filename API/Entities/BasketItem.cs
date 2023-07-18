using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        
        // Navigation properties
        // The following properties are used to define the relationship between the BasketItem and the Product and Basket entities.
        public int ProductId { get; set; } // This is the foreign key
        public Product Product { get; set; } // This is the navigation property

        public int BasketId { get; set; } // This is the foreign key
        public Basket Basket { get; set; } // This is the navigation property
    }
}