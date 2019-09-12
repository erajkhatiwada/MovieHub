using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class WatchList
    {
        public int WatchId { get; set; }
        public int UserId { get; set; }
        public string MovieName { get; set; }

        public Users User { get; set; }
    }
}
