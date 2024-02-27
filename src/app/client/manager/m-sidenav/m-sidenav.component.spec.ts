import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSidenavComponent } from './m-sidenav.component';

describe('MSidenavComponent', () => {
  let component: MSidenavComponent;
  let fixture: ComponentFixture<MSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
