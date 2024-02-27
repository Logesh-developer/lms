import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  constructor(private http: HttpClient) { }

  apiurl="http://localhost:3000/User_config"; 
  getdata(){
    return this.http.get<any>(this.apiurl);
  }
  
  postdata(User_config:any){
    return this.http.post<any>(this.apiurl, User_config);

  }
  
  update( User_config:any,id:any){
    return this.http.put<any>(`${this.apiurl}/${id}`, User_config);


  }
  
  delete(id:any){
    return this.http.delete<any>(`${this.apiurl}/${id}`);

  }

}
