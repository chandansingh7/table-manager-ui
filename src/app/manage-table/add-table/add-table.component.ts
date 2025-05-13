import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TableService} from '../table-service/table-service.service';
import {Statuses} from '../modules/status.enum';
import {UserRole} from '../../user/models/role.enum';
import {User} from '../../user/models/user.model';
import {ReserveTable} from '../modules/reservetable.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-table',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.scss'
})
export class AddTableComponent {

  registerTableForm: FormGroup;

  statuses = Object.values(Statuses).map(status => ({
    value: status,
    label: this.formatStatusLabel(status)
  }));
  constructor(private readonly fb: FormBuilder,
              private readonly tableService: TableService,
              private readonly router: Router,
              private readonly snackBar: MatSnackBar) {
    this.registerTableForm = this.fb.group({
      tableNumber: ['', Validators.required],
      capacity: ['', Validators.required],
      status: ['', Validators.required],
      pph: ['', Validators.required]
    });
  }

  private formatStatusLabel(role: string): string {
    return role
      .replace('', '')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  }


  onSubmit() {
    if (this.registerTableForm.valid) {
      const tableData: ReserveTable = this.registerTableForm.value;

      this.tableService.registerTable(tableData).subscribe({
        next: () => {
          this.snackBar.open('Table Registered successful!', 'Close', {duration: 3000});
          this.registerTableForm.reset();
          this.registerTableForm.clearValidators();
          Object.values(this.registerTableForm.controls).forEach(ctrl => {
            ctrl.clearValidators();                  // removes control-level validators
            ctrl.updateValueAndValidity({ emitEvent: false });
          });
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = error.error?.error || 'Table Registration failed. Try again.';
          this.snackBar.open(errorMessage, 'Close', {duration: 3000});
        }
      });

    }
  }

  protected readonly Statuses = Statuses;
}
