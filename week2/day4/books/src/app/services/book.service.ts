import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { BOOKS } from '../data';
import { Book } from '../models';
// import { Book } from '../models/book.model';
// import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // private readonly base = 'http://59498bce6d49df0011102cfc.mockapi.io/books';
  private readonly base = '/api/books';

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.base);

    // return of(BOOKS);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.base}/${id}`);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.base}/${book._id}`, book);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.base, book);
  }

  removeBook(id: number): Observable<Book> {
    console.log('in service removing book' + id);
    return this.http.delete<Book>(`${this.base}/${id}`);
  }
}
