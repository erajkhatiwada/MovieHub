using MovieHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieHub.Data
{
    public interface IAddingRepository
    {
        //creating to save into database
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Users>> GetUsers();

        Task<Users> GetUser(int id);

        Task<Pictures> GetPicture(int id);


    }
}


//same a IDatingRepository