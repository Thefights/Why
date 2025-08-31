using DataAccessLayer.Models.AbstractEntities;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Models.UserEntities
{
    public class RefreshToken : BaseEntity
    {
        [JsonIgnore]
        public string Token { get; set; } = string.Empty;

        public DateTime Expires { get; set; }

        public DateTime Created { get; set; }

        public string CreatedByIp { get; set; } = string.Empty;

        public string ReplacedByToken { get; set; } = string.Empty;

        public bool IsExpired => DateTime.UtcNow >= Expires;

        public bool IsActive => !IsExpired;

        public int UserId { get; set; }
        public User User { get; set; }
    }
}