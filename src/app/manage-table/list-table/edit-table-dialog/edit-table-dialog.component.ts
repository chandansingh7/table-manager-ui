import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Statuses} from '../../modules/status.enum';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-edit-table-dialog',
  imports: [
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './edit-table-dialog.component.html',
  styleUrl: './edit-table-dialog.component.scss'
})
export class EditTableDialogComponent {

  tableStatus: string[];
  tableForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tableForm = this.fb.group({
      id: [data.id, Validators.required],
      tableNumber: [data.tableNumber, Validators.required],
      capacity: [data.capacity, Validators.required],
      status: [data.status, Validators.required],
      pph: [data.pph, Validators.required]
    });

    this.tableStatus = Object.values(Statuses);
  }

  submit() {
    if (this.tableForm.valid) {
      this.dialogRef.close(this.tableForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
