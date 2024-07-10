import { Component } from '@angular/core';
import { FormGroup,FormControl, ReactiveFormsModule,Validators  } from '@angular/forms';
import { RouterModule,RouterLink } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export  class LoginComponent {
  private CorrectUser ='user';
  private CorrectPassword ='12345';
  login = new FormGroup({
    user: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });
  onSubmit(){
    const formValues = this.login.value;
    const user = formValues.user
    const password = formValues.password
    if (user === this.CorrectUser && password === this.CorrectPassword) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inicio de sesión correcto",
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Contraseña o usuario incorrectos",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
