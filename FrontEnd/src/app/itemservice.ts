import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './table/table';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5233/api/Item'; 

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  updateItem(id: number, element: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, element);
  }

  addItem(element: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, element);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}