import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-header',
  templateUrl: './ad-header.component.html',
  styleUrl: './ad-header.component.scss'
})
export class AdHeaderComponent implements OnInit{
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
