import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * User interface
 * Represents the subset of user fields used by the table.
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * ApiService
 *
 * Responsible for communicating with the REST API to fetch user data.
 * - getUsers() returns an Observable<User[]>
 * - On HTTP errors it logs to console and returns a user-friendly Error via throwError()
 *
 * Currently points to jsonplaceholder.typicode.com for demo purposes.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  // Demo API - replace with your real backend endpoint
  private base = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  /**
   * getUsers
   * Fetches users from the remote API.
   * - maps a missing/empty response to an empty array
   * - catches low-level HTTP errors and throws a friendlier Error message
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/users`).pipe(
      map((data) => data || []),
      catchError((err) => {
        // Log the original error for debugging and return a sanitized message to the UI
        console.error('API error', err);
        return throwError(() => new Error('Failed to load users'));
      })
    );
  }
}
