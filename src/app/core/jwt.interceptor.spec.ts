import { TestBed, inject } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';

describe('JwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtInterceptor]
    });
  });

  it('should be created', inject(
    [JwtInterceptor],
    (service: JwtInterceptor) => {
      expect(service).toBeTruthy();
    }
  ));
});
