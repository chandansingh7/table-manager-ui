import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Reservation, ReservationSave} from '../models/reservation.model';
import {BookingService} from '../service/booking.service';
import {ReserveTable} from '../../manage-table/modules/reservetable.model';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {UserService} from '../../user/service/user.service';
import {User} from '../../user/models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-booking',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss'
})
export class AddBookingComponent implements OnInit{

  form: FormGroup;

  users$!: Observable<User[]>;   // assigned in ctor
  private readonly tablesSub = new BehaviorSubject<ReserveTable[]>([]);
  readonly tables$ = this.tablesSub.asObservable();

  private readonly resSub = new BehaviorSubject<Reservation[]>([]);
  readonly active$  = this.resSub.pipe(
    map(r => r.filter(x => x.reservationStatus === 'PENDING'   ||
      x.reservationStatus === 'CONFIRMED')));

  readonly history$ = this.resSub.pipe(
    map(r => r.filter(x => x.reservationStatus === 'COMPLETED' ||
      x.reservationStatus === 'CANCELLED')));

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: BookingService,
    private readonly userApi: UserService,
    private readonly snackBar: MatSnackBar
  ) {

    this.form = this.fb.group({
      userId:  [null, Validators.required],
      tableId: [null, Validators.required],
      checkInDate: [null, Validators.required],
      checkOutDate: [null],
      inTime:  ['19:00', Validators.required],
      outTime: ['21:00']
    });

    this.users$ = this.userApi.getUsers();
  }


  checkIn(id: number) {
    this.api.checkIn(id).subscribe(() => this.reload());
  }
  checkOut(id: number) { this.api.checkOut(id).subscribe(() => this.reload()); }
  cancel  (id: number) { this.api.cancel(id)  .subscribe(() => this.reload()); }

  ngOnInit(): void { this.reload(); }

  book(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {
      userId,
      tableId,
      checkInDate,
      checkOutDate,
      inTime,
      outTime
    } = this.form.value;

    // Format the Date objects as 'YYYY-MM-DD'
    const inDateStr  = (checkInDate as Date).toISOString().slice(0, 10);
    const outDateStr = (checkOutDate as Date).toISOString().slice(0, 10);

    const checkedInTime  = `${inDateStr}T${inTime}:00`;
    const checkedOutTime = `${outDateStr}T${outTime}:00`;

    const body: ReservationSave = {
      userId,
      tableId,
      checkedInTime,
      checkedOutTime,
      reservationStatus: 'PENDING'
    };

    console.log(body);
    // this.api.createReservation(body).subscribe(() => {
    //
    //   this.reload();
    // });

    this.api.createReservation(body).subscribe({
      next: () => {

        this.reload();
        this.snackBar.open('Table Registered successful!', 'Close', {duration: 3000});
        this.form.reset();
        this.form.clearValidators();
        Object.values(this.form.controls).forEach(ctrl => {
          ctrl.clearValidators();
          ctrl.updateValueAndValidity({ emitEvent: false });
        });
        this.form.reset({ inTime: '19:00', outTime: '21:00' });
      },
      error: (err: HttpErrorResponse) => {
        let msg = 'Unknown error';
        if (err.error && typeof err.error === 'object' && 'error' in err.error) {
          msg = (err.error as any).error;
        } else if (err.message) {
          msg = err.message;
        }
        this.snackBar.open(`Booking failed: ${msg}`, 'Close', {duration: 3000});
      }
    });
  }
  // private reload(): void {
  //   combineLatest([
  //     this.api.listAll(),
  //     this.api.listTables(),
  //     this.userApi.getUsers()
  //   ])
  //     .subscribe(([reservations, rawTables]) => {
  //
  //       this.resSub.next(reservations);
  //
  //       const tables: ReserveTable[] = rawTables.map(rt => ({
  //         id:          rt.id,
  //         tableNumber: rt.tableNumber,
  //         capacity:    (rt as any).capacity ?? 0,
  //         status:      (rt as any).status   ?? 'AVAILABLE'
  //       }));
  //
  //       this.tablesSub.next(tables);
  //     });
  // }
  private reload(): void {
    combineLatest([
      this.api.listAll(),      // Observable<Reservation[]>
      this.api.listTables(),   // Observable<{id:number; tableNumber:number}[]>
      this.userApi.getUsers()     // Observable<{id?:string; name:string}[]>
    ])
      .subscribe(([reservations, rawTables, users]) => {
        // Build a Map<string, string> for users
        const userMap = new Map<string,string>(
          users
            .filter(u => u.id != null)             // skip undefined ids
            .map(u => [ String(u.id), u.username ] as [string,string])
        );

        // Build a Map<number, number> for tables
        const tableMap = new Map<number,number>(
          rawTables.map(t => [ t.id, t.tableNumber ] as [number,number])
        );

        // Decorate each reservation with userName & tableNumber
        const decorated = reservations.map(r => ({
          ...r,
          userName:    userMap.get(String(r.userId))    ?? 'Unknown User',
          tableNumber: tableMap.get(r.tableId)          ?? -1
        }));

        // Push into your streams
        this.resSub.next(decorated);
        this.tablesSub.next(rawTables);
      });
  }


}
