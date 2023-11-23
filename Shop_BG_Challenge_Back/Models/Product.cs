using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop_BG_Challenge.Models;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public string? Name { get; set; }

    [Required]
    public double Price { get; set; }

    public string? Description { get; set; }

    public string? UrlImage { get; set; }

    public int Stock { get; set; }

    public bool Status { get; set; }
}