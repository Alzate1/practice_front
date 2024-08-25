import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { UsersInterface } from "../../interfaces/users.interface";
import { TypeuserInterface } from "../../interfaces/typeusers.interface";
import { FormGroup,FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from "sweetalert2";
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styles: ``,
})

export default class  UsersComponent implements OnInit{

  usersList: UsersInterface[]=[]
  typeUserList:TypeuserInterface[]=[]
  userTypesMap: { [key: number]: string } = {};
  selectedUser: any = null;
  userId: number=0;

  constructor (private usersService:UsersService){
  }
  ngOnInit(): void {
    this.getAllUsers()
    this.getAllTypeUsers()
  }
  getAllUsers(){
    this.usersService.getAllUsers().subscribe({
      next:(result)=>{
        this.usersList = result;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
  getAllTypeUsers(){
    this.usersService.getAllTypeUsers().subscribe({
      next:(result)=>{
        this.typeUserList = result;
        this.userTypesMap = result.reduce((acc:{[key:number]:string},type:TypeuserInterface)=>{
          acc[type.id]=type.name;
          return acc;
        },{})
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
  getUserTypeName(usertype_id: number): string {
    return this.userTypesMap[usertype_id] || 'Unknown';
  }

  updateUser = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    usertype_id: new FormControl()
    })
  createUser = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    usertype_id: new FormControl()
    })
    openModal(id:number){
      this.userId=id
      this.usersService.getUser(id).subscribe({
        next: (user)=>{
          this.selectedUser = user;
          this.updateUser.patchValue({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
          });
        },error:(error)=>{
          console.log(error)
        }
      })
    }
    deleteUsers(id: number, username: string) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Estás a punto de eliminar el usuario ${username}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Encuentra el elemento en la lista y añade la clase 'hidden'
          const userIndex = this.usersList.findIndex(user => user.id === id);

          this.usersService.deleteUser(id).subscribe({
            next: (response) => {
              Swal.fire(
                'Eliminado',
                `El usuario ${username} ha sido eliminado.`,
                'success'
              ).then(()=> {
                  this.usersList = this.usersList.filter(user => user.id !== id);
                })
              // Esperar a que termine la animación antes de removerlo de la lista

            },
            error: (error) => {
              Swal.fire(
                'Error',
                `Hubo un problema al eliminar el usuario ${username}.`,
                'error'
              );
              console.error('Error deleting user:', error);
            }
          });
        }
      });
    }

    onSubmit(){
        const updateData = {...this.updateUser.value}
        if(!updateData.password){
          delete updateData.password
        }
      this.usersService.updateUsers(this.userId,this.updateUser.value).subscribe({
        next:(response)=>{
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario Actualizado",
            showConfirmButton: false,
            timer: 1500
          }).then(()=> {
            const index = this.usersList.findIndex(user => user.id === this.userId);
            if (index !== -1) {
              this.usersList[index] = { ...this.usersList[index], ...this.updateUser.value };
            }
             this.updateUser.reset();
          })


        },
        error:(error)=>{
          Swal.fire({
            position: "center",
            icon: "error",
            title: error.error.message || "Error al actualizar usuario",
            showConfirmButton: true,
            timer: 1500
          });
          console.log('Error updating user:', error);
        }
      })
    }

    onCreate(){
      if (!this.createUser.valid) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Todos los campos son obligatorios",
          showConfirmButton: true,
          timer: 1500
        });
        return;

      }
      const userData = this.createUser.value;
    userData.usertype_id = parseInt(userData.usertype_id, 10)
      this.usersService.createUser(this.createUser.value).subscribe({
        next:(response)=>{
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro de Usuario exitoso",
            showConfirmButton: false,
            timer: 1500
          }).then(()=> {
          const newUser = response;
          this.usersList.unshift(newUser);
        // Limpiar el formulario
          this.createUser.reset();
          })
        },error:(error)=>{
          // console.error('Error en el registro', error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error en el registro",
            text: error.error.message || 'Error desconocido',
            showConfirmButton: true
          });
        }

      }



      )
    }

}
