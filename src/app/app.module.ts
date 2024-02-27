import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import {DataTablesModule} from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { provideHttpClient, withFetch } from '@angular/common/http';

import {  FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdBodyComponent } from './client/admin/ad-body/ad-body.component';
import { ConfEmailTemplateComponent } from './client/admin/ad-body/sysconfig/conf-email-template/conf-email-template.component';
import { ConfHolidayComponent } from './client/admin/ad-body/sysconfig/conf-holiday/conf-holiday.component';
import { ConfLeaveTypeComponent } from './client/admin/ad-body/sysconfig/conf-leave-type/conf-leave-type.component';
import { SysconfigComponent } from './client/admin/ad-body/sysconfig/sysconfig.component';
import { UserconfigComponent } from './client/admin/ad-body/userconfig/userconfig.component';
import { AdHeaderComponent } from './client/admin/ad-header/ad-header.component';
import { AdSidenavComponent } from './client/admin/ad-sidenav/ad-sidenav.component';
import { AdminComponent } from './client/admin/admin.component';
import { ApplyleaveComponent } from './client/employee/body/applyleave/applyleave.component';
import { BodyComponent } from './client/employee/body/body.component';
import { DashboardComponent } from './client/employee/body/dashboard/dashboard.component';
import { LeavepolicyComponent } from './client/employee/body/leavepolicy/leavepolicy.component';
import { LeavestatusComponent } from './client/employee/body/leavestatus/leavestatus.component';
import { EmployeeComponent } from './client/employee/employee.component';
import { HeaderComponent } from './client/employee/header/header.component';
import { SidenavComponent } from './client/employee/sidenav/sidenav.component';
import { HrBodyComponent } from './client/hr/hr-body/hr-body.component';
import { HrDashboardComponent } from './client/hr/hr-body/hr-dashboard/hr-dashboard.component';
import { HrLeavepolicyComponent } from './client/hr/hr-body/hr-leavepolicy/hr-leavepolicy.component';
import { HrReportanalysisComponent } from './client/hr/hr-body/hr-reportanalysis/hr-reportanalysis.component';
import { HrReportcalendarComponent } from './client/hr/hr-body/hr-reportcalendar/hr-reportcalendar.component';
import { HrHeaderComponent } from './client/hr/hr-header/hr-header.component';
import { HrSidenavComponent } from './client/hr/hr-sidenav/hr-sidenav.component';
import { HrComponent } from './client/hr/hr.component';
import { LoginComponent } from './client/login/login.component';
import { MBodyComponent } from './client/manager/m-body/m-body.component';
import { MDashboardComponent } from './client/manager/m-body/m-dashboard/m-dashboard.component';
import { LeaveapprovalComponent } from './client/manager/m-body/m-leaveapproval/leaveapproval/leaveapproval.component';
import { LeavehistoryComponent } from './client/manager/m-body/m-leaveapproval/leavehistory/leavehistory.component';
import { MLeaveapprovalComponent } from './client/manager/m-body/m-leaveapproval/m-leaveapproval.component';
import { MLeavecalendarComponent } from './client/manager/m-body/m-leavecalendar/m-leavecalendar.component';
import { MLeavereportComponent } from './client/manager/m-body/m-leavereport/m-leavereport.component';
import { MHeaderComponent } from './client/manager/m-header/m-header.component';
import { MSidenavComponent } from './client/manager/m-sidenav/m-sidenav.component';
import { ManagerComponent } from './client/manager/manager.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    BodyComponent,
    ApplyleaveComponent,
    LeavestatusComponent,
    LeavepolicyComponent,
    ManagerComponent,
    MHeaderComponent,
    MSidenavComponent,
    MBodyComponent,
    MDashboardComponent,
    MLeaveapprovalComponent,
    MLeavereportComponent,
    MLeavecalendarComponent,
    HrComponent,
    HrHeaderComponent,
    HrSidenavComponent,
    HrBodyComponent,
    HrDashboardComponent,
    HrLeavepolicyComponent,
    HrReportanalysisComponent,
    HrReportcalendarComponent,
    AdminComponent,
    AdHeaderComponent,
    AdSidenavComponent,
    AdBodyComponent,
    UserconfigComponent,
    SysconfigComponent,
    ConfLeaveTypeComponent,
    ConfHolidayComponent,
    ConfEmailTemplateComponent,
    LeaveapprovalComponent,
    LeavehistoryComponent,
    
   ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    ChartModule,
    HttpClientModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:5000,
      progressBar:true,
      positionClass: 'toast-top-center'
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
