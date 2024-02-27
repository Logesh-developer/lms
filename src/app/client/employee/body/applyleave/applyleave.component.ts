import { Component,ViewChild } from '@angular/core';
import { AbstractControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LeaveService } from '../../../services/leave.service';
// import { LeavetypeService } from '../../../services/leavetype.service';
import { LeaveService } from '../../../../services/leave.service';
import { LeavetypeService } from '../../../../services/leavetype.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrl: './applyleave.component.scss'
})
export class ApplyleaveComponent {
  
  leaveForm!: FormGroup;
  timeOptionRequired: any;
  leaveFormObj:leaveformapply_interface=new leaveformapply_interface();
  leaveApplyData:any[]=[];
  showErrors: boolean = false;
  leaveTypes: any[] = [];





  constructor(private formBuilder: FormBuilder,private Leave_s:LeaveService,private leave_t:LeavetypeService,private _toast:ToastrService) { }

  ngOnInit(): void {
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
    this.getLeaveTypes();
  }

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
      this.leaveFormObj.Ecode="E403";
      this.leaveFormObj.Ename="Logeshwaran";
      
      this.Leave_s.postdata(this.leaveFormObj).subscribe(res=>{
        // alert("Leave Applied Successfully");
        this._toast.success("Leave Applied Successfully","success");
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
  Ecode!:string;
  Ename!:string;


}
  
  
  


 




 

