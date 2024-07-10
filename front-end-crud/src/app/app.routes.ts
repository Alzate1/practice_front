import { Routes } from '@angular/router';
import AuthComponent from './auth/auth.component';
export const routes: Routes = [
// {
//   path:'auth',
//   title:'Registro de usuario',
//   loadComponent:()=>import('./auth/auth.component')

// },
// {
//   path:'',
//   redirectTo:'login',
//   loadComponent:()=>import('./login/login.component').then(c=>c.LoginComponent)
// },
{ path: 'auth', component: AuthComponent,title:'Registro de usuario' },
// { path: 'login', component: LoginComponent },
{
  path:'',
  loadComponent:()=>import('./login/login.component').then(c=>c.LoginComponent),
  title:'Registro de usuario'
  // pathMatch :'full',
}
];
