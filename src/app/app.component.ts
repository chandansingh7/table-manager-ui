import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StorageService} from './user/service/storage.service';
import {NavbarComponent} from './common/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  title = 'table-manager-ui';
}
