import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl='http://localhost:3000/users';
constructor(private http:HttpClient){

}

  createUser(data:any):Observable<any> {
    return this.http.post(this.apiUrl,data);
   }
}
