import { TestBed } from '@angular/core/testing';

import { ApprvdLveEmpService } from './apprvd-lve-emp.service';

describe('ApprvdLveEmpService', () => {
  let service: ApprvdLveEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprvdLveEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
