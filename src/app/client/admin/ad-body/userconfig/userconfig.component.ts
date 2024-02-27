import { Component, ViewChild ,OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserConfigService } from '../../../../services/user-config.service';
import { Empinterface } from './empinterface';
import { DomSanitizer } from '@angular/platform-browser';
import { DataTablesModule} from 'angular-datatables';
import { Subject } from 'rxjs';


declare var $:any;

@Component({
  selector: 'app-userconfig',
  templateUrl: './userconfig.component.html',
  styleUrl: './userconfig.component.scss'
})
export class UserconfigComponent  implements OnInit {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  userform!:FormGroup;
  EmpinterfaceObj: Empinterface = new Empinterface();
  adminData !: any;
  empData:any;
  empdata:any[]=[];
  bool:boolean=false;
  selectedEmployee: any;
  isCreateMode: boolean = true;
  

  constructor(private userconfig:UserConfigService, private _toast:ToastrService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { }

  sanitizeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType:"simple",
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel',
        'csv'
      ]
    };
    this.userform = this.formBuilder.group({
      profilepic: ['', [Validators.required, Validators.pattern('^(http|https):\\/\\/[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,}(?:\\/[^/\\s]*)*$')]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Ecode: ['', Validators.required],
      usertype: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      department: ['', Validators.required],
      manager: ['', Validators.required]
    });
    this.bool = true;
    this.getAllEmployee();


   }

   ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

   getAllEmployee() {
    
    this.userconfig.getdata().subscribe(
      (res: any[]) => {
        this.empdata = res;
        this.dtTrigger.next(null);
        
      },
      err => {
        // console.error("Error fetching employee data:", err);
        this._toast.error("Error fetching Employee data","Error");
      }
    );
  }
  postEmployeeDetails() {
    // Check if the form is valid
    if (this.userform.valid) {
        // Assign form values to EmpinterfaceObj
        this.EmpinterfaceObj.profilepic = this.userform.value.profilepic;
        this.EmpinterfaceObj.usertype = this.userform.value.usertype;
        this.EmpinterfaceObj.firstname = this.userform.value.firstname;
        this.EmpinterfaceObj.lastname = this.userform.value.lastname;
        this.EmpinterfaceObj.Ecode = this.userform.value.Ecode;
        this.EmpinterfaceObj.email = this.userform.value.email;
        this.EmpinterfaceObj.password = this.userform.value.password;
        this.EmpinterfaceObj.department = this.userform.value.department;
        this.EmpinterfaceObj.manager = this.userform.value.manager;

        // Post the data
        this.userconfig.postdata(this.EmpinterfaceObj)
            .subscribe(
                res => {
                    // alert("leave application successfully done");
                    this._toast.success("Employee added successfully","success");
                    this.getAllEmployee();
                    this.userform.reset();
                    this.isCreateMode = true;
                },
                err => {
                    // alert("Error adding employee: " + err.message);
                    this._toast.error("Error adding Employee","Error");

                }
            );
    } else {
        // If the form is invalid, display an error message or handle it as per your requirement
        alert("Form is invalid. Please fix the errors before submitting.");
    }
}

setSelectedEmployee(employee: any) {
  this.selectedEmployee = employee;
}

  deleteEmployee(employee: any) {
    console.log(employee);
    this.userconfig.delete(employee.id)
        .subscribe(
            res => {
                // alert("Employee deleted successfully");
                this._toast.success("Employee deleted successfully","success");
                this.getAllEmployee();
            },
            err => {
                // console.error("Error deleting employee:", err);
                this._toast.error("Error deleting Employee","Error");
            }
        );
  }

  editEmployee(index: number, employee: any) {
    this.selectedEmployee = employee.id; // Set the selected employee ID
    this.userform.patchValue({
        id: employee.id,
        usertype: employee.usertype,
        profilepic: employee.profilepic,
        Ecode: employee.Ecode,
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email,
        password: employee.password,
        department: employee.department,
        manager: employee.manager
    });
    this.isCreateMode = false;
  }

  updateEmployee() {
    this.userconfig.update(this.userform.value, this.selectedEmployee)
        .subscribe(
            res => {
                // alert("Employee updated successfully");
                this._toast.success("Employee updated successfully ","success");
                this.getAllEmployee(); // Ensure this fetches the updated data
                this.userform.reset(); // Reset the form after updating
            },
            err => {
                alert("Error updating employee: " + err.message);
                this._toast.error("Error Updating Employee","Error");
            }
        );
}

