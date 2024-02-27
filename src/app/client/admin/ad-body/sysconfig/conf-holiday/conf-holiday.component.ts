import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HolidayService } from '../../../../../services/holiday.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-conf-holiday',
  templateUrl: './conf-holiday.component.html',
  styleUrl: './conf-holiday.component.scss'
})
export class ConfHolidayComponent {

  holidayForm!: FormGroup;
  holidays_data:any[]=[];
  holidayobj:holidayinterface=new holidayinterface();
  isCreateMode: boolean = true;
  selectedholiday:any;
  bool:boolean=false;
  constructor(private formBuilder: FormBuilder, private hol:HolidayService,private _toast:ToastrService) { }

  ngOnInit(): void {
    this.holidayForm = this.formBuilder.group({
      holidayType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', [Validators.required, this.validateDateRange]]
    });
    this.getholidays();
  }
  validateDateRange(control: any) {
    const fromDate = new Date(control.parent?.get('fromDate').value);
    const toDate = new Date(control.value);
    return fromDate <= toDate ? null : { dateRangeInvalid: true };
  }

  submitForm() {
    if (this.holidayForm.valid) {
      // Form submission logic
      this.postholidays();
      this.holidayForm.reset();
    }
  }

  resetForm() {
    this.holidayForm.reset();
  }

  getholidays() {
    this.hol.getdata().subscribe(
      (res: any[]) => {
        this.holidays_data = res;
      },
      err => {
        console.error("Error fetching holiday data:", err);
        this._toast.error("Error fetching holiday data","Error");
      }
    );
  }
  postholidays() {
    if (this.holidayForm.valid) {
      // Ensure the correct property name is set
      this.holidayobj.holidayType = this.holidayForm.value.holidayType;
      this.holidayobj.fromDate = this.holidayForm.value.fromDate;
      this.holidayobj.toDate = this.holidayForm.value.toDate;
      this.hol.postdata(this.holidayobj)
        .subscribe(
          res => {
            // alert("Leave holiday added successfully");
            this._toast.success("Leave holiday added successfully","success");
            this.getholidays();
            this.holidayForm.reset();
            this.isCreateMode = true;
          },
          err => {
            // alert("Error adding holiday: " + err.message);
            this._toast.error("Error adding holiday","Error");
          }
        );
    } else {
      alert("Form is invalid. Please fix the errors before submitting.");
    }
  }


setselectedholiday(leave: any) {
  this.selectedholiday = leave;
}
deleteholiday(leave: any) {
  console.log(leave);
  this.hol.delete(leave.id)
      .subscribe(
          res => {
              // alert("holiday deleted successfully");
              this._toast.success("holiday deleted successfully","success");
              this.getholidays();
          },
          err => {
              // console.error("Error deleting holiday:", err);
              this._toast.error("Error deleting holiday","Error");
          }
      );
}

editholiday(index: number, leave: any) {
  this.selectedholiday = leave.id; // Set the selected leave type ID
  this.holidayForm.patchValue({
      id: leave.id,
      holidayType: leave.holidayType, // Ensure to use 'leavetype' property
      fromDate: leave.fromDate, // Ensure to use 'leavetype' property
      toDate: leave.toDate// Ensure to use 'leavetype' property
  });
  this.isCreateMode = false;

}

updateholiday() {
  this.hol.update(this.holidayForm.value, this.selectedholiday)
      .subscribe(
          res => {
              // alert("holiday updated successfully");
              this._toast.success("holiday updated successfully","success");
              this.getholidays();
              this.holidayForm.reset();
          },
          err => {
              // alert("Error updating holiday: " + err.message);
              this._toast.error("Error updating holiday","Error");
          }
      );
}

}

class holidayinterface{
  id:number=0;
  holidayType:string='';
  fromDate:Date | undefined;
  toDate:Date | undefined;
}
