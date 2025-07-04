import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleGuardServiceGuard } from './role-guard-service.guard';

describe('roleGuardServiceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => roleGuardServiceGuard(...guardParameters));
// ✅ Function-based guard
   const roleGuardServiceGuard: CanActivateFn = (route, state) => {
    // logic
    return true;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
