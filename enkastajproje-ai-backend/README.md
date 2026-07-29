# ENKA Staj Projesi: Yapay Zeka Entegrasyon Servisi (AI Backend)

Bu dizin AI-Integrated Inventory App projesinin yapay zeka entegrasyonunu yöneten, C#/.NET tabanlı arka uç (backend) servisinin kaynak kodlarını barındırır. 

Uygulamanın ana amacı, envanter yönetimi ve kontrol süreçlerine yapay zeka destekli akıl katmaktır. Bu servis, Angular ve Angular Material ile geliştirilen ön yüz (frontend) ile haberleşerek kullanıcıdan gelen sorguları ve veri analizi taleplerini işler.

## Bu Kod Ne Yapıyor?

Bu mikroservis/backend uygulaması, sistemdeki yapay zeka yeteneklerinin merkezidir:
- **Gemma 4 Entegrasyonu:** OpenRouter API'si üzerinden **Gemma 4** büyük dil modeline bağlanır.
- **Akıllı Envanter Analizi:** Stok verilerini, kullanım trendlerini veya kullanıcı sorgularını analiz ederek anlamlı içgörüler ve otomasyon yanıtları üretir.
- **Köprü Görevi:** İstemci tarafı (Angular) ile yapay zeka modeli (OpenRouter) arasında güvenli ve hızlı bir iletişim katmanı oluşturur. Doğrudan API anahtarlarının ön yüzde açığa çıkmasını engeller ve prompt mühendisliği (prompt engineering) süreçlerini sunucu tarafında yönetir.

## Kullanılan Teknolojiler
- **Geliştirme Ortamı:** C# / .NET (Backend)
- **AI Sağlayıcısı:** OpenRouter API
- **Yapay Zeka Modeli:** Gemma 4
- **İstemci (Bağlantılı olduğu arayüz):** Angular, Angular Material

## Nasıl Çalıştırılır?

Projeyi kendi yerel (local) ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### 1. Sistem Gereksinimleri
- Sisteminize uygun güncel [**.NET SDK**](https://dotnet.microsoft.com/download) sürümünün yüklü olduğundan emin olun.
- Geçerli bir **OpenRouter API Key**'e sahip olmanız gerekmektedir.

### 2. Kurulum ve Bağımlılıkların Yüklenmesi
Terminali (veya Command Prompt/PowerShell) `enkastajproje-ai-backend` dizininde açın. Gerekli kütüphane ve paketleri (NuGet) indirmek için şu komutu çalıştırın:
```bash
dotnet restore
```

### 3. Yapılandırma (Configuration)
Projenin OpenRouter ile iletişim kurabilmesi için API anahtarınızı sisteme tanıtmanız gerekmektedir. `appsettings.json` veya `appsettings.Development.json` dosyasını açarak (eğer yoksa oluşturarak) aşağıdaki yapılandırmayı kendi anahtarınız ile güncelleyin:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "OpenRouterConfig": {
    "ApiKey": "BURAYA_OPENROUTER_API_ANAHTARINIZI_YAZIN",
    "Model": "google/gemma-4",
    "BaseUrl": "https://openrouter.ai/api/v1"
  }
}
```

### 4. Projeyi Başlatma
Konfigürasyonları tamamladıktan sonra, uygulamayı ayağa kaldırmak için aynı dizinde şu komutu çalıştırın:
```bash
dotnet run
```
Bu komut projeyi derleyecek (build) ve yerel sunucunuzda (genellikle `http://localhost:5000` veya `https://localhost:5001`) başlatacaktır. 

Uygulama çalıştıktan sonra, frontend tarafındaki envanter sisteminden (Angular) veya Postman/Swagger gibi bir API test aracı üzerinden backend uç noktalarına (endpoint) istek göndererek yapay zeka entegrasyonunu test edebilirsiniz.
