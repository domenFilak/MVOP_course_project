import { TestBed } from '@angular/core/testing';

import { PatchCompanyService } from './patch-company.service';

describe('PatchCompanyService', () => {
  let service: PatchCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
