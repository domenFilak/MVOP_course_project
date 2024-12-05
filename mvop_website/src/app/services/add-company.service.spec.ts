import { TestBed } from '@angular/core/testing';

import { AddCompanyService } from './services/add-company.service';

describe('AddCompanyService', () => {
  let service: AddCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
