import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService, User } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poolcar',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatFormFieldModule, MatInputModule],
  template: `
  <div style="padding:1rem;">
    <mat-card>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <h2>Poolcar - Available Users</h2>
        <button mat-stroked-button color="warn" (click)="logout()">Logout</button>
      </div>

      <!-- Search input filters table by name -->
      <div style="margin:12px 0; display:flex; gap:8px; align-items:center;">
        <mat-form-field appearance="outline" style="flex:1;">
          <mat-label>Search by name</mat-label>
          <input matInput (input)="applyFilter($any($event.target).value)" placeholder="Enter name" />
        </mat-form-field>
      </div>

      <div *ngIf="loading" style="display:flex;justify-content:center;padding:2rem;">
        <mat-progress-spinner diameter="48" mode="indeterminate"></mat-progress-spinner>
      </div>

      <table mat-table [dataSource]="filteredUsers" *ngIf="!loading">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let row"> {{row.id}} </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let row"> {{row.name}} </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let row"> {{row.email}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  </div>
  `,
})
export class PoolcarComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  displayedColumns = ['id', 'name', 'email'];
  constructor(private api: ApiService, private snack: MatSnackBar, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Load user list when component mounts
    this.load();
  }

  /**
   * load
   * Fetch users from the ApiService. While the request is in-flight the loading flag
   * toggles a spinner in the template. Errors are shown with MatSnackBar.
   */
  load() {
    this.loading = true;
    this.api.getUsers().subscribe({
      next: (data) => {
        this.users = data; // populate the Material table dataSource
        // Initialize filtered list to full data set
        this.filteredUsers = [...this.users];
        this.loading = false;
      },
      error: (err) => {
        // Hide spinner and show an error message for the user
        this.loading = false;
        this.snack.open(err?.message || 'Failed to load users', 'Close', { duration: 4000 });
      }
    });
  }

  /**
   * applyFilter
   * Filter users by name (case-insensitive). Called on input event from the search field.
   */
  applyFilter(value: string) {
    const q = (value || '').trim().toLowerCase();
    if (!q) {
      this.filteredUsers = [...this.users];
      return;
    }
    this.filteredUsers = this.users.filter(u => (u.name || '').toLowerCase().includes(q));
  }

  /**
   * logout
   * Clears authentication state and navigates back to the login page.
   */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
