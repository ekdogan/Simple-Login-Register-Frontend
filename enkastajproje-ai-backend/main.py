import json
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import os
API_KEY = os.getenv("OPENROUTER_API_KEY")

kategoriler = ["Kırtasiye", "Elektronik", "Gıda", "Giyim", "Temizlik", "İnşaat"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UrunIstegi(BaseModel):
    urun_adi: str

@app.post("/kategori-bul")
def kategori_bul_api(istek: UrunIstegi):
    temiz_urun = istek.urun_adi.strip()
    
    if len(temiz_urun) < 2:
        return {"durum": "hata", "mesaj": "Lütfen en az 2 harfli anlamlı bir ürün girin."}
        
    if len(temiz_urun) > 30:
        return {"durum": "hata", "mesaj": "Ürün adı çok uzun. Lütfen daha kısa yazın."}
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    talimat = f"""
    Sen bir şirket içi envanter yönetim asistanısın. 
    Görevin, sana verilen bir ürün adını sadece listedeki uygun kategorilerden biriyle eşleştirmektir.
    
    Mevcut Kategoriler: {kategoriler}
    Gelen Ürün: "{temiz_urun}"
    
    KURAL: Cevap olarak SADECE ve SADECE listedeki kategori adını yaz. Nokta dahi koyma.
    """

    data = {
        "model": "tencent/hy3:free",
        "messages": [{"role": "user", "content": talimat}]
    }

    cevap = requests.post(url, headers=headers, data=json.dumps(data))
    sonuc = cevap.json()

    if "choices" not in sonuc:
         
        return {"durum": "hata", "mesaj": "OpenRouter API Hatası", "detay": sonuc}

    ai_cevabi = sonuc["choices"][0]["message"]["content"].strip()
    
    return {"durum": "basarili", "urun": temiz_urun, "kategori": ai_cevabi}