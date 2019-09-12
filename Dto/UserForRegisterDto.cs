using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieHub.Dto
{
    public class UserForRegisterDto
    {
        [Required]
        public String UserName { get; set; }
        [Required]
        public String FirstName { get; set; }
        [Required]
        public String LastName { get; set; }
        [Required]
        public String Email { get; set; }
        [Required]
        public String Password { get; set; }
    }
}
