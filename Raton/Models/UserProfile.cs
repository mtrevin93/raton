using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Raton.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        public string AvatarImg { get; set; }

        public string Bio { get; set; }

        public string FirebaseUserId { get; set; }
        public UserType UserType { get; set; }

    }
}