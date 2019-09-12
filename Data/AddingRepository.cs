using Microsoft.EntityFrameworkCore;
using MovieHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieHub.Data
{
    public class AddingRepository : IAddingRepository
    {
        private readonly MovieHubTryContext _context;
        public AddingRepository(MovieHubTryContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Pictures> GetPicture(int id)
        {
            var picture = await _context.Pictures.FirstOrDefaultAsync(
                p => p.Id == id);

            return picture;
        }

        public async Task<Users> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Pictures).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<Users>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Pictures).ToListAsync();

            return users;
        }


        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;        }
    }
}
