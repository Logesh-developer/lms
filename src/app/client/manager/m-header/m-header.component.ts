import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-m-header',
  templateUrl: './m-header.component.html',
  styleUrl: './m-header.component.scss'
})
export class MHeaderComponent implements OnInit{
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