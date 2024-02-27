import { TestBed } from '@angular/core/testing';

import { LveHisManService } from './lve-his-man.service';

describe('LveHisManService', () => {
  let service: LveHisManService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LveHisManService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
