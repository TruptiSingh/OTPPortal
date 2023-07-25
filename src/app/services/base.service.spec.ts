import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

class BaseServiceImplementation extends BaseService {}

describe('BaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseServiceImplementation
    ]
  }));

  it('should be created', () => {
    const service: BaseService = TestBed.get(BaseServiceImplementation);
    expect(service).toBeTruthy();
  });
});