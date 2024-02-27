import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MLeavecalendarComponent } from './m-leavecalendar.component';

describe('MLeavecalendarComponent', () => {
  let component: MLeavecalendarComponent;
  let fixture: ComponentFixture<MLeavecalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MLeavecalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MLeavecalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
