namespace Shop_BG_Challenge.Helpers;

public class LoginResponse
{
    public UserResponse User { get; set; }
    public string Token { get; set; }
}

public class UserResponse
{
    public int Id { get; set; }
    public string? Email { get; set; }

    public int PricingId { get; set; }
}