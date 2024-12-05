import { TestBed } from '@angular/core/testing';

import { DeleteCompanyService } from './delete-company.service';

describe('DeleteCompanyService', () => {
  let service: DeleteCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
