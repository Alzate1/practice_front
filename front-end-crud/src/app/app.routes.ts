import { Routes } from '@angular/router';
import AuthComponent from './auth/auth.component';
import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
{ path: 'auth', component: AuthComponent,title:'Registro de usuario' }, 
//
{
  path:'',
  loadComponent:()=>import('./login/login.component').then(c=>c.LoginComponent), 
  title:'Inicio de sesión'
},

{ path: '', redirectTo: '/login', pathMatch: 'full' },

{path:'dashboard',
loadComponent: ()=>import('./dashboard/dashboard.component'),
children:[
  {
    path:'home',
    title:'Inicio',
    data:{ icon: 'bi bi-house' },
    loadComponent: ()=>import('./dashboard/home/home.component'),
  },
  {
    path:'users',
    title:'Usuarios',
    data: { icon: 'bi bi-people' },
    loadComponent: ()=>import('./dashboard/users/users.component'),
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
]
},


];
