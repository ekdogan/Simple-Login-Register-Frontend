import {Component, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-drawer',
  templateUrl: 'drawer.html',
  styleUrl: 'drawer.css',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule],
})
export class Drawer {
  
  showFiller = signal(false);
}

