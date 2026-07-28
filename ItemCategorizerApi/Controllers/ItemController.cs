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

        //GetbyPage
        // GET: api/Item/paged?pageIndex=0&pageSize=10
        [HttpGet("paged")]
        public async Task<ActionResult<object>> GetItemsPaged([FromQuery] int pageIndex = 0, [FromQuery] int pageSize = 5)
        {
            // Veritabanındaki toplam öğe sayısını alıyoruz (Paginator'ın toplam sayfa sayısını bilmesi için gerekli)
            var totalCount = await _context.Items.CountAsync();

            // Skip ve Take kullanarak sadece o sayfanın verilerini çekiyoruz
            var items = await _context.Items
                                      .OrderBy(i => i.Id) // Opsiyonel: En son eklenenleri ilk sayfada göstermek isterseniz
                                      .Skip(pageIndex * pageSize)
                                      .Take(pageSize)
                                      .ToListAsync();

            // Verileri ve toplam sayıyı birlikte dönüyoruz
            return Ok(new { Items = items, TotalCount = totalCount });
        }
        [HttpGet("paged/{searchItem}")]
        public async Task<ActionResult<object>> GetItemsPagedSearch(string searchItem, [FromQuery] int pageIndex = 0, [FromQuery] int pageSize = 5)
        {
            
            
            var query = _context.Items.Where(i => i.Name.ToLower().Contains(searchItem.ToLower()));
            var totalCount = await query.CountAsync();
            var items =await query
                                      .OrderBy(i => i.Id) 
                                      .Skip(pageIndex * pageSize)
                                      .Take(pageSize)
                                      .ToListAsync();

            // Verileri ve toplam sayıyı birlikte dönüyoruz
            return Ok(new { Items = items, TotalCount = totalCount });
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
            var currentUserName = User.Identity.Name;
            item.PersonToEdit = currentUserName;
            item.Time = DateTime.Now;
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
            var currentUserName = User.Identity.Name;
            item.PersonToEdit = currentUserName;
            item.Time = DateTime.Now;
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