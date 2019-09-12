using System;
using System.Collections.Generic;

namespace MovieHub.Models
{
    public partial class Users
    {
        public Users()
        {
            Comment = new HashSet<Comment>();
            Comments = new HashSet<Comments>();
            Pictures = new HashSet<Pictures>();
            Ratings = new HashSet<Ratings>();
            WatchList = new HashSet<WatchList>();
            Watchlists = new HashSet<Watchlists>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public ICollection<Comment> Comment { get; set; }
        public ICollection<Comments> Comments { get; set; }
        public ICollection<Pictures> Pictures { get; set; }
        public ICollection<Ratings> Ratings { get; set; }
        public ICollection<WatchList> WatchList { get; set; }
        public ICollection<Watchlists> Watchlists { get; set; }
    }
}
