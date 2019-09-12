using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Watchlists
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }

        public Movies Movie { get; set; }
        public Users User { get; set; }
    }
}
