import { TestBed } from '@angular/core/testing';

import { HrpolicyService } from './hrpolicy.service';

describe('HrpolicyService', () => {
  let service: HrpolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrpolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
