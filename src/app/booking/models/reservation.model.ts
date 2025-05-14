export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Reservation {
  id: number;
  userId: number;
  userName: string;
  tableId: number;
  tableNumber: number;
  checkedInTime:  string;
  checkedOutTime: string | null;
  isCheckedIn:  boolean;
  isCheckedOut: boolean;
  reservationStatus: ReservationStatus;
}

export interface ReservationSave {
  userId: number;
  tableId: number;
  checkedInTime: string;
  checkedOutTime: string;
  reservationStatus?: ReservationStatus;
}
