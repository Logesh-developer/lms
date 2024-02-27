import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrReportcalendarComponent } from './hr-reportcalendar.component';

describe('HrReportcalendarComponent', () => {
  let component: HrReportcalendarComponent;
  let fixture: ComponentFixture<HrReportcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrReportcalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrReportcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
