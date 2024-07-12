import { Component } from '@angular/core';
import { FormGroup,FormControl, ReactiveFormsModule,Validators  } from '@angular/forms';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export  default class  AuthComponent {
  authUser = new FormGroup({
    first_name : new FormControl(),
    last_name :new FormControl(),
    username :new FormControl(),
    password :new FormControl()
    })
    constructor(private auth: AuthService,
      private router: Router,
    ){}
    onSubmit ():void{
    const formValues = this.authUser.value;
    const first_name  = formValues.first_name;
    const last_name = formValues.first_name;
    const username = formValues.username
    const password = formValues.password
    if (first_name == null || first_name=='') {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debes de llenar el campo de Nombre",
        showConfirmButton: false,
        timer: 1500
      })

    }else{
      this.auth.createUser(this.authUser.value).subscribe(response=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Inicio de sesión correcto",
          showConfirmButton: false,
          timer: 1500
        }).then(()=> {
          this.router.navigate(['']);
        })
      },error=>{
        console.error('Erro Faltan datos necesarios en el cuerpo de la solicitud', error);
      }
    )
    }

    }
}
