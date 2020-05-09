using System;
using System.ComponentModel.DataAnnotations;

namespace AFCU.Models
{
    public class User
    {
        public User()
        {
        }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string FullName { get; set; }

        [DataType(DataType.Date)]
        public DateTime? LastLoggedIn { get; set; }

        public Guid Id { get; set; }
    }
}
