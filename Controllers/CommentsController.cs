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
    public class CommentsController : ControllerBase
    {
        private readonly MovieHubTryContext _context;

        public CommentsController(MovieHubTryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Comments> GetComments()
        {
            return _context.Comments.Include(x => x.Movie).Include(x => x.User).ToList();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComments([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var a = await _context.Comments.FindAsync(id);
            return Ok(a);
        }

        [HttpPost]
        public async Task<IActionResult> PostComments([FromBody] Comments comments)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Comments.AddAsync(comments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComments", new { id = comments.CommentId }, comments);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComments([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comments = await _context.Comments.FindAsync(id);
            if (comments == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comments);
            await _context.SaveChangesAsync();
            return Ok(comments);

        }
    }
}