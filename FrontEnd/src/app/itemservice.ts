// item.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from './table/table';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  // Backend API URL'ini buraya yazmalısın
  private apiUrl = 'backendAPI'; 

  // Veri tabanındaki tüm elemanları getirir
  getItems(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.apiUrl);
  }

  // Düzenlenen elemanı veri tabanında günceller
  updateItem(id: number, element: PeriodicElement): Observable<PeriodicElement> {
    return this.http.put<PeriodicElement>(`${this.apiUrl}/${id}`, element);
  }
}