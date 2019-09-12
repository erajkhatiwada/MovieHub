using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Genres
    {
        public Genres()
        {
            Movies = new HashSet<Movies>();
        }

        public int Id { get; set; }
        public string Genre { get; set; }

        public ICollection<Movies> Movies { get; set; }
    }
}
