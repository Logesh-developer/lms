import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailtemplateService } from '../../../../../services/emailtemplate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conf-email-template',
  templateUrl: './conf-email-template.component.html',
  styleUrl: './conf-email-template.component.scss'
})
export class ConfEmailTemplateComponent {
  emailTemplateForm!: FormGroup;
  Emailtemp_data:any[]=[];
  department_data:any[]=[];
  emailtempobj:emailtempinterface=new emailtempinterface();
  isCreateMode: boolean = true;
  selectedtemplate:any;
  constructor(private formBuilder: FormBuilder, private E_temp:EmailtemplateService,private _toast:ToastrService) { }
  ngOnInit(): void {
    this.emailTemplateForm = this.formBuilder.group({
      templatename: ['', Validators.required],
      department: ['All'],
      subject: ['', Validators.required],
      body: ['', Validators.required]
  });
  this.getemailtemplate();

  }
  // submitForm() {
  //   if (this.emailTemplateForm.valid) {
  //     // Form submission logic
  //     this.getemailtemplate();
  //     this.emailTemplateForm.reset();
  //   }
  // }
  
  resetForm() {
    this.emailTemplateForm.reset();
  }
  getemailtemplate() {
    this.E_temp.getdata().subscribe(
      (res: any[]) => {
        this.Emailtemp_data = res;
      },
      err => {
        // console.error("Error fetching holiday data:", err);
        this._toast.error("Error fetching template data","Error");
      }
    );
  }

  postEmailTemplate() {
    if (this.emailTemplateForm.valid) {
      // Ensure the correct property names are set
      this.emailtempobj.templatename = this.emailTemplateForm.value.templatename;
      this.emailtempobj.subject = this.emailTemplateForm.value.subject;
      this.emailtempobj.body = this.emailTemplateForm.value.body;
      this.emailtempobj.department = this.emailTemplateForm.value.department;
  
      this.E_temp.postdata(this.emailtempobj)
        .subscribe(
          () => {
            // alert("Email template added successfully");
            this._toast.success("Email template added successfully","success");
            this.getemailtemplate(); // Assuming you have a function to fetch email templates
            this.emailTemplateForm.reset();
            this.isCreateMode = true;
          },
          err => {
            // alert("Error adding email template: " + err.message);
            this._toast.error("Error adding email template","Error");
          }
        );
    } else {
      alert("Form is invalid. Please fix the errors before submitting.");
    }
  }
  setselectedtemplate(template: any) {
    this.selectedtemplate = template.id;
  }
  
  deletetemplate(template: any) {
    this.E_temp.delete(template.id)
      .subscribe(
        () => {
          // alert("template deleted successfully");
          this._toast.success("template deleted successfully","success");
          this.getemailtemplate(); // Fetch updated templates
        },
        err => {
          // console.error("Error deleting template:", err);
          this._toast.error("Error deleting template","Error");
        }
      );
  }
  
  edittemplate(index: number, template: any) {
    this.selectedtemplate = template.id; // Set the selected template ID
    this.emailTemplateForm.patchValue({
      id: template.id,
      templatename: template.templatename, // Updated property name
      subject: template.subject,
      body: template.body, // Updated property name
      department: template.department
    });
    this.isCreateMode = false;
  }
  
  updatetemplate() {
    if (this.emailTemplateForm.valid) {
      this.emailtempobj.templatename = this.emailTemplateForm.value.templatename; // Updated property name
      this.emailtempobj.subject = this.emailTemplateForm.value.subject;
      this.emailtempobj.body = this.emailTemplateForm.value.body; // Updated property name
      this.emailtempobj.department = this.emailTemplateForm.value.department;
  
      this.E_temp.update(this.emailtempobj, this.selectedtemplate)
        .subscribe(
          () => {
            // alert("template updated successfully");
            this._toast.success("Template updated successfully","success");
            this.getemailtemplate(); // Fetch updated templates
            this.emailTemplateForm.reset();
          },
          err => {
            // alert("Error updating template: " + err.message);
            this._toast.error("Error updating template","Error");
          }
        );
    } else {
      alert("Form is invalid. Please fix the errors before submitting.");
    }
  }
  
  

}

class emailtempinterface{
  id:number=0;
  templatename:string='';
  department:string='';
  subject:string='';
  body:string='';
}
