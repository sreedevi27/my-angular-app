import { Routes } from '@angular/router';

/**
 * Application routes
 * - '' redirects to /login
 * - /login loads the standalone LoginComponent
 * - /poolcar loads the main PoolcarComponent (list of users)
 *
 * Both components are lazy-loaded as standalone components via loadComponent.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () => import('./components/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'poolcar',
    loadComponent: () => import('./components/poolcar.component').then(m => m.PoolcarComponent)
  }
];
