import { TestBed } from '@angular/core/testing';

import { CodedListsService } from './coded-lists.service';

describe('CodedListsService', () => {
  let service: CodedListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodedListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
