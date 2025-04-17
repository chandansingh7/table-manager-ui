import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}
  logout(): void {
    localStorage.removeItem('token'); // Clear token
    this.router.navigate(['/login']);
  }
}
