using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHub.Data;
using MovieHub.Models;

namespace MovieHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchListsController : ControllerBase
    {
        private readonly MovieHubTryContext _context;
        private readonly CheckInterface _check;

        public WatchListsController(MovieHubTryContext context, CheckInterface check)
        {
            _context = context;
            _check = check;
        }

        // GET: api/WatchLists
        [HttpGet]
        public IEnumerable<WatchList> GetWatchList()
        {
            var a = _context.WatchList.Include(x => x.User).ToList();
            return a;
        }

        // GET: api/WatchLists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWatchList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var watchList = await _context.WatchList.FindAsync(id);

            if (watchList == null)
            {
                return NotFound();
            }

            return Ok(watchList);
        }

        // PUT: api/WatchLists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWatchList([FromRoute] int id, [FromBody] WatchList watchList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != watchList.WatchId)
            {
                return BadRequest();
            }

            _context.Entry(watchList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WatchListExists(id))
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

        // POST: api/WatchLists
        [HttpPost]
        public async Task<IActionResult> PostWatchList([FromBody] WatchList watchList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //watchList.MovieName = watchList.MovieName.ToLower();
            //watchList.UserId = watchList.UserId;

            if (await _check.WatchlistExists(watchList.MovieName) && await _check.WatchlistUserExists(watchList.UserId))
            {
                return BadRequest("Watchlist Already Exists");
            }

            _context.WatchList.Add(watchList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWatchList", new { id = watchList.WatchId }, watchList);
        }

        // DELETE: api/WatchLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWatchList([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var watchList = await _context.WatchList.FindAsync(id);
            if (watchList == null)
            {
                return NotFound();
            }

            _context.WatchList.Remove(watchList);
            await _context.SaveChangesAsync();

            return Ok(watchList);
        }

        private bool WatchListExists(int id)
        {
            return _context.WatchList.Any(e => e.WatchId == id);
        }
    }
}