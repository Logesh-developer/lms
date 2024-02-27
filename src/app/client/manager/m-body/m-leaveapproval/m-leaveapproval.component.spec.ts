import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MLeaveapprovalComponent } from './m-leaveapproval.component';

describe('MLeaveapprovalComponent', () => {
  let component: MLeaveapprovalComponent;
  let fixture: ComponentFixture<MLeaveapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MLeaveapprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MLeaveapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
