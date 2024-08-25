import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import AuthComponent from './auth/auth.component';
import { ChangeColorComponent } from './change-color/change-color.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,AuthComponent,ChangeColorComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'front-end-crud';
}
