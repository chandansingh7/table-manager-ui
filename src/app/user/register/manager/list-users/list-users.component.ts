import { Component, OnInit, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { User } from '../../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { isPlatformBrowser } from '@angular/common';  // Import isPlatformBrowser

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSortModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['select', 'username', 'email', 'role'];
  selectedUser: User | null = null;
  filterValues: { [key: string]: string } = {};

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userForm = this.fb.group({
      userSelection: new FormControl(null)
    });
  }

  ngOnInit() {
    this.getUsers();  // Fetch users from backend
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.dataSource.data = this.users;
        this.dataSource.filterPredicate = this.customFilterPredicate();

        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Row Selection Handler for radio button
  onSelectRow(user: User): void {
    this.selectedUser = this.selectedUser === user ? null : user;
  }

  // Apply Filter Logic
  applyFilter(column: string, value: string): void {
    this.filterValues[column] = value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  // Custom Filter Predicate
  customFilterPredicate() {
    return (data: User, filter: string): boolean => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key =>
        (data[key as keyof User]?.toString().toLowerCase() ?? '').includes(filters[key])
      );
    };
  }

  // Handle Pagination Change
  onPaginateChange(event: any): void {

  }

  // Add User Action (for now just an alert)
  addUser(): void {
    alert('Add User clicked');
  }

  // Delete User Action (for now just an alert)
  deleteUser(): void {
    if (this.selectedUser) {
      alert(`Delete user: ${this.selectedUser.username}`);
    }
  }
}
