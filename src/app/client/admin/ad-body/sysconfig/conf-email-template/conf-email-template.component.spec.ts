import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfEmailTemplateComponent } from './conf-email-template.component';

describe('ConfEmailTemplateComponent', () => {
  let component: ConfEmailTemplateComponent;
  let fixture: ComponentFixture<ConfEmailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfEmailTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
