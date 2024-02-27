import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  get_team_util_info(){
    return this.http.get("http://localhost:3000/teamleaveutilization");
  }

  get_team_trend_info(){
    return this.http.get("http://localhost:3000/teamleavetrends");
  }
}
