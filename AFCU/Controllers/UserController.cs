using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AFCU.Models;

namespace AFCU.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync<User>();

            return user;

            //if (user == null)
            //{
            //    return NotFound();
            //}

            //return user;
        }

        [HttpGet("{username}/{password}")]
        public async Task<ActionResult<User>> GetUser(string username, string password)
        {
            var user = await _context.Users.Where(x => x.Username == username && x.Password == password).FirstOrDefaultAsync<User>();

            return user;

            //if (user == null)
            //{
            //    return NotFound();
            //}

            //return user;
        }

        [HttpGet("username/{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            var user = await _context.Users.Where(x => x.Username == username).FirstOrDefaultAsync<User>();

            return user;

            //if (user == null)
            //{
            //    return NotFound();
            //}

            //return user;
        }



        // PUT: api/User/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var existingUser = _context.Users.Where(x => x.Username == user.Username).FirstOrDefault<User>();

            if (existingUser == null)
            {
                user.Id = user.Id == Guid.Empty ? Guid.NewGuid() : user.Id;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
