import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLeavepolicyComponent } from './hr-leavepolicy.component';

describe('HrLeavepolicyComponent', () => {
  let component: HrLeavepolicyComponent;
  let fixture: ComponentFixture<HrLeavepolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrLeavepolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrLeavepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
