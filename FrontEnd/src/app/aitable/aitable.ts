import { Component, Input, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategorizationService, AiResponse } from '../categorization-service';

// Dönen yanıt modeli (Servisinizdeki Türkçe alan isimlerine veya eşlenen yapıya uygun)
export interface JSONResponse {
  state: string;       // durum ("basarili" | "hata")
  message?: string;    // mesaj
  detail?: any;        // detay (OpenRouter hata nesnesi veya detaylar)
  category?: string;   // kategori
  product?: string;    // urun
}

@Component({
  selector: 'app-aitable',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './aitable.html',
  styleUrl: './aitable.css',
})
export class Aitable {
  @Input() nightMode = false;
  searchText: string = '';
  
  // Tek bir nesne içinde JSONResponse yanıtını tutuyoruz
  aiResponseData: JSONResponse | null = null;
  isLoading: boolean = false;

  constructor(private categorizationService: CategorizationService) {}

  sendToAi() {
    if (!this.searchText || this.searchText.trim().length < 2) {
      this.aiResponseData = {
        state: 'hata',
        message: 'Lütfen en az 2 karakterlik geçerli bir ürün adı girin.'
      };
      return;
    }

    
    this.aiResponseData = null;

    this.categorizationService.getCategoryPrediction(this.searchText).subscribe({
      next: (res: AiResponse) => {
        

        // Servisten gelen (durum, mesaj, vb.) alanları JSONResponse modelimize aktarıyoruz
        this.aiResponseData = {
          state: res.durum,
          message: res.mesaj,
          detail: res.detay,
          category: res.kategori,
          product: res.urun
        };
      },
      error: (err) => {
       

        // HTTP/Bağlantı hatalarını da aynı interface formatına getiriyoruz
        this.aiResponseData = {
          state: 'hata',
          message: 'HTTP Bağlantı / Servis Hatası',
          detail: err.error || err
        };
      }
    });
  }
}
