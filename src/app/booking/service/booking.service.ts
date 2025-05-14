import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation, ReservationSave} from '../models/reservation.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private base = 'http://localhost:8081/api/v1';
  constructor(private http: HttpClient) {}
  listTables() { return this.http.get<{id:number; tableNumber:number}[]>(`${this.base}/tables?status=available`); }

  createReservation(body: ReservationSave): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.base}/reservations`, body);
  }
  listAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.base}/reservations`);
  }
  // patch(id: number, patch: Partial<Reservation>): Observable<Reservation> {
  //   return this.http.patch<Reservation>(`${this.base}/reservations/${id}`, patch);
  // }

  checkIn(id: number): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${this.base}/reservations/${id}/check-in`,
      {}  // no body needed; server flips isCheckedIn & status
    );
  }

  checkOut(id: number): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${this.base}/reservations/${id}/check-out`,
      {}
    );
  }

  cancel(id: number): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${this.base}/reservations/${id}/cancel`,
      {}
    );
  }

  // checkIn (id: number) {return this.patch(id, { isCheckedIn: true,  reservationStatus: 'CONFIRMED' }); }
  // checkOut(id: number) { return this.patch(id, { isCheckedOut: true, reservationStatus: 'COMPLETED' }); }
  // cancel  (id: number) { return this.patch(id, { reservationStatus: 'CANCELLED' }); }
}
