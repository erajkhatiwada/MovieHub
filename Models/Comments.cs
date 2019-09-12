using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Comments
    {
        public int CommentId { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string Comment { get; set; }

        public PopularMovies Movie { get; set; }
        public Users User { get; set; }
    }
}
