using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHub.Models;

namespace MovieHub.Data
{
    public class Check : CheckInterface
    {
        private readonly MovieHubTryContext _context;

        public Check(MovieHubTryContext context)
        {
            _context = context;
        }

        public async Task<bool> PopularMovieExists(string name)
        {
            if (await _context.PopularMovies.AnyAsync(x => x.Name == name))
                return true;

            return false;
        }

        public async Task<bool> WatchlistExists(string movieName)
        {
            if (await _context.WatchList.AnyAsync(x => x.MovieName == movieName))
            {
                return true;
            }

            return false;
        }
        public async Task<bool> WatchlistUserExists(int userId)
        {
            if (await _context.WatchList.AnyAsync(x => x.UserId == userId))
            {
                return true;
            }

            return false;
        }

    }
}
