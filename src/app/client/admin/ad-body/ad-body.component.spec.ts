import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBodyComponent } from './ad-body.component';

describe('AdBodyComponent', () => {
  let component: AdBodyComponent;
  let fixture: ComponentFixture<AdBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
