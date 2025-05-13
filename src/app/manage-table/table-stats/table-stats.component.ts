import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableService} from '../table-service/table-service.service';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {Observable, take} from 'rxjs';

export interface TableCounts {
  available: number;
  booked: number;
  occupied: number;
  closed: number;
  total: number;
}

interface Tile {
  label: string;
  icon:  string;
  color: 'primary' | 'accent' | 'warn' | 'neutral';
  count: number;
}


@Component({
  selector: 'app-table-stats',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './table-stats.component.html',
  styleUrl: './table-stats.component.scss'
})
export class TableStatsComponent implements OnInit{

  tiles: { label: string; icon: string; color: string; count: number }[] = [];
  counts$!: Observable<TableCounts>;

  constructor(private tableService: TableService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tableService.getCounts()
      .pipe(take(1))                          // auto-unsubscribe
      .subscribe((c: TableCounts) => {
        /* build the cards */
        this.tiles = [
          { label: 'Total Tables', icon: 'table_restaurant', color: 'neutral',  count: c.total     },
          { label: 'Available',    icon: 'check_circle',     color: 'primary',  count: c.available },
          { label: 'Reserved',     icon: 'event_seat',       color: 'accent',   count: c.booked  },
          { label: 'Occupied',      icon: 'eco',   color: 'success',  count: c.occupied   },
          { label: 'Closed',       icon: 'close',            color: 'warn',     count: c.closed    },
        ];

        /* tell Angular to refresh if you use OnPush */
        this.cdr.markForCheck();
      });
  }
}
