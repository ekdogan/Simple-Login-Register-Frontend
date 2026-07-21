import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './table/table';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  
  // Backend varsayılan adresi (Backend Controller ismi Item'dır)
  private apiUrl = 'http://localhost:5233/api/Item'; 

  // 1. Tüm elemanları çek
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // 2. Eleman güncelle
  updateItem(id: number, element: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, element);
  }

  // 3. Yeni eleman ekle (ID backend tarafından üretilir)
  addItem(element: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, element);
  }

  // 4. Eleman sil
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}