import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSidenavComponent } from './ad-sidenav.component';

describe('AdSidenavComponent', () => {
  let component: AdSidenavComponent;
  let fixture: ComponentFixture<AdSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
