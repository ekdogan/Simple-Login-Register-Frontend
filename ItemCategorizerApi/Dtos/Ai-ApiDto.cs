using System.Text.Json.Serialization;

namespace ItemCategorizerApi.Models
{
    // FastAPI'nin beklediği istek gövdesi
    public class AiCategorizeRequest
    {
        [JsonPropertyName("urun_adi")]
        public string UrunAdi { get; set; } = string.Empty;
    }

    // FastAPI'den dönen yanıt yapısı
    public class AiCategorizeResponse
    {
        [JsonPropertyName("durum")]
        public string Durum { get; set; } = string.Empty;

        [JsonPropertyName("mesaj")]
        public string? Mesaj { get; set; }

        [JsonPropertyName("urun")]
        public string? Urun { get; set; }

        [JsonPropertyName("kategori")]
        public string? Kategori { get; set; }
    }
}