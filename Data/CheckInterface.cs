using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieHub.Data
{
    public interface CheckInterface
    {
        Task<bool> PopularMovieExists(string name);
        Task<bool> WatchlistExists(string moiveName);
        Task<bool> WatchlistUserExists(int userId);
    }
}
