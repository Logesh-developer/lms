import { TestBed } from '@angular/core/testing';

import { LveHisEmpService } from './lve-his-emp.service';

describe('LveHisEmpService', () => {
  let service: LveHisEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LveHisEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
