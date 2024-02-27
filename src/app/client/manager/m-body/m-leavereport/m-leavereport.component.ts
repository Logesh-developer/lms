import { Component} from '@angular/core';
import { MasterService } from '../../../../services/master.service';
import { Chart,registerables } from 'chart.js';



Chart.register(...registerables);

declare var $:any; 

@Component({
  selector: 'app-m-leavereport',
  templateUrl: './m-leavereport.component.html',
  styleUrl: './m-leavereport.component.scss'
})
export class MLeavereportComponent  {
  
  employees: any[] = [
    { id: 1, code: 'E001', name: 'John Doe', department: 'Finance' },
    { id: 2, code: 'E002', name: 'Jane Smith', department: 'Finance' },
    { id: 3, code: 'E003', name: 'Michael Johnson', department: 'Finance' },
    { id: 4, code: 'E004', name: 'Sarah Brown', department: 'Finance' },
    { id: 5, code: 'E005', name: 'Chris Miller', department: 'Finance' },
    { id: 6, code: 'E006', name: 'Emily Davis', department: 'Finance' },
    { id: 7, code: 'E007', name: 'David Wilson', department: 'Finance' }
    // Add more employees as needed
  ];
  selectedEmployee: any = {}; // Add this line

  openDetailsModal(employee: any): void {
    this.selectedEmployee = { ...employee };
    $('#empdetail').modal('show');
  }
    constructor(private service:MasterService) { }
    chartdata:any;
    leavedata:any[]=[];
    leavelabel:any[]=[];
    colorcode:any[]=[];

    linechartdata:any;
    trendlabel:any[]=[];
    trends1:any[]=[];
    trends2:any[]=[];
    trends3:any[]=[];
    ngAfterViewInit(): void {
      this.service.get_team_util_info().subscribe(result=>{
        this.chartdata = result;
        if(this.chartdata!=null){
          for(let i=0;i<this.chartdata.length;i++){
            //console.log(this.chartdata[i]);
            this.leavedata.push(this.chartdata[i].leavedata);
            this.leavelabel.push(this.chartdata[i].leavelabel); 
            this.colorcode.push(this.chartdata[i].colorcode); 

          }
          this.RenderdougnutChart(this.leavedata,this.leavelabel,this.colorcode,'doughnut','Dougnutchart');
          this.RenderdougnutChart(this.leavedata,this.leavelabel,this.colorcode,'doughnut','Dougnutchart_employee');

        }
      });

      this.service.get_team_trend_info().subscribe(result=>{
        this.linechartdata = result;
        if(this.linechartdata!=null){
          for(let i=0;i<this.linechartdata.length;i++){
            //console.log(this.linechartdata[i]);
            this.trendlabel.push(this.linechartdata[i].label);
            this.trends1.push(this.linechartdata[i].series1); 
            this.trends2.push(this.linechartdata[i].series2); 
            this.trends3.push(this.linechartdata[i].series3);
          }
          this.RenderMultilineChart(this.trendlabel,this.trends1,this.trends2,this.trends3,'line','lineChart');
          this.RenderMultilineChart(this.trendlabel,this.trends1,this.trends2,this.trends3,'line','lineChart_employee');

        }
      });
    }

    RenderdougnutChart(leavedata:any,leavelabel:any,colorcode:any,type:any,id:any){
      new Chart(id, {
        type: type,
        data: {
          labels: leavelabel,
          datasets: [{
            label: '# of Votes',
            data: leavedata,
            backgroundColor: colorcode,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top', 
            }},
          
        }
      });
    }

    RenderMultilineChart(trendlabel:any,trends1:any,trends2:any,trends3:any,type:any,id:any){
      new Chart(id, {
        type: type,
        data: {
          labels: trendlabel, // use the labels variable you defined
          datasets: [{
            label: 'Series 1',
            data: trends1, // use the series1Data variable you defined
            borderColor: '#41B8D5',
            backgroundColor: 'transparent',
             // use the first color in the trendcode array
            borderWidth: 1,
            fill: true, // add fill property
           
          },
          {
            label: 'Series 2',
            data: trends2, // use the series2Data variable you defined
            borderColor: '#6CE5E8',
            backgroundColor: 'transparent', // use the second color in the trendcode array
            borderWidth: 1,
            fill: true, // add fill property
           
          },
          {
            label: 'Series 3',
            data: trends3, // use the series3Data variable you defined
            borderColor: '#2D8BBA',
            backgroundColor: 'transparent', // use the third color in the trendcode array
            borderWidth: 1,
            fill: true, // add fill property
           
          }]
        },
        options: {
          maintainAspectRatio: true, // disable aspect ratio to set the height manually
           // set the height to 100 pixels, adjust as needed
          scales: {
            x: {
              type: 'category',
              labels: trendlabel,
            },
            y: {
              // position the axis to the left
              beginAtZero: true,
              ticks: {
                stepSize: 1 // set the tick spacing to 1 unit
              }
            },
          },
          plugins: {
            legend: {
              position: 'top', 
            }},
          
        }
      });
    }
  }
  

 






