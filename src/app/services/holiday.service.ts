import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) { }

  apiurl="http://localhost:3000/holidays"; 
  getdata(){
    return this.http.get<any>(this.apiurl);
    

  }
  
  postdata(holiday:any){
    return this.http.post<any>(this.apiurl, holiday);

  }
  
  update( holiday:any,id:any){
    return this.http.put<any>(`${this.apiurl}/${id}`, holiday);


  }
  
  delete(id:any){
    return this.http.delete<any>(`${this.apiurl}/${id}`);

  }
}
