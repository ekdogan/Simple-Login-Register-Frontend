import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TablePaginationExample } from "../table/table";
import { AuthService } from '../authservice';

@Component({
  selector: 'page',
  templateUrl: 'page.html',
  styleUrl: 'page.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    TablePaginationExample,
  ],
})
export class Page implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService); 

  protected readonly fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  protected readonly isMobile = signal(true);
  protected readonly isNightMode = signal(false);

  isNightModeEnabled(): boolean {
    return this.isNightMode();
  }

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onClickNavItem(item: string): void {
    if (Number(item.split(' ')[2]) % 2 === 0) {
      this.router.navigate([`/headerlayout`]);
    } else {
      this.router.navigate([`/page`]);
    }
  }

  onClickLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleNightMode(): void {
    this.isNightMode.update(value => !value);
  }
}