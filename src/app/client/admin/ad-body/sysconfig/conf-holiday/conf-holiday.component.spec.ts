import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfHolidayComponent } from './conf-holiday.component';

describe('ConfHolidayComponent', () => {
  let component: ConfHolidayComponent;
  let fixture: ComponentFixture<ConfHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfHolidayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
