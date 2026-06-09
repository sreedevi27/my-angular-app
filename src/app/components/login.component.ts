import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // HttpClient not needed here
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    //MatSnackBar
  ],
  template: `
  <div style="display:flex;justify-content:center;margin-top:4rem;">
    <mat-card style="width:360px;padding:1rem;">
      <h2>Poolcar Login</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" style="width:100%">
          <mat-label>Username</mat-label>
          <input matInput [(ngModel)]="username" name="username" />
        </mat-form-field>

        <mat-form-field appearance="fill" style="width:100%">
          <mat-label>Password</mat-label>
          <input matInput type="password" [(ngModel)]="password" name="password" />
        </mat-form-field>

        <div style="display:flex;align-items:center;gap:12px;margin-top:12px;">
          <button mat-flat-button color="primary" type="submit" [disabled]="loading">Login</button>
          <mat-progress-spinner *ngIf="loading" diameter="24" mode="indeterminate"></mat-progress-spinner>
        </div>
      </form>
    </mat-card>
  </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) {}

  /**
   * onSubmit
   * Called when the login form is submitted.
   * - Shows the spinner by setting loading = true
   * - Calls AuthService.login which simulates an async request
   * - On success navigates to /poolcar; on failure shows a snackbar message
   */
  onSubmit() {
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (ok) => {
        this.loading = false;
        if (ok) {
          // Successful login -> navigate to the poolcar list
          this.router.navigate(['/poolcar']);
        } else {
          // Invalid credentials -> inform user
          this.snack.open('Invalid credentials', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        // Network or internal error -> inform user
        this.loading = false;
        this.snack.open('Login failed', 'Close', { duration: 3000 });
      }
    });
  }
}
