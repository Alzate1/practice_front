import { Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-change-color',
  standalone: true,
  imports: [],
  templateUrl: './change-color.component.html',
  styles: ``
})
export class ChangeColorComponent {
  constructor(private renderer: Renderer2) {}

  changeColorLigth(){
    const body = document.body;
    const formElement = document.querySelector('.formLogAuth');
    this.renderer.removeClass(body, 'dark-mode');
    this.renderer.addClass(body, 'light-mode');

    this.renderer.removeClass(formElement, 'darkForm');
    this.renderer.addClass(formElement, 'lightForm');
  }
  changeColorDark() {
    const body = document.body;
    const formElement = document.querySelector('.formLogAuth');
      this.renderer.removeClass(body, 'light-mode');
      this.renderer.addClass(body, 'dark-mode');

      this.renderer.removeClass(formElement, 'lightForm');
      this.renderer.addClass(formElement, 'darkForm');
  }
}
