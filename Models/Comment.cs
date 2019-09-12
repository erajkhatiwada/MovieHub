using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CommentSection { get; set; }

        public Users User { get; set; }
    }
}
