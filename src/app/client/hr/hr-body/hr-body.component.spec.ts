import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrBodyComponent } from './hr-body.component';

describe('HrBodyComponent', () => {
  let component: HrBodyComponent;
  let fixture: ComponentFixture<HrBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
