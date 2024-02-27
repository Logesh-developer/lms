import { Component  ,OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { NgForm ,AbstractControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { LeaveService } from '../../../../../services/leave.service';
import { ApprvdLveEmpService } from '../../../../../services/apprvd-lve-emp.service';
import { LveHisEmpService } from '../../../../../services/lve-his-emp.service';
import { LveHisManService } from '../../../../../services/lve-his-man.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-leavehistory',
  templateUrl: './leavehistory.component.html',
  styleUrl: './leavehistory.component.scss'
})
export class LeavehistoryComponent implements OnInit,OnDestroy {
  dtOptions2: any = {};
  dtTrigger2: Subject<any> = new Subject();
  leaveHistory :any[]= [];
  constructor(private Leave_s:LeaveService,private applveser:ApprvdLveEmpService,private lvehisemp:LveHisEmpService,private lvehisman:LveHisManService,private _toast:ToastrService) { }
  ngOnInit(): void {
    this.dtOptions2 = {
      pagingType:"simple",
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel',
        'csv'
      ]
    };
    this.getleavehistory();
      
    
  }
  // ngAfterViewInit(): void {
    
  //   this.dtTrigger2.next(null); // Provide a dummy value, like null, as an argument
  // }

  ngOnDestroy(): void {
    this.dtTrigger2.unsubscribe();
  }
  getleavehistory() {
    this.lvehisman.getdata().subscribe(
      (res: any[]) => {
        // Iterate over each leave request and append the 'status' property
        this.leaveHistory = res.map(request => ({ ...request }));
        this.dtTrigger2.next(null);
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
  // setSelectedLeave(leave: any) {
  //   this.selectedleave = leave;
  // }
}
