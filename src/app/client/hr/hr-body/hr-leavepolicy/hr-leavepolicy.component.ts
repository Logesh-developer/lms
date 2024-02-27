import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrpolicyService } from '../../../../services/hrpolicy.service';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-hr-leavepolicy',
  templateUrl: './hr-leavepolicy.component.html',
  styleUrl: './hr-leavepolicy.component.scss'
})
export class HrLeavepolicyComponent { 
  leavePolicyForm!: FormGroup;
  l_policy :any[]=[];
  leavepolicyobj:leavepolicyinterface=new leavepolicyinterface();
  isCreateMode: boolean = true;
  selectedpolicy:any;
  constructor(private formBuilder: FormBuilder,private lpolicy:HrpolicyService,private _toast:ToastrService) { }

  ngOnInit(): void {
    this.leavePolicyForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      commencementDate: ['', Validators.required],
      notes: ['', Validators.required]
    });
    this.getpolicytemplate();
  }

  

  getpolicytemplate() {
    this.lpolicy.getdata().subscribe(
      (res: any[]) => {
        this. l_policy = res;
      },
      err => {
        // console.error("Error fetching holiday data:", err);
        this._toast.error("Error fetching template data","Error");
      }
    );
  }
  postleavePolicy() {
    if (this.leavePolicyForm.valid) {
      // Ensure the correct property names are set
      this.leavepolicyobj.leaveType = this.leavePolicyForm.value.leaveType;
      this.leavepolicyobj.commencementDate = this.leavePolicyForm.value.commencementDate;
      this.leavepolicyobj.notes= this.leavePolicyForm.value.notes;
      
  
      this.lpolicy.postdata(this.leavepolicyobj)
        .subscribe(
          () => {
            // alert("Email template added successfully");
            this._toast.success("Email template added successfully","success");
            this.getpolicytemplate(); // Assuming you have a function to fetch email templates
            this.leavePolicyForm.reset();
            this.isCreateMode = true;
          },
          err => {
            // alert("Error adding email template: " + err.message);
            this._toast.error("Error adding leave policy","Error");
          }
        );
    } else {
      alert("Form is invalid. Please fix the errors before submitting.");
    }
  }
  setselectedpolicy(policy: any) {
    this.selectedpolicy = policy;
  }

  deletepolicy(policy: any) {
    this.lpolicy.delete(policy.id)
      .subscribe(
        () => {
          // alert("policy deleted successfully");
          this._toast.success("policy deleted successfully","success");
          this.getpolicytemplate(); // Fetch updated templates
        },
        err => {
          // console.error("Error deleting template:", err);
          this._toast.error("Error deleting policy","Error");
        }
      );
  }
  editleavepolicy(index: number, policy: any) {
    this.selectedpolicy = policy.id; // Set the selected template ID
    this.leavePolicyForm.patchValue({
      // id: policy.id,
      leaveType: policy.leaveType, // Updated property name
      commencementDate: policy.commencementDate,
      notes: policy.notes, // Updated property name
      
    });
    this.isCreateMode = false;
  }

  updatepolicytemplate() {
    if (this.leavePolicyForm.valid) {
      this.leavepolicyobj.leaveType = this.leavePolicyForm.value.leaveType; // Updated property name
      this.leavepolicyobj.commencementDate = this.leavePolicyForm.value.commencementDate;
      this.leavepolicyobj.notes = this.leavePolicyForm.value.notes; // Updated property name
  
      this.lpolicy.update(this.leavepolicyobj, this.selectedpolicy)
        .subscribe(
          () => {
            // alert("template updated successfully");
            this._toast.success("policy updated successfully","success");
            this.getpolicytemplate(); // Fetch updated templates
            this.leavePolicyForm.reset();
          },
          err => {
            // alert("Error updating template: " + err.message);
            this._toast.error("Error updating policy","Error");
          }
        );
    } else {
      alert("Form is invalid. Please fix the errors before submitting.");
    }
  }

  
}

class leavepolicyinterface{
  id:number=0;
  leaveType:string='';
  commencementDate:string='';
  notes:string='';
  
}