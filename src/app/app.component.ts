import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blogWeb';

  constructor(private router: Router) {}

  
  get isLogged(): boolean {
    return localStorage.getItem('JWT') !== null;
  }

  logout(): void {
    localStorage.removeItem('JWT');
    this.router.navigate(['/login']);
  }

}
