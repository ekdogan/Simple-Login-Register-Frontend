import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './table/table';
export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5233/api/Item'; 

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItemsbyPage(pageSize: number, pageIndex: number): Observable<PaginatedResult<Item>> {
   return this.http.get<PaginatedResult<Item>>(`${this.apiUrl}/paged`, {
      params: {
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString()
      }
    });
  }
  getItemsbyPageSelect(pageSize: number, pageIndex: number, searchItem: string): Observable<PaginatedResult<Item>> {
   return this.http.get<PaginatedResult<Item>>(`${this.apiUrl}/paged/${searchItem}`, {
      params: {
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString()
      }
    });
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