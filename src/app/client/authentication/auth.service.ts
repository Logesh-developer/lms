import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: any;
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/User_config');
  }

  setLoggedInUser(user: any) {
    this.loggedInUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString !== null) {
        return JSON.parse(currentUserString) as User;
    } else {
        return null;
    }
}

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.getLoggedInUser() !== null;
  }
}

interface User {
  id: string;
  username: string;
  // Add more properties as needed
}

