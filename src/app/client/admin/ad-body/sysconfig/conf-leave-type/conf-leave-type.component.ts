import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeavetypeService } from '../../../../../services/leavetype.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-conf-leave-type',
  templateUrl: './conf-leave-type.component.html',
  styleUrl: './conf-leave-type.component.scss'
})
export class ConfLeaveTypeComponent {

  leaveForm!: FormGroup;
  leavetypes_data:any[]=[];
  leaveData:any;
  leavetypeobj:leavetypeinterface=new leavetypeinterface();
  selectedleavetype:any;
  bool:boolean=false;
  isCreateMode: boolean = true;


  constructor(private formBuilder: FormBuilder,private leavetype_s:LeavetypeService,private _toast:ToastrService) {}

  ngOnInit() {
    this.leaveForm = this.formBuilder.group({
      leavetype: ['', Validators.required]
    });
    this.bool = true;
    this.getleavetypes();
  }

  

  getleavetypes() {
    this.leavetype_s.getdata().subscribe(
      (res: any[]) => {
        this.leavetypes_data = res;
      },
      err => {
        // console.error("Error fetching leave data:", err);
        this._toast.error("Error fetching leave data","Error");
      }
    );
  }
  postleavedetails() {
    if (this.leaveForm.valid) {
      // Ensure the correct property name is set
      this.leavetypeobj.leavetype = this.leaveForm.value.leavetype;
      this.leavetype_s.postdata(this.leavetypeobj)
        .subscribe(
          res => {
            // alert("Leave type added successfully");
            this._toast.success("Leave type added successfully","success");
            this.getleavetypes();
            this.leaveForm.reset();
            this.isCreateMode = true;
          },
          err => {
            // alert("Error adding leave type: " + err.message);
            this._toast.error("Error adding leave type","Error");
          }
        );
    } else {
      alert("Form is invalid. Please fix the errors before submitting.");
    }
  }


setselectedleavetype(leave: any) {
  this.selectedleavetype = leave;
}
deleteleavetype(leave: any) {
  console.log(leave);
  this.leavetype_s.delete(leave.id)
      .subscribe(
          res => {
              // alert("leave type deleted successfully");
              this._toast.success("leave type deleted successfully","success");
              this.getleavetypes();
          },
          err => {
              // console.error("Error deleting leavetype:", err);
              this._toast.error("Error deleting leavetype","Error");
          }
      );
}

editleave(index: number, leave: any) {
  this.selectedleavetype = leave.id; // Set the selected leave type ID
  this.leaveForm.patchValue({
      id: leave.id,
      leavetype: leave.leavetype // Ensure to use 'leavetype' property
  });
  this.isCreateMode = false;
}

updateleave() {
  this.leavetype_s.update(this.leaveForm.value, this.selectedleavetype)
      .subscribe(
          res => {
              // alert("Leave type updated successfully");
              this._toast.success("Leave type updated successfully","success");
              this.getleavetypes();
              this.leaveForm.reset();
          },
          err => {
              // alert("Error updating leave type: " + err.message);
              this._toast.error("Error updating leave type","Error");
          }
      );
}


 



}

 class leavetypeinterface{
    id:number=0;
    leavetype:string='';
  }