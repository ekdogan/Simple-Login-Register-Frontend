import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'layout', component: Layout },
  /**{path: 'devx-demo-drawer', loadComponent: () => import('./devx-demo-drawer/devx-demo-drawer').then((c) => c.AppComponent)},*/
  {path: 'headerlayout', loadComponent: () => import('./headerlayout/headerlayout').then((c) => c.SidenavResponsiveExample)},
];
