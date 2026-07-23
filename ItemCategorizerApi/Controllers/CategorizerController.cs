using Microsoft.AspNetCore.Mvc;
using ItemCategorizerApi.Models;

namespace ItemCategorizerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategorizationController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CategorizationController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("kategori-oner")]
        public async Task<IActionResult> KategoriOner([FromBody] AiCategorizeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UrunAdi))
            {
                return BadRequest(new { durum = "hata", mesaj = "Ürün adı boş olamaz." });
            }

            try
            {
                var client = _httpClientFactory.CreateClient("FastAiClient");

                // FastAPI üzerindeki /kategori-bul endpoint'ine POST isteği
                var response = await client.PostAsJsonAsync("kategori-bul", request);
                var rawJson = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"\n[.NET - FASTAPI HAM YANIT]: {rawJson}\n");
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, $"AI Servisi Hatası: {errorContent}");
                }

                var aiResult = await response.Content.ReadFromJsonAsync<AiCategorizeResponse>();
                return Ok(aiResult);
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"[.NET HATA]: {ex.Message}");
                return StatusCode(503, $"AI Servisine ulaşılamadı. Python uygulamasının çalıştığından emin olun: {ex.Message}");
            }
        }
    }
}