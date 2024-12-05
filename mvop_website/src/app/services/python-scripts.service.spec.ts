import { TestBed } from '@angular/core/testing';

import { PythonScriptsService } from './python-scripts.service';

describe('PythonScriptsService', () => {
  let service: PythonScriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
