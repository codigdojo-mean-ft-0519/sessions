import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { BOOKS } from '../data';
import { Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly base = 'http://59498bce6d49df0011102cfc.mockapi.io/books';

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.base);

    // return of(BOOKS);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.base, book);
  }

  removeBook(id: number): Observable<Book> {
    console.log('in service removing book' + id);
    return this.http.delete<Book>(`${this.base}/${id}`);
  }
}
