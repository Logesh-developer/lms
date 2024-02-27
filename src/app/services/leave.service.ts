import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  apiurl="http://localhost:3000/leavedata"; 
  getdata(){
    return this.http.get<any>(this.apiurl);
    

  }
  
  postdata(leave_d:any){
    return this.http.post<any>(this.apiurl, leave_d);

  }
  
  update( leave_d:any,id:any){
    return this.http.put<any>(`${this.apiurl}/${id}`, leave_d);


  }
  
  delete(id:any){
    return this.http.delete<any>(`${this.apiurl}/${id}`);

  }
}
