import { TestBed, inject } from '@angular/core/testing';

import { PersonGuardService } from './person-guard.service';

describe('PersonGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonGuardService]
    });
  });

  it('should be created', inject([PersonGuardService], (service: PersonGuardService) => {
    expect(service).toBeTruthy();
  }));
});
