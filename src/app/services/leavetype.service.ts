import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeavetypeService {

  constructor(private http: HttpClient) { }

  apiurl="http://localhost:3000/leavetype"; 
  getdata(){
    return this.http.get<any>(this.apiurl);
    

  }
  
  postdata(leave_Type:any){
    return this.http.post<any>(this.apiurl, leave_Type);

  }
  
  update( leave_Type:any,id:any){
    return this.http.put<any>(`${this.apiurl}/${id}`, leave_Type);


  }
  
  delete(id:any){
    return this.http.delete<any>(`${this.apiurl}/${id}`);

  }
}
