import { TestBed } from '@angular/core/testing';

import { ApiEvaluationsService } from './api-evaluations.service';

describe('ApiEvaluationsService', () => {
  let service: ApiEvaluationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEvaluationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
