using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHub.Models;

namespace MovieHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MovieHubTryContext _context;

        public UserController(MovieHubTryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Users> GetUser()
        {
            var a = _context.Users.Include(x => x.Comments).Include(x => x.WatchList).Include(x => x.Pictures).ToList();
            return a; 
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.Include(x => x.Comments).Include(x => x.WatchList).Include(x => x.Pictures).Where(x => x.Id == id).ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }
        
       
    }
}