import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AppComponent
 *
 * Root application shell for the Poolcar demo app.
 * - Hosts the global layout and static placeholder content.
 * - Contains the <router-outlet> where the Login and Poolcar pages are loaded.
 * - This component is intentionally minimal; feature pages are implemented as
 *   standalone components and lazy-loaded via the router.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Application title shown in the placeholder content
  title = 'my-angular-app';
}
