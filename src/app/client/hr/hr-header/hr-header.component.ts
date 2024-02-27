import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-hr-header',
  templateUrl: './hr-header.component.html',
  styleUrl: './hr-header.component.scss'
})
export class HrHeaderComponent implements OnInit{
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