
using MovieHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieHub.Data
{
    public interface IAuthRepository
    {
        Task<Users> Register(Users users, string password);
        Task<Users> Login(string username, string password);
        Task<bool> UserExists(string username);
        Task<bool> EmailExists(string email);
    }
}
