import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private apiUrl='http://localhost:3000/users';

private typeUsersUrl='http://localhost:3000/users/typeUsers';

constructor(private http:HttpClient){

}

  getAllUsers():Observable<any> {
    return this.http.get(this.apiUrl).pipe(res=>res);
   }
   getAllTypeUsers():Observable<any> {
    return this.http.get(this.typeUsersUrl).pipe(res=>res);
   }
   getUser(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(res=>res);
   }
   updateUsers(id:number,data:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,data).pipe(
      catchError((error) => {
        throw error;
      })
    );

   }
   deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(res=>res);
   }
   createUser(data:any):Observable<any> {
    return this.http.post<any>(this.apiUrl,data);
   }

}
