import { Component } from "@angular/core";
import { SideMenuComponent } from "../sidemenu/sidemenu.component";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideMenuComponent,RouterOutlet,CommonModule],
  templateUrl: './dashboard.component.html',
  styles: `  #main-content {
    transition: margin-left 0.3s;
  }

  #main-content.expanded {
    margin-left: 70px; /* Margen cuando el sidebar está colapsado */
  }`
})

export default class  DashboardComponent
{
  private isSidebarCollapsed = false;
  ngOnInit(): void {
    const side = document.getElementById('sidebar-wrapper');
    const closeSide = document.getElementById('closeSide');
    const mainContent = document.getElementById('main-content');
    closeSide?.addEventListener('click', () => {
      if (side && mainContent) {
        this.toggleSidebar(side, mainContent);
      }
    });
  }
  private toggleSidebar(side: HTMLElement, mainContent: HTMLElement): void {
    if (this.isSidebarCollapsed) {
      side.classList.remove('collapsed');
      mainContent.classList.remove('expanded');
    } else {
      side.classList.add('collapsed');
      mainContent.classList.add('expanded');
    }
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    console.log('Sidebar toggled');
  }
}
