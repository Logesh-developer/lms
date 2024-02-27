import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSidenavComponent } from './hr-sidenav.component';

describe('HrSidenavComponent', () => {
  let component: HrSidenavComponent;
  let fixture: ComponentFixture<HrSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
