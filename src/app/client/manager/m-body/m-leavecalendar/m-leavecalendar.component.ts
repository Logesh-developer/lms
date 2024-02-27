import { Component,ViewChild} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-m-leavecalendar',
  templateUrl: './m-leavecalendar.component.html',
  styleUrl: './m-leavecalendar.component.scss'
})
export class MLeavecalendarComponent {
  @ViewChild('tooltip') tooltip?: NgbTooltip;

  date: Date = new Date(); // Use a single Date object
  year: number = this.date.getFullYear();
  month: number = this.date.getMonth();
  currdateText: string = '';
  calendarDates: { day: number; class: string }[];
  
 
  constructor() {
  this.calendarDates = [];
}
  

calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin],
  events:  this.getLeaveEvents(),
  eventColor: 'red',
  eventDidMount: this.handleEventDidMount.bind(this), // Handle event mount to show tooltip
  eventContent: this.customEventContent.bind(this)
 
};

getLeaveEvents(): any {
  return [
    { title: 'Annual Leave', start: '2024-02-01', end: '2024-02-03', employee: 'logesh', color: 'green' },
    { title: 'Sick Leave', start: '2024-02-05', end: '2024-02-06', employee: 'Joe Smith', color: 'blue' },
    { title: 'Maternity Leave', start: '2024-02-10', end: '2024-02-15', employee: 'Samuel', color: 'red' },
    { title: 'Personal Leave', start: '2024-02-12', end: '2024-02-14', employee: 'Michael', color: 'orange' }
  ].map(event => ({
    ...event,
    title: event.employee // Use employee name as the title
  }));
}

customEventContent(arg: any) {
  const eventTitle = arg.event.title || ''; // Get the event title (employee name)
  return { html: `<div>${eventTitle}</div>` }; // Render the employee name
}

handleEventDidMount(info: any) {
  // Handle any additional functionality when an event is mounted (e.g., tooltips)
}
   
  }

  
  


  

 

