import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserconfigComponent } from './userconfig.component';

describe('UserconfigComponent', () => {
  let component: UserconfigComponent;
  let fixture: ComponentFixture<UserconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserconfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
