import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private apiUrl='http://localhost:3000/users/login';
constructor(private http:HttpClient){

}

    accessUser(username:string, password:string):Observable<any> {
      const data= {username,password}
    return this.http.post<any>(this.apiUrl,data);
   }
}
