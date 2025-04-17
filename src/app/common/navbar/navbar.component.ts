import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  dropdownOpen = false;
  ngOnInit() {
    console.log("nav barloaded")
  }

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    return isBrowser ? !!localStorage.getItem('token') : false;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    localStorage.removeItem('token'); // Clear token
    this.router.navigate(['/login']);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.dropdownOpen = false;
    }
  }
}
