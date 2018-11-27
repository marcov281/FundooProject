import { TestBed } from '@angular/core/testing';

import { AuthrouteGuard } from './authguard.service';

describe('AuthguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthrouteGuard = TestBed.get(AuthrouteGuard);
    expect(service).toBeTruthy();
  });
});
