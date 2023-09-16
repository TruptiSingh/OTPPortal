import { TestBed } from '@angular/core/testing';

import { UserFilesApiService } from './user-files-api.service';

describe('UserFilesApiService', () => {
  let service: UserFilesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFilesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
