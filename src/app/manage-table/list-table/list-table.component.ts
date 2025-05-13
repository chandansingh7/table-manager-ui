import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ReserveTable} from '../modules/reservetable.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TableService} from '../table-service/table-service.service';
import {EditTableDialogComponent} from './edit-table-dialog/edit-table-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-list-table',
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
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss'
})
export class ListTableComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tables: ReserveTable[] = [];
  dataSource = new MatTableDataSource<ReserveTable>();
  displayedColumns: string[] = ['select', 'tableNumber', 'capacity','pph', 'status'];
  selectedTable: ReserveTable | null = null;
  filterValues: { [key: string]: string } = {};

  tableForm!: FormGroup;

  constructor(
    private readonly tableService: TableService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTables();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSelectRow(table: ReserveTable): void {
    this.selectedTable = this.selectedTable === table ? null : table;
  }

  applyFilter(column: string, value: string): void {
    this.filterValues[column] = value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  customFilterPredicate() {
    return (data: ReserveTable, filter: string): boolean => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key =>
        (data[key as keyof ReserveTable]?.toString().toLowerCase() ?? '').includes(filters[key])
      );
    };
  }

  onPaginateChange(event: any): void {

  }

  editTable(selectedTable: ReserveTable | null) {
    if (!selectedTable) return;
    const dialogRef = this.dialog.open(EditTableDialogComponent, {
      width: '500px',
      panelClass: 'edit-user-dialog',
      data: { ...selectedTable }
    });

    dialogRef.afterClosed().subscribe((updateTable: ReserveTable | undefined) => {
      if (updateTable) {
        this.tableService.updateTable(updateTable).subscribe({
          next: () => {
            this.getTables();
            this.snackBar.open('Table Update successful!', 'Close', {duration: 3000});
          },
          error: (error: HttpErrorResponse) => {
            const errorMessage = error.error?.error || 'Updating failed. Try again.';
            this.snackBar.open(errorMessage, 'Close', {duration: 3000});
          }
        });
      }
    });
  }

  deleteUser() {

  }

  getTables(): void {
    this.tableService.getTables().subscribe(
      (tables: ReserveTable[]) => {
        this.tables = tables;
        console.log(this.tables)
        this.dataSource.data = this.tables;
        this.dataSource.filterPredicate = this.customFilterPredicate();

        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
