import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfLeaveTypeComponent } from './conf-leave-type.component';

describe('ConfLeaveTypeComponent', () => {
  let component: ConfLeaveTypeComponent;
  let fixture: ComponentFixture<ConfLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfLeaveTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
