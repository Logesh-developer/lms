import { Block } from '@angular/compiler';
import { Component , ElementRef, ViewChild,Renderer2} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserConfigService } from '../../services/user-config.service';
declare var $: any;
declare const bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {
  selectedUser: string = '';
  userEmail: string = '';
  password: string = '';
  errorUtype: string = '';
  erroremail: string = '';
  errorpassword: string = '';

  @ViewChild('credentials',{static:false}) credentialsModal!: ElementRef;

  imageSources: { [key: string]: string } = {
    admin: "../../assets/login/icons8-engineer-90.png",
    employee: "../../assets/login/icons8-employee-90.png",
    hr: "../../assets/login/icons8-people-90.png",
    manager: "../../assets/login/icons8-manager-90.png"
  };

  

  constructor(private router: Router,private modalService: NgbModal,private renderer: Renderer2,private userconfig: UserConfigService) {}

  updateUserImage(): void {
    const userImage = document.getElementById("user-image") as HTMLImageElement;
    userImage.src = this.imageSources[this.selectedUser] || "../../assets/login/icons8-customer-90.png";
  }

  userType(): boolean {
    this.errorUtype = '';
    if (this.selectedUser === "") {
      this.errorUtype = "Select a User";
      return false;
    } else {
      this.updateUserImage();
      return true;
    }
  }

  userIDValidation(): boolean {
    this.erroremail = '';
    const userEmail = this.userEmail.trim();
    if (userEmail === "") {
      this.erroremail = "Enter Email ID";
      return false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userEmail)) {
      this.erroremail = "Invalid Email ID";
      return false;
    } else {
      return true;
    }
  }

  validatePassword(): boolean {
    this.errorpassword = '';
    const pwd = this.password.trim();
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

    if (pwd === "") {
      this.errorpassword = "Enter the Password";
      console.log("empty password");
      return false;
    } else if (!pattern.test(pwd)) {
      this.errorpassword = "Invalid Password";
      console.log("invalid password");

      return false;
    } else {
      return true;
    }
  }

  formValidation(form: NgForm): boolean {
    let isValid: boolean = false;
    let targetPage: string = '';
  
    if (this.userIDValidation() && this.validatePassword() && this.userType()) {
      this.userconfig.getdata().subscribe(data => {
        const user = data.find((user: any) => user.email === this.userEmail.trim() && user.password === this.password && user.usertype === this.selectedUser);
        if (user) {
          isValid = true;
          const storedDataString = localStorage.getItem('currentUserArray');
          const currentUserArray = storedDataString ? JSON.parse(storedDataString) : [];
          currentUserArray.push(user);
          localStorage.setItem('currentUserArray', JSON.stringify(currentUserArray));
          targetPage = user.usertype; // Assuming user.usertype holds the target page
          this.router.navigate([targetPage]);
        } else {
          const myModal = new bootstrap.Modal(this.credentialsModal.nativeElement);
          myModal.show();
        }
      });
    } else {
      console.log('Form validation failed');
      return false;
    }
  
    // Ensure a boolean value is always returned
    return isValid;
  }
  
  // showModal() {
  //   const modal = this.credentialsModal.nativeElement as HTMLElement;
  //   this.renderer.setAttribute(modal, 'show', '');
  // }
  // close(){
  //   (this.credentials?.nativeElement as HTMLElement).style.display = 'none';
  //   document.body.classList.remove("modal-open");
  // }
}
