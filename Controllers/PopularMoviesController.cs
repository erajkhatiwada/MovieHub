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
    public class PopularMoviesController : ControllerBase
    {
        private readonly MovieHubTryContext _context;

        public PopularMoviesController(MovieHubTryContext context)
        {
            _context = context;
        }

        // GET: api/PopularMovies
        [HttpGet]
        public IEnumerable<PopularMovies> GetPopularMovies()
        {
            return _context.PopularMovies.Include(x => x.Comments).ThenInclude(a => a.User);
        }

        // GET: api/PopularMovies/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPopularMovies([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var popularMovies = await _context.PopularMovies.Include(x => x.Comments).ThenInclude(a => a.User)
                .Where(x => x.Id == id).ToListAsync();

            if (popularMovies == null)
            {
                return NotFound();
            }

            return Ok(popularMovies);
        }

        // PUT: api/PopularMovies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPopularMovies([FromRoute] int id, [FromBody] PopularMovies popularMovies)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != popularMovies.Id)
            {
                return BadRequest();
            }

            _context.Entry(popularMovies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PopularMoviesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PopularMovies
        [HttpPost]
        public async Task<IActionResult> PostPopularMovies([FromBody] PopularMovies popularMovies)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PopularMovies.Add(popularMovies);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPopularMovies", new { id = popularMovies.Id }, popularMovies);
        }

        // DELETE: api/PopularMovies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePopularMovies([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var popularMovies = await _context.PopularMovies.FindAsync(id);
            if (popularMovies == null)
            {
                return NotFound();
            }

            _context.PopularMovies.Remove(popularMovies);
            await _context.SaveChangesAsync();

            return Ok(popularMovies);
        }

        private bool PopularMoviesExists(int id)
        {
            return _context.PopularMovies.Any(e => e.Id == id);
        }
    }
}