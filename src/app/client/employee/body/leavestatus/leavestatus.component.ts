import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {ViewChild } from '@angular/core';
import { NgForm ,AbstractControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../../../services/leave.service';
import { LeavetypeService } from '../../../../services/leavetype.service';
import { ApprvdLveEmpService } from '../../../../services/apprvd-lve-emp.service';
import { LveHisEmpService } from '../../../../services/lve-his-emp.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


declare var $:any;

@Component({
  selector: 'app-leavestatus',
  templateUrl: './leavestatus.component.html',
  styleUrl: './leavestatus.component.scss'
})
export class LeavestatusComponent implements OnInit, OnDestroy  {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  leaveData :any[]= [];
  leaveForm!: FormGroup;
  timeOptionRequired: any;
  leaveFormObj:leaveformapply_interface=new leaveformapply_interface();
  leaveApplyData:any[]=[];
  selectedleave: any;
  showErrors: boolean = false;
  leaveTypes: any[] = [];

  leavehistory:any[] = [];
  leaveapproved:any[]=[];



  constructor(private formBuilder: FormBuilder,private Leave_s:LeaveService,private leave_t:LeavetypeService,private appr:ApprvdLveEmpService,private l_his:LveHisEmpService,private _toast:ToastrService) { }

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
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      reason: ['', Validators.required],
      fromDate: ['', [Validators.required, this.validatePastDate]],
      toDate: ['', [Validators.required, this.validatePastDate]],
      permissionOption: '',
      timeOption: '',
      permissionFrom: '',
      permissionTo: ''
    }); // Change Validators to validators
    this.getleaverequest();
    this.getLeaveTypes();
    this.getleavehistory();
    this.getleaveapproved();
    
      
    
  }
  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(null);
    
  //    // Provide a dummy value, like null, as an argument
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  // leavemodifyform
  getLeaveTypes() {
    this.leave_t.getdata().subscribe(
      (data: any[]) => {
        this.leaveTypes = data;
      },
      (error) => {
        console.error('Error fetching leave types:', error);
      }
    );
  }

  getleaverequest() {
    this.Leave_s.getdata().subscribe(
      (res: any[]) => {
        // Iterate over each leave request and append the 'status' property
        this.leaveData = res.map(request => ({ ...request, status: 'pending' }));
      },
      err => {
        console.error("Error fetching leave data:", err);
      }
    );
  }
  getleavehistory() {
    this.l_his.getdata().subscribe(
      (res: any[]) => {
        // Iterate over each leave request and append the 'status' property
        this.leavehistory = res.map(request => ({ ...request }));
        this.dtTrigger.next(null);

      },
      err => {
        console.error("Error fetching leave history data:", err);
      }
    );
  }
  getleaveapproved() {
    this.appr.getdata().subscribe(
      (res: any[]) => {
        // Iterate over each leave request and append the 'status' property
        this.leaveapproved = res.map(request => ({ ...request }));
      },
      err => {
        console.error("Error fetching leave Approved data:", err);
      }
    );
  }
  postleaveapply(){
    if(this.leaveForm.valid){
      this.leaveFormObj.id=0;
      this.leaveFormObj.leaveType=this.leaveForm.get('leaveType')?.value;
      this.leaveFormObj.reason=this.leaveForm.get('reason')?.value;
      this.leaveFormObj.fromDate=this.leaveForm.get('fromDate')?.value;
      this.leaveFormObj.toDate=this.leaveForm.get('toDate')?.value;
      this.leaveFormObj.permissionOption=this.leaveForm.get('permissionOption')?.value;
      this.leaveFormObj.timeOption=this.leaveForm.get('timeOption')?.value;
      this.leaveFormObj.permissionFrom=this.leaveForm.get('permissionFrom')?.value;
      this.leaveFormObj.permissionTo=this.leaveForm.get('permissionTo')?.value;
      this.Leave_s.postdata(this.leaveFormObj).subscribe(res=>{
        // alert("Leave Applied Successfully");
        this._toast.success("Leave Updated Successfully","success");
        // this.leaveApplyData=res;
        this.leaveForm.reset();
        this.leaveForm.markAsUntouched(); 
        this.showErrors = false;

        this.leaveForm.get('fromDate')?.setErrors(null);
        this.leaveForm.get('toDate')?.setErrors(null);

      },
      
      err=>{
        // alert("Something went wrong"+err.message);
        this._toast.error("Something went wrong","Error");
        this.showErrors = true;
      });
    }
  }
  setselectedleave(leave: any) {
    this.selectedleave = leave;
  }

  editleaveapplication(index: number, leave: any) {
    this.selectedleave = leave.id; // Set the selected leave ID
    this.leaveForm.patchValue({
        id: leave.id,
        leaveType: leave.leaveType,
        reason: leave.reason,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        permissionOption: leave.permissionOption,
        timeOption: leave.timeOption,
        permissionFrom: leave.permissionFrom,
        permissionTo: leave.permissionTo,
        
      
    });
    // this.isCreateMode = false;
  }

  updateleaverequest() {
    this.Leave_s.update(this.leaveForm.value, this.selectedleave)
        .subscribe(
            res => {
                // alert("leave application updated successfully");
                this._toast.success("leave application updated successfully","success");
                this.getleaverequest(); // Ensure this fetches the updated data
                this.leaveForm.reset(); // Reset the form after updating
            },
            err => {
                // alert("Error updating employee: " + err.message);
                this._toast.error("Error updating employee","Error");
            }
        );
}
deleteleave(leave: any) {
  console.log(leave);
  this.Leave_s.delete(leave.id)
      .subscribe(
          res => {
              // alert("leave request deleted successfully");
              this._toast.success("leave request deleted successfully","success");
              this.getleaverequest();
          },
          err => {
              console.error("Error deleting employee:", err);
          }
      );
}
calculateDays(fromDate: string, toDate: string, permissionFrom?: string, permissionTo?: string): string {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  let diffDays = Math.ceil(Math.abs(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  let daysLabel = diffDays === 1 ? 'day' : 'days';
  
  // Check if permissionFrom and permissionTo are provided and not empty or null
  if (permissionFrom && permissionTo && permissionFrom.trim() !== '' && permissionTo.trim() !== '') {
    const fromTime = new Date(`01/01/1970 ${permissionFrom}`);
    const toTime = new Date(`01/01/1970 ${permissionTo}`);
    const timeDiffMs = Math.abs(toTime.getTime() - fromTime.getTime());
    const diffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));
    diffDays = 0;
    return `${diffDays} ${daysLabel} / ${diffHours} hours `;
  }
  
  return `${diffDays} ${daysLabel} / 0 hours`;
}

    
 
  isPermissionOptionInvalid(): boolean {
    const permissionOption = this.leaveForm.get('permissionOption')?.value;
    const permissionFrom = this.leaveForm.get('permissionFrom')?.value;
    const permissionTo = this.leaveForm.get('permissionTo')?.value;
  
    return permissionOption === 'permission' && (!permissionFrom || !permissionTo);
  }
  
  isTimeOptionInvalid(): boolean {
    const permissionOption = this.leaveForm.get('permissionOption')?.value;
    const timeOption = this.leaveForm.get('timeOption')?.value;
  
    return permissionOption === 'halfDay' && !(timeOption === 'morning' || timeOption === 'afternoon');
  }
  

  submitForm() {
    if (this.leaveForm.valid) {
      // Handle form submission
    } else {
      // Mark all form controls as touched to display validation errors
      this.leaveForm.markAllAsTouched();
    }
  }

  // Custom validator to ensure fromDate is not in the past
  // Custom validator to ensure selected date is not in the past
  validatePastDate(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate < currentDate ? { pastDate: true } : null;
  }

  validateDateRange() {
    const fromDate = this.leaveForm.get('fromDate');
    const ToDate = this.leaveForm.get('toDate');
    const ToError: any = document.getElementById('ToError');

    if (!ToDate?.value) {
      // If the field is empty, clear the error message
      ToError.textContent = '';
    } else if (fromDate?.value > ToDate?.value)  {
      // If the field is not empty but doesn't match the regex, show an error
      ToError.textContent = 'To date should not be less than From date';
      this.leaveForm.setErrors({ 'invalid': true });
    } else {
      // If the field is not empty and matches the regex, clear the error message
      ToError.textContent = '';
    }
  }

  validateTimeDifference() {
    const fromTime = this.leaveForm.get('permissionFrom')?.value;
    const toTime = this.leaveForm.get('permissionTo')?.value;
    const permissionToControl = this.leaveForm.get('permissionTo');
  
    if (fromTime && toTime) {
      const from = new Date(`2000-01-01T${fromTime}`);
      const to = new Date(`2000-01-01T${toTime}`);
  
      if (to < from) {
        permissionToControl?.setErrors({ ['lessThanFromTime']: true });
      } else {
        permissionToControl?.setErrors(null);
      }
  
      const timeDifference = Math.abs(to.getTime() - from.getTime()) / 3600000;
      if (timeDifference > 3) {
        permissionToControl?.setErrors({ ['timeDifferenceExceeded']: true });
      } else {
        permissionToControl?.setErrors(null);
      }
    }
  }

 
  
}

class leaveformapply_interface{
  id:number=0
  leaveType!: string;
  reason!: string;
  fromDate!: Date;
  toDate!: Date;
  permissionOption!: string;
  timeOption!: string;
  permissionFrom!: string;
  permissionTo!: string;

}