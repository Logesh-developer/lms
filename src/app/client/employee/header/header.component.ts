import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  currentUserArray: any[] = []; // Define a variable to hold the current user details

  constructor() { }

  ngOnInit(): void {
    const currentUserArrayString = localStorage.getItem('currentUserArray');
    if (currentUserArrayString) {
      this.currentUserArray = JSON.parse(currentUserArrayString);
    }
  }
  logout(): void {
    localStorage.clear(); // Clear all data stored in localStorage
  }
}
