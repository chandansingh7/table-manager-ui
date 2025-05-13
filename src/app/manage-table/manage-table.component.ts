import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-manage-table',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './manage-table.component.html',
  styleUrl: './manage-table.component.scss'
})
export class ManageTableComponent {

}
