import json
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb

API_KEY = {OpenRouterAPi}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Vektör Veritabanı Kurulumu (Sunucu yeniden başlasa bile çökmemesi için get_or_create kullanıldı)
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="urun_kategorileri")

TUM_KATEGORILER = [
    "Elektronik - Bilgisayar", "Elektronik - Cep Telefonu", "Elektronik - Beyaz Eşya",
    "Gıda - Atıştırmalık", "Gıda - Meyve ve Sebze", "Gıda - İçecekler",
    "Kırtasiye - Yazım Gereçleri", "Kırtasiye - Defter ve Kağıt", "Kırtasiye - Dosyalama",
    "İnşaat - Hırdavat", "İnşaat - Boya", "İnşaat - Elektrik Tesisatı",
    "Giyim - Erkek Giyim", "Giyim - Kadın Giyim", "Giyim - Ayakkabı"
]

# Kategorileri veritabanına bir kere yüklüyoruz
collection.add(
    documents=TUM_KATEGORILER,
    ids=[str(i) for i in range(len(TUM_KATEGORILER))]
)

class UrunIstegi(BaseModel):
    urun_adi: str

def yapay_zekaya_sor(talimat: str):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "google/gemma-4-26b-a4b-it:free",
        "messages": [{"role": "user", "content": talimat}]
    }
   
    try:
        cevap = requests.post(url, headers=headers, data=json.dumps(data))
        sonuc = cevap.json()
        if "choices" in sonuc:
            return sonuc["choices"][0]["message"]["content"].strip()
        return None
    except Exception:
        return None

@app.post("/kategori-bul")
def kategori_bul_api(istek: UrunIstegi):
    orijinal_urun = istek.urun_adi.strip()
   
    if len(orijinal_urun) < 2:
        return {"durum": "hata", "mesaj": "Lütfen en az 2 harfli anlamlı bir ürün girin."}

    # RAG - Retrieval (Geri Getirme): Vektör veritabanından anlamsal olarak en yakın 5 kategoriyi buluyoruz
    arama_sonucu = collection.query(
        query_texts=[orijinal_urun],
        n_results=5
    )
   
    en_yakin_kategoriler = arama_sonucu['documents'][0]

    # RAG - Augmentation & Generation (Zenginleştirme ve Üretme): Bulunan dar listeyi LLM'e gönderiyoruz
    talimat = f"""
    Sen bir sınıflandırma asistanısın. Görevin verilen ürünü SADECE aşağıdaki listeden en uygun olanıyla eşleştirmektir.
    Gelen Ürün: "{orijinal_urun}"
    Olası Kategoriler: {en_yakin_kategoriler}
    KURAL: SADECE kategori adını yaz. Listede olmayan bir şey uydurma. Nokta koyma.
    """
   
    ai_cevabi = yapay_zekaya_sor(talimat)
   
    if not ai_cevabi:
        return {"durum": "hata", "mesaj": "Yapay zeka yanıt veremedi."}

    return {
        "durum": "basarili",
        "urun": orijinal_urun,
        "kategori": ai_cevabi,
        "kaynak": "rag_vektor_veritabani",
        "taranan_kategori_sayisi": len(en_yakin_kategoriler)
    }