import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../user/models/user.model';
import {Observable} from 'rxjs';
import {ReserveTable} from '../modules/reservetable.model';
import {TableCounts} from '../table-stats/table-stats.component';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private readonly tableUrl = `${environment.apiUrl}/v1/tables`; // Define your backend API URL


  constructor(private readonly http: HttpClient) { }

  registerTable(table: ReserveTable): Observable<any> {
    return this.http.post<any>(`${this.tableUrl}`, table)
  }

  getTables(): Observable<ReserveTable[]> {
    return this.http.get<ReserveTable[]>(`${this.tableUrl}`);
  }

  updateTable(table: ReserveTable): Observable<User> {
    console.log("inservice" + table);
    return this.http.patch<User>(`${this.tableUrl}/${table.id}`, table);
  }

  getCounts(): Observable<TableCounts> {
    return this.http.get<TableCounts>(`${this.tableUrl}/counts`);
  }

}
