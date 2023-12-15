import { TestBed } from '@angular/core/testing';

import { ApiCrowdsourcingService } from './api-crowdsourcing.service';

describe('ApiCrowdsourcingService', () => {
  let service: ApiCrowdsourcingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCrowdsourcingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
