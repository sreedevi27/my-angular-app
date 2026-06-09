import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

/**
 * AuthService
 *
 * Simple authentication service used by the Poolcar demo app.
 * - Maintains an in-memory login state using a BehaviorSubject.
 * - login(...) simulates an async call (delay) and accepts any non-empty credentials.
 * - logout() clears the login state.
 *
 * Replace the simulated login method with a real API call when integrating a backend.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Observable login state for components to subscribe to
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  // Public observable stream that emits current login state
  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  /**
   * login
   * Simulate a login request. In a real app this would POST credentials to an auth endpoint.
   * We accept any non-empty username/password here to keep the sample simple.
   */
  login(username: string, password: string): Observable<boolean> {
    const success = username.trim().length > 0 && password.trim().length > 0;
    // Return an observable that resolves after a short delay to simulate network latency
    return of(success).pipe(
      delay(800),
      map((ok) => {
        if (ok) this._isLoggedIn.next(true); // update in-memory state on success
        return ok;
      })
    );
  }

  /**
   * logout
   * Clear the in-memory login state. In a real application also revoke tokens / clear storage.
   */
  logout(): void {
    this._isLoggedIn.next(false);
  }
}
