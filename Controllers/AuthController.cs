using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MovieHub.Data;
using MovieHub.Dto;
using MovieHub.Models;

namespace MovieHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly MovieHubTryContext _context;
        public AuthController(IAuthRepository repo, IConfiguration config, MovieHubTryContext context)
        {
            _config = config;
            _repo = repo;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validate request 
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();
            if ((await _repo.UserExists(userForRegisterDto.UserName)) &&
                (await _repo.EmailExists(userForRegisterDto.Email)))
            {
                return BadRequest("Username and Email already exist!");
            }
            else if((await _repo.UserExists(userForRegisterDto.UserName)))

            {
                return BadRequest("Username already exists!");
            }
            else if ((await _repo.EmailExists(userForRegisterDto.Email)))
            {
                return BadRequest("Email already exists!");
            }

            var userToCreate = new Users
            {
                UserName = userForRegisterDto.UserName,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                Email = userForRegisterDto.Email
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //check if the user exists
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();

            //build up token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            //secret key generator
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.
                GetSection("AppSettings:Token").Value));

            //generate signing credentials
            //use algorithm to hash the above secret key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //security (Create token) descriptor(contains: 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });

        }
        
         
    }
}
