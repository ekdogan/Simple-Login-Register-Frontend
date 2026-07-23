using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ItemCategorizerApi.Models;
using ItemCategorizerApi;
using Microsoft.AspNetCore.Authorization; // 1. Authorization kütüphanesini ekleyin

namespace ItemCategorizerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Item (Herkes erişebilir)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Items>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        // GET: api/Item/5 (Herkes erişebilir)
        [HttpGet("{id}")]
        public async Task<ActionResult<Items>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // PUT: api/Item/5 
        // SADECE "admin" ROLÜNDEKİLER ERİŞEBİLİR
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> PutItem(int id, Items item)
        {
            if (id != item.Id)
            {
                return BadRequest("ID eşleşmiyor.");
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(item);
        }

        // POST: api/Item
        // SADECE "admin" ROLÜNDEKİLER ERİŞEBİLİR
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Items>> PostItem(Items item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        // DELETE: api/Item/5
        // SADECE "admin" ROLÜNDEKİLER ERİŞEBİLİR
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}