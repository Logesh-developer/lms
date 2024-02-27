import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrReportanalysisComponent } from './hr-reportanalysis.component';

describe('HrReportanalysisComponent', () => {
  let component: HrReportanalysisComponent;
  let fixture: ComponentFixture<HrReportanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrReportanalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrReportanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
