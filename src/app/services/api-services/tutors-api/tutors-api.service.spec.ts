import { TestBed } from '@angular/core/testing';

import { TutorsApiService } from './tutors-api.service';

describe('TutorsApiService', () => {
  let service: TutorsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
