using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Pictures
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string PictureUrl { get; set; }
        public string PublicId { get; set; }

        public Users User { get; set; }
    }
}
