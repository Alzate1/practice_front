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
    const username = formValues['first_name'];
    const password = formValues['first_name'];
    const user = formValues.user
    const password = formValues.password
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
        console.error('Error creating user', error);
      }
    )
    }
}
