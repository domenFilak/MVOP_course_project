import { TestBed } from '@angular/core/testing';

import { SelectedCompaniesDataService } from './selected-companies-data.service';

describe('SelectedCompaniesDataService', () => {
  let service: SelectedCompaniesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCompaniesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
