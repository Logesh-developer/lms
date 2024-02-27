import { Component  ,OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { NgForm ,AbstractControl} from '@angular/forms';
import { DataTablesModule} from 'angular-datatables';
import { Subject } from 'rxjs';
import { LeaveService } from '../../../../../services/leave.service';
import { ApprvdLveEmpService } from '../../../../../services/apprvd-lve-emp.service';
import { LveHisEmpService } from '../../../../../services/lve-his-emp.service';
import { LveHisManService } from '../../../../../services/lve-his-man.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-leaveapproval',
  templateUrl: './leaveapproval.component.html',
  styleUrl: './leaveapproval.component.scss'
})
export class LeaveapprovalComponent implements OnInit,OnDestroy{
  dtOptions1: any = {};
  dtTrigger1: Subject<any> = new Subject();
  leaveData :any[]= [];
  timeOptionRequired: any;
  selectedleave: any;
  showErrors: boolean = false;
  leaveIdToDelete?: number;
  constructor(private Leave_s:LeaveService,private applveser:ApprvdLveEmpService,private lvehisemp:LveHisEmpService,private lvehisman:LveHisManService,private cdr: ChangeDetectorRef,private _toast:ToastrService) { }

  ngOnInit(): void {
    
    this.dtOptions1 = {
      pagingType:"simple",
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel',
        'csv'
      ]
    };
    this.getleaverequest(); 
    
      
    
  }
  // ngAfterViewInit(): void {
    
  //   this.dtTrigger1.next(null); // Provide a dummy value, like null, as an argument
  // }

  ngOnDestroy(): void {
    this.dtTrigger1.unsubscribe();
  }

  getleaverequest() {
    this.Leave_s.getdata().subscribe(
      (res: any[]) => {
        // Iterate over each leave request and append the 'status' property
        this.leaveData = res.map(request => ({ ...request, status: 'pending' }));
        this.dtTrigger1.next(null);
      },
      err => {
        // console.error("Error fetching leave data:", err);
        this._toast.error("Error fetching leave data","Error");


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
  setSelectedLeave(leave: any) {
    this.selectedleave = leave;
  }

  approveLeave(leave: any) {
    // Store the ID of the leave to be deleted
    this.leaveIdToDelete = leave.id;

    // Generate a unique ID for the leave
    const uniqueId = uuidv4();
    leave.id = uniqueId;

    // Update status to approved
    leave.status = 'approved';

    // Post the approved leave to the approvedleaveemployee service
    this.applveser.postdata(leave).subscribe(() => {
        console.log('Leave approved successfully');
        
        // Post the approved leave to the leavehistoryemployee service
        this.lvehisemp.postdata(leave).subscribe(() => {
            console.log('Leave added to leave history for employee');
            
            // Post the approved leave to the leavehistorymanager service
            this.lvehisman.postdata(leave).subscribe(() => {
                console.log('Leave added to leave history for manager');
                
                // Remove the leave from leaveData array
                this.leaveData = this.leaveData.filter(item => item.id !== this.leaveIdToDelete);
                this.cdr.detectChanges();
                
                // Delete the leave from the JSON server
                this.Leave_s.delete(this.leaveIdToDelete).subscribe(() => {
                    console.log('Leave removed from JSON server');
                     

                });
            });
        });
    });
}

// Function to decline a leave request
declineLeave(leave: any) {
    // Store the ID of the leave to be deleted
    this.leaveIdToDelete = leave.id;

    // Generate a unique ID for the leave
    const uniqueId = uuidv4();
    leave.id = uniqueId;

    // Update status to declined
    leave.status = 'declined';

    // Post the declined leave to the leavehistoryemployee service
    this.lvehisemp.postdata(leave).subscribe(() => {
        console.log('Leave declined successfully and added to leave history for employee');
        
        // Post the declined leave to the leavehistorymanager service
        this.lvehisman.postdata(leave).subscribe(() => {
            console.log('Leave declined successfully and added to leave history for manager');
            
            // Remove the leave from leaveData array
            this.leaveData = this.leaveData.filter(item => item.id !== this.leaveIdToDelete);
            this.cdr.detectChanges();
            
            // Delete the leave from the JSON server
            this.Leave_s.delete(this.leaveIdToDelete).subscribe(() => {
                console.log('Leave removed from JSON server');
                

            });
        });
    });
}

}
