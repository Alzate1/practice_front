import { Component } from "@angular/core";
import { routes } from "../app.routes";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrl:  './sidemenu.component.css'
})
export class SideMenuComponent {
  public menuItems = routes
  .map((route) => route.children ?? [])
  .flat()
  .filter((route) => route && route.path)
  .filter((route) => !route.path?.includes(':'));

}
