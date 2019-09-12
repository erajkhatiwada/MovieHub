using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class PopularMovies
    {
        public PopularMovies()
        {
            Comments = new HashSet<Comments>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string FirstSource { get; set; }
        public string FirstPrice { get; set; }
        public string FirstLink { get; set; }
        public string SecondSource { get; set; }
        public string SecondPrice { get; set; }
        public string SecondLink { get; set; }

        public ICollection<Comments> Comments { get; set; }
    }
}
