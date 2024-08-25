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
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl()
    })
    constructor(private auth: AuthService,
      private router: Router,
    ){}
    onSubmit ():void{

    if (!this.authUser.valid) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Todos los campos son obligatorios",
        showConfirmButton: true,
        timer: 1500
      });
      return;

    }
    this.auth.createUser(this.authUser.value).subscribe(response=>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registro de Usuario exitoso",
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        this.router.navigate(['']);
      })
    },error=>{
      // console.error('Error en el registro', error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en el registro",
        text: error.error.message || 'Error desconocido',
        showConfirmButton: true
      });
    }



    )

}
}
