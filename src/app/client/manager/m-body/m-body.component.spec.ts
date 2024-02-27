import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MBodyComponent } from './m-body.component';

describe('MBodyComponent', () => {
  let component: MBodyComponent;
  let fixture: ComponentFixture<MBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
