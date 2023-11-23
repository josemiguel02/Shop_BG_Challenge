using System.ComponentModel.DataAnnotations;

namespace Shop_BG_Challenge.DTO;

public class UserDTO
{
    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}