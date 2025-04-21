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

import {EditUserDialogComponent} from './edit-user-dialog/edit-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';  // Import isPlatformBrowser

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
    MatPaginatorModule,
    MatDialogModule
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
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      userSelection: new FormControl(null)
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log(this.users)
        this.dataSource.data = this.users;
        this.dataSource.filterPredicate = this.customFilterPredicate();

        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  onSelectRow(user: User): void {
    this.selectedUser = this.selectedUser === user ? null : user;
  }

  applyFilter(column: string, value: string): void {
    this.filterValues[column] = value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  customFilterPredicate() {
    return (data: User, filter: string): boolean => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key =>
        (data[key as keyof User]?.toString().toLowerCase() ?? '').includes(filters[key])
      );
    };
  }

  onPaginateChange(event: any): void {

  }

  editUser(user: User | null): void {
    if (!user) return;
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      panelClass: 'edit-user-dialog',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe((updatedUser: User | undefined) => {
      if (updatedUser) {
        this.userService.updateUsers(updatedUser).subscribe({
          next: () => {
            this.getUsers();
            this.snackBar.open('User Update successful!', 'Close', {duration: 3000});
          },
          error: (error: HttpErrorResponse) => {
            const errorMessage = error.error?.error || 'Updating failed. Try again.';
            this.snackBar.open(errorMessage, 'Close', {duration: 3000});
          }
        });
      }
    });
  }

  // Delete User Action (for now just an alert)
  deleteUser(): void {
    if (this.selectedUser) {
      alert(`Delete user: ${this.selectedUser.username}`);
    }
  }

}
