import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavepolicyComponent } from './leavepolicy.component';

describe('LeavepolicyComponent', () => {
  let component: LeavepolicyComponent;
  let fixture: ComponentFixture<LeavepolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeavepolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeavepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
