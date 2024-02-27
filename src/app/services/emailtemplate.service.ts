import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailtemplateService {

  constructor(private http: HttpClient) { }

  apiurl="http://localhost:3000/emailtemplate"; 
  getdata(){
    return this.http.get<any>(this.apiurl);
    

  }
  
  postdata(E_template:any){
    return this.http.post<any>(this.apiurl, E_template);

  }
  
  update( E_template:any,id:any){
    return this.http.put<any>(`${this.apiurl}/${id}`, E_template);


  }
  
  delete(id:any){
    return this.http.delete<any>(`${this.apiurl}/${id}`);

  }
}
