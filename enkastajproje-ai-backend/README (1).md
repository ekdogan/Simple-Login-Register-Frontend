# AI-Integrated Inventory App - Backend (ENKA Project)

Bu dizin, ENKA İnşaat ve Sanayii A.Ş. BT departmanı staj projesi kapsamında geliştirilen Yapay Zeka Destekli Envanter Yönetimi (AI-Integrated Inventory Management) uygulamasının arka uç (backend) servislerini içermektedir.

## 🚀 Proje Özeti

Arka uç mimarisi, Angular tabanlı ön uç (frontend) ile iletişim kuran, yüksek performanslı ve ölçeklenebilir RESTful API'ler sağlamak üzere **C# / .NET** kullanılarak inşa edilmiştir. Bu servisin temel odak noktalarından biri, **OpenRouter** üzerinden **Gemma 4** modeline bağlanarak envanter kontrol sistemine yapay zeka yetenekleri kazandırmasıdır.

## 🛠 Kullanılan Teknolojiler

*   **Çerçeve (Framework):** C# / .NET (Web API)
*   **Yapay Zeka Entegrasyonu:** Gemma 4 (OpenRouter API aracılığıyla)
*   **Versiyon Kontrolü:** Git / GitHub

## ✨ Temel Özellikler

*   **Gelişmiş Envanter Kontrolü:** Envanter verilerinin izlenmesi, eklenmesi ve düzenlenmesi için RESTful uç noktalar.
*   **Yapay Zeka Destekli Analiz:** Envanter durumlarını değerlendirmek ve akıllı asistan yetenekleri sunmak için Gemma 4 LLM entegrasyonu.
*   **Güvenli Kimlik Doğrulama:** Token tabanlı oturum yönetimi. (Çıkış işlemlerinde token temizleme (logout clearance) mekanizmaları güvenli bir şekilde uç noktalardan yönetilecek şekilde tasarlanmıştır).

## ⚙️ Kurulum ve Çalıştırma

### Gereksinimler
*   [.NET SDK](https://dotnet.microsoft.com/download)
*   OpenRouter API Anahtarı (Gemma 4 erişimi için)

### Adımlar

1.  Projeyi yerel ortamınıza klonlayın:
    ```bash
    git clone https://github.com/ekdogan/AI-Integrated-InventoryApp.git
    ```
2.  Backend dizinine geçiş yapın:
    ```bash
    cd AI-Integrated-InventoryApp/enkastajproje-ai-backend
    ```
3.  Konfigürasyon ayarlarını yapılandırın:
    *   `appsettings.json` dosyasına veritabanı bağlantı dizenizi (connection string) ekleyin.
    *   OpenRouter API anahtarınızı ilgili alana tanımlayın.
4.  Uygulamayı derleyin ve başlatın:
    ```bash
    dotnet build
    dotnet run
    ```
