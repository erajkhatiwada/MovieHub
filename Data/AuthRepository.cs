
using Microsoft.EntityFrameworkCore;
using MovieHub.Models;
using System;
using System.Threading.Tasks;

namespace MovieHub.Data
{
    public class AuthRepository : IAuthRepository
    {
        //import Context class from the Model
        private readonly MovieHubTryContext _context;
        public AuthRepository(MovieHubTryContext context)
        {
            _context = context;
        }

        //method is called when the user hits the login button
        public async Task<Users> Login(string username, string password)
        {
            //returns the username from the databse
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password, Convert.FromBase64String(user.PasswordHash), 
                Convert.FromBase64String(user.PasswordSalt)))
                return null;
            return user;

        }
        // this method is used to verify the password 
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                //changes the string into byte and them computes the hash
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    //compares the hashed password(user input) with the hashed password from the database
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }
        // This method is used to register the users
        public async Task<Users> Register(Users users, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            users.PasswordHash = Convert.ToBase64String(passwordHash);
            users.PasswordSalt = Convert.ToBase64String(passwordSalt);

            //save into database
            await _context.Users.AddAsync(users);
            await _context.SaveChangesAsync();

            return users;


        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == username))
                return true;

            return false;
        }

         //check if the the email exists
        public async Task<bool> EmailExists(string email)
        {
            if (await _context.Users.AnyAsync(x => x.Email == email))
                return true;

            return false;
        }
    }
}

