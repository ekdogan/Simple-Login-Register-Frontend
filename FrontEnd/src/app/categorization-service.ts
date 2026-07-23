import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AiResponse {
  durum: string;
  mesaj?: string;
  urun?: string;
  kategori?: string;
  detay?: any; // FastAPI'den dönen detay objesi için ekleyebilirsiniz
}

@Injectable({
  providedIn: 'root'
})
export class CategorizationService {
  // .NET Web API adresiniz
  private apiUrl = 'http://localhost:5233/api/Categorization/kategori-oner';

  constructor(private http: HttpClient) {}

  getCategoryPrediction(urunAdi: string): Observable<AiResponse> {
    return this.http.post<AiResponse>(this.apiUrl, { urun_adi: urunAdi });
  }
}
