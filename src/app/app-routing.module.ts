import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { EmployeeComponent } from './client/employee/employee.component';
import { DashboardComponent } from './client/employee/body/dashboard/dashboard.component';
import { ApplyleaveComponent } from './client/employee/body/applyleave/applyleave.component';
import { LeavestatusComponent } from './client/employee/body/leavestatus/leavestatus.component';
import { LeavepolicyComponent } from './client/employee/body/leavepolicy/leavepolicy.component';
import { MDashboardComponent } from './client/manager/m-body/m-dashboard/m-dashboard.component';
import { MLeaveapprovalComponent } from './client/manager/m-body/m-leaveapproval/m-leaveapproval.component';
import { MLeavereportComponent } from './client/manager/m-body/m-leavereport/m-leavereport.component';
import { MLeavecalendarComponent } from './client/manager/m-body/m-leavecalendar/m-leavecalendar.component';
import { ManagerComponent } from './client/manager/manager.component';
import { HrComponent } from './client/hr/hr.component';
import { HrDashboardComponent } from './client/hr/hr-body/hr-dashboard/hr-dashboard.component';
import { HrLeavepolicyComponent } from './client/hr/hr-body/hr-leavepolicy/hr-leavepolicy.component';
import { HrReportanalysisComponent } from './client/hr/hr-body/hr-reportanalysis/hr-reportanalysis.component';
import { HrReportcalendarComponent } from './client/hr/hr-body/hr-reportcalendar/hr-reportcalendar.component';
import { AdminComponent } from './client/admin/admin.component';
import { UserconfigComponent } from './client/admin/ad-body/userconfig/userconfig.component';
import { SysconfigComponent } from './client/admin/ad-body/sysconfig/sysconfig.component';
import { ConfLeaveTypeComponent } from './client/admin/ad-body/sysconfig/conf-leave-type/conf-leave-type.component';
import { ConfHolidayComponent } from './client/admin/ad-body/sysconfig/conf-holiday/conf-holiday.component';
import { ConfEmailTemplateComponent } from './client/admin/ad-body/sysconfig/conf-email-template/conf-email-template.component';
import { LeaveapprovalComponent } from './client/manager/m-body/m-leaveapproval/leaveapproval/leaveapproval.component';
import { LeavehistoryComponent } from './client/manager/m-body/m-leaveapproval/leavehistory/leavehistory.component';




const routes: Routes = [
  // {path: '',redirectTo:'LoginComponent',pathMatch: 'full'},
  {path: '',component:LoginComponent},
  {path: 'employee',component:EmployeeComponent,children: [
    {path: '',component:DashboardComponent},
    {path: 'dashboard',component:DashboardComponent},
    {path: 'applyleave',component:ApplyleaveComponent},
    {path: 'leavestatus',component:LeavestatusComponent},
    {path: 'leavepolicy',component:LeavepolicyComponent}
  
  ]},
  {path:'manager',component:ManagerComponent,children:[
    {path: '',component:MDashboardComponent},
    {path: 'dashboard',component:MDashboardComponent},
    {path: 'leaveapproval',component:MLeaveapprovalComponent,children:[
      {path:'',component:LeaveapprovalComponent},
      {path:'leaveapproval',component:LeaveapprovalComponent},
      {path:'leaveHistory',component:LeavehistoryComponent},

    ]},
    {path: 'leavereport',component:MLeavereportComponent},
    {path: 'leavecalendar',component:MLeavecalendarComponent}
  ]},
  {path: 'hr',component:HrComponent,children: [
    {path: '',component:HrDashboardComponent},
    {path: 'dashboard',component:HrDashboardComponent},
    {path: 'leavepolicy',component:HrLeavepolicyComponent},
    {path: 'reportanalysis',component:HrReportanalysisComponent},
    {path: 'leavecalendar',component:HrReportcalendarComponent}
  
  ]},
  {path:'admin',component:AdminComponent,children:[
    {path: '',component:UserconfigComponent},
    {path: 'Userconfigurtion',component:UserconfigComponent},
    {path: 'systemconfiguration',component:SysconfigComponent,children:[
      {path:'',component:ConfLeaveTypeComponent},
      {path:'leavetype',component:ConfLeaveTypeComponent},
      {path:'holiday',component:ConfHolidayComponent},
      {path:'emailtemplate',component:ConfEmailTemplateComponent},

    ]}
    
  ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
