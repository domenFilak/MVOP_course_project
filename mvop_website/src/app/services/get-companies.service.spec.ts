import { TestBed } from '@angular/core/testing';

import { GetCompaniesService } from './get-companies.service';

describe('GetCompaniesService', () => {
  let service: GetCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
