using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Ratings
    {
        public int Id { get; set; }
        public int? Rating { get; set; }
        public int UserId { get; set; }

        public Users User { get; set; }
    }
}
