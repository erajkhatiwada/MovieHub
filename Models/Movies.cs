using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Movies
    {
        public Movies()
        {
            Watchlists = new HashSet<Watchlists>();
        }

        public int Id { get; set; }
        public string MovieName { get; set; }
        public int GenreId { get; set; }

        public Genres Genre { get; set; }
        public ICollection<Watchlists> Watchlists { get; set; }
    }
}
