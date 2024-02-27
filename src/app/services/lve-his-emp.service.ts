import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LveHisEmpService {

  constructor(private http: HttpClient) { }

  apiurl="http://localhost:3000/leavehistoryemployee"; 
  getdata(){
    return this.http.get<any>(this.apiurl);
    

  }
  
  postdata(data:any){
    return this.http.post<any>(this.apiurl, data);

  }
  
  update( data:any,id:any){
    return this.http.put<any>(`${this.apiurl}/${id}`, data);


  }
  
  delete(id:any){
    return this.http.delete<any>(`${this.apiurl}/${id}`);

  }
}
