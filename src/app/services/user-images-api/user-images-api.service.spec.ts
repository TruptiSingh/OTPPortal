import { TestBed } from '@angular/core/testing';

import { UserImagesApiService } from './user-images-api.service';

describe('UserImagesApiService', () => {
  let service: UserImagesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserImagesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