// formvalidation
validateFirstName() {
  const firstNameInput = this.userform.get('firstname');
  const firstNameError: any = document.getElementById('firstNameError');
  const firstNameRegex = /^[a-zA-Z\s]+$/;

  if (!firstNameInput?.value) {
    // If the field is empty, clear the error message
    firstNameError.textContent = '';
  } else if (!firstNameRegex.test(firstNameInput?.value)) {
    // If the field is not empty but doesn't match the regex, show an error
    firstNameError.textContent = 'First Name should only contain alphabets and whitespaces.';
    this.userform.setErrors({ 'invalid': true });
  } else {
    // If the field is not empty and matches the regex, clear the error message
    firstNameError.textContent = '';
  }
}

validateLastName() {
  const lastNameInput = this.userform.get('lastname');
  const lastNameError: any = document.getElementById('lastNameError');
  const lastNameRegex = /^[a-zA-Z\s]+$/;

  if (!lastNameInput?.value) {
    // If the field is empty, clear the error message
    lastNameError.textContent = '';
  } else if (!lastNameRegex.test(lastNameInput?.value)) {
    // If the field is not empty but doesn't match the regex, show an error
    lastNameError.textContent = 'Last Name should only contain alphabets and whitespaces.';
    this.userform.setErrors({ 'invalid': true });
  } else {
    // If the field is not empty and matches the regex, clear the error message
    lastNameError.textContent = '';
  }
}

validateEmail() {
  const emailInput =  this.userform.get('email');
  const emailError :any= document.getElementById('emailError');
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailInput?.value) {
    // If the input field is null, do nothing
    emailError!.textContent = '';
  }
  else if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Enter a valid email address.<br>Example: example@example.com';
    this.userform.setErrors({ 'invalid': true });
  } else {
    emailError.textContent = '';
  }
}


validatePassword(){
  const passwordInput = this.userform.get('password');
  const passwordError = document.getElementById('passwordError');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordInput?.value) {
    passwordError!.textContent = '';
  } else if (!passwordRegex.test(passwordInput?.value)) {
    passwordError!.textContent = 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.';
    this.userform.setErrors({ 'invalid': true });
  } else {
    passwordError!.textContent = '';
  }
}

validateConfirmPassword() {
  const confirmPasswordInput = this.userform.get('confirmPassword');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  const passwordInput = this.userform.get('password');

  if (!confirmPasswordInput?.value) {
    confirmPasswordError!.textContent = '';
  } else if (confirmPasswordInput?.value !== passwordInput?.value) {
    confirmPasswordError!.textContent = 'Passwords do not match.';
    this.userform.setErrors({ 'invalid': true });
  } else {
    confirmPasswordError!.textContent = '';
  }
}

validateManagerName() {
  const managerNameInput = this.userform.get('manager');
  const managerNameError :any = document.getElementById('managerNameError');
  const managerNameRegex = /^[a-zA-Z\s]+$/;
  if (! managerNameInput?.value) {
    managerNameError!.textContent = '';
  }
  else if (!managerNameRegex.test(managerNameInput.value)) {
    managerNameError.textContent = 'Manager Name should only contain alphabets and whitespaces.';
    this.userform.setErrors({ 'invalid': true });
  } else {
    managerNameError.textContent = '';
  }
}







 


  
}


