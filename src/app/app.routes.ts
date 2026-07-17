import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Layout } from './layout/layout';
import {Page} from './page/page'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'layout', component: Layout },
  {path: 'headerlayout', loadComponent: () => import('./headerlayout/headerlayout').then((c) => c.SidenavResponsiveExample)},
  {path: 'table', loadComponent: () => import('./table/table').then((c) => c.TablePaginationExample)},
  {path:'page', component: Page}
];
