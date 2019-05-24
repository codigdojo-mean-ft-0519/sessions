import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { tap } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly base = '/api/auth';
  readonly isAuthed$ = new BehaviorSubject<boolean>(this.isAuthed());

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  login(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.base}/login`, user)
      .pipe(tap(() => this.isAuthed$.next(true)));
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.base}/register`, user).pipe(
      tap(userFromAPI => {
        console.log('got userFromAPI in pipe', userFromAPI);
        this.isAuthed$.next(true);
      })
    );
  }

  logout(): Observable<void> {
    return this.http
      .delete<void>(`${this.base}/logout`)
      .pipe(tap(() => this.isAuthed$.next(false)));
  }

  isAuthed(): boolean {
    const expired = parseInt(this.cookieService.get('expiration'), 10);
    const userID = this.cookieService.get('userID');
    const session = this.cookieService.get('session');

    return Boolean(session && expired && userID && expired > Date.now());
  }
}
