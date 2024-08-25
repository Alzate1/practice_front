import { Component } from '@angular/core';
import { FormGroup,FormControl, ReactiveFormsModule,Validators  } from '@angular/forms';
import { RouterModule,RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './login.component.html',
  styles:  ''
})
export class LoginComponent {
  login = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(): void {
    const formValues = this.login.value;
    const username = formValues.username
    const password = formValues.password
    if (username=='' || username==null) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debes ingresar tu usuario",
        showConfirmButton: true,
        timer: 1500
      })

    }if(password==''|| password==null){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debes ingresar tu Contraseña",
        showConfirmButton: true,
        timer: 1500
      })
    }
    else{
      this.loginService.accessUser(username, password).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Inicio de registro correcto",
            showConfirmButton: false,
            timer: 1500
          }).then(()=> {
            this.router.navigate(['dashboard']);
          })
        },error => {
          const errorMessage = error.error.message || 'Error desconocido'
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error de Inicio de sesión',
            html:`<strong>${errorMessage} <i class='bi bi-ban' style='color:red;'></i>.</strong>`,
            showConfirmButton: true,
          }).then(function(){

            Swal.fire({
              position: 'center',
              icon: 'info',
              title: 'Comunicarse con el administrador',
              text:'El admin no te ha dado acceso a la plataforma',
              showConfirmButton: true,
            })

          })
           console.error('Error en el inicio de sesión', errorMessage);
        }
      );
    }


  }
}
