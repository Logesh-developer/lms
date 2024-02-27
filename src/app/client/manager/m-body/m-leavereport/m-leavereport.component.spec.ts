import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MLeavereportComponent } from './m-leavereport.component';

describe('MLeavereportComponent', () => {
  let component: MLeavereportComponent;
  let fixture: ComponentFixture<MLeavereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MLeavereportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MLeavereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
