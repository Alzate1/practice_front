import { Routes } from '@angular/router';
import AuthComponent from './auth/auth.component';
export const routes: Routes = [
{ path: 'auth', component: AuthComponent,title:'Registro de usuario' },
{
  path:'',
  loadComponent:()=>import('./login/login.component').then(c=>c.LoginComponent),
  title:'Inicio de sesión'
},
{ path: '', redirectTo: '/login', pathMatch: 'full' }
];
